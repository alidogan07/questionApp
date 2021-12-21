import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Questions } from '../models/questions';
import { Resp } from '../models/resp';
import { FbServiceService } from '../services/fb-service.service';

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.css']
})
export class QuestionAddComponent implements OnInit {
  public questionForm:FormGroup;
  user;
  username;
  uid;
  date;
  selectedQuestion: Questions = new Questions;
  resp:Resp=new Resp();

  constructor(
    public formBuilder: FormBuilder,
    public router:Router,
    public afAuth: AngularFireAuth,
    public fbService:FbServiceService
  ) { 
    this.user = JSON.parse(localStorage.getItem("user"));
    this.username = this.user.displayName;
    this.uid = this.user.uid;
    this.questionForm = this.formBuilder.group({
      qTitle:"",
      image:"",
      category:"",
      qDesc:"",
      date:new Date(),
      writer:"",
      uid:"",
      commentCount:0
    })
  }

  ngOnInit(): void { 
    this.date = new Date().getTime().toString();
    console.log(this.date)
  }

  addQuestion(){    
    if(this.selectedQuestion.key == null){
      if(this.questionForm.valid){
        this.selectedQuestion.date = new Date().getTime().toString();
        this.selectedQuestion.writer = this.username;
        this.selectedQuestion.uid = this.uid;
        this.fbService.setQuestion(this.selectedQuestion).then(() =>{
          this.resp.job =true;
          this.resp.message="Sorunuz başarıyla oluşturulmuştur."
        })
        this.questionForm.reset();
      }else{
        this.resp.job =false;
        this.resp.message="Lütfen tüm alanları doldurduğunuzdan emin olunuz !"
      }
      
    }
    
  }

}
