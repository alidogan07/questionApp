import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Questions } from '../models/questions';
import { Resp } from '../models/resp';
import { FbServiceService } from '../services/fb-service.service';

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.css']
})
export class MyQuestionsComponent implements OnInit {
  public questionForm:FormGroup;
  edit:boolean=false;
  del:boolean=false;
  username;
  user = JSON.parse(localStorage.getItem('user'));
  uid;
  selectedQuestion: Questions = new Questions;
  resp:Resp=new Resp();
  questions:Questions[];
  constructor(
    public fbService:FbServiceService,
    public formBuilder: FormBuilder,
  ) {
    this.uid = this.user.uid;
    this.questionForm = this.formBuilder.group({
      qTitle:[""],
      image:[""],
      category:[""],
      qDesc:[""],
      date:new Date(),
      writer:this.username,
      commentCount:0
    })
  }

  ngOnInit(): void { 
    this.getQuestions(); 
  }

  getQuestions(){
    this.fbService.getQuestionsByUid(this.uid).snapshotChanges().subscribe(data =>{
      this.questions=[];
      data.forEach(ques =>{
        const q ={...ques.payload.toJSON(),key:ques.key};
        this.questions.push(q as Questions);
      })
    })
  }

  editQuestion(){
    if(this.selectedQuestion){
      this.fbService.updateQuestion(this.selectedQuestion).then(() =>{
        this.resp.job =true;
        this.resp.message="Sorunuz başarıyla güncellenmiştir."
      });
    }
  }

  selectQuestion(q:Questions){
    Object.assign(this.selectedQuestion,q);
  }

  deleteQues(){
    this.fbService.deleteQuestion(this.selectedQuestion.key).then(() =>{
      this.resp.job =true;
      this.resp.message="Sorunuz silinmiştir."
      this.del = false;
    });
  }

}
