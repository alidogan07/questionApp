import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comments } from '../models/comments';
import { Questions } from '../models/questions';
import { Resp } from '../models/resp';
import { FbServiceService } from '../services/fb-service.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  commentForm:FormGroup;
  user;
  username;
  uid;
  date;
  key:string;
  selectedQuestion:Questions = new Questions();
  selectedComment:Comments = new Comments();
  comments:Comments[];
  resp:Resp=new Resp();
  edit:boolean=false;
  del:boolean=false;

  constructor(
    public route: ActivatedRoute,
    public fbService:FbServiceService,
    public router:Router
  ) { }

  ngOnInit(): void {    
    this.route.params.subscribe(p=>{
      this.key = p.key;
    });  
    this.commentForm = new FormGroup({
      comment: new FormControl()
    });
    this.getComments();
    this.getQuestion();
    this.getUser();
  }

  getUser(){
    if(this.fbService.isLogin){
      this.user = JSON.parse(localStorage.getItem("user"));
      this.username = this.user.displayName;
      this.uid = this.user.uid;
    }
  }

  getQuestion(){
    this.fbService.getQuestionByKey(this.key).snapshotChanges().subscribe(data => {
      const q = { ...data.payload.toJSON(),key:this.key};
      this.selectedQuestion = (q as Questions)
    })
  }

  addComment(){         
    this.selectedComment.date = new Date().getTime().toString();
    this.selectedComment.writer = this.username;
    this.selectedComment.qid = this.key;
    this.selectedComment.uid = this.uid;
    this.fbService.setComment(this.selectedComment).then(() =>{
      this.resp.job =true;
      this.resp.message="Yorumunuz başarıyla oluşturulmuştur gerçekleştirilmiştir."
    })
    this.commentForm.get('comment').setValue("");
  }

  async getComments(){
     await this.fbService.getCommentByQid(this.key).snapshotChanges().subscribe(data =>{
      this.comments=[];
      data.forEach(comment =>{
        const c ={...comment.payload.toJSON(),key:comment.key};
        this.comments.push(c as Comments);
      })
    })  
    
  }

  selectComment(c:Comments){
    Object.assign(this.selectedComment,c);
  }

  deleteComment(){
    this.fbService.deleteComment(this.selectedComment.key).then(() =>{
      this.resp.job =true;
      this.resp.message="Yorumunuz silinmiştir."
      this.del = false;
      this.commentForm.get('comment').setValue("");
      this.selectedComment.key = ""
    });
  }

  editComment(){
    if(this.selectedComment){
      this.fbService.updateComment(this.selectedComment).then(() =>{
        this.resp.job =true;
        this.resp.message="Yorumunuz başarıyla güncellenmiştir."
        this.commentForm.get('comment').setValue("");
        this.selectedComment.key = ""
      });
    }
  }

}
