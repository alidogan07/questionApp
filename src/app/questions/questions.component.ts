import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Questions } from '../models/questions';
import { FbServiceService } from '../services/fb-service.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  public searchForm:FormGroup
  page:number=1; 
  public query: any = '';
  questions:Questions[];
  constructor(
    public fbService:FbServiceService
  ) {
  }

  ngOnInit(): void { 
    this.getQuestions(); 
    this.searchForm = new FormGroup({
      searchTerm: new FormControl(this.fbService.searchTerm,Validators.required)
    });
  }
  
  getQuestions(){
    this.fbService.getQuestions().snapshotChanges().subscribe(data =>{
      this.questions=[];
      data.forEach(ques =>{
        const q ={...ques.payload.toJSON(),key:ques.key};
        this.questions.push(q as Questions);       
      })
    })
  }

}
