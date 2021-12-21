import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FbServiceService } from '../services/fb-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public signUpForm:FormGroup;
  public searchForm:FormGroup;
  constructor(
    public fbService:FbServiceService,
  ) { 
    this.signUpForm = new FormGroup({
      email: new FormControl("",Validators.required)
    });
    this.searchForm = new FormGroup({
      searchTerm: new FormControl("",Validators.required)
    });
  }
  ngOnInit(): void {    
  }
  setEmail(){
    this.fbService.signupMail = this.signUpForm.get("email").value;
  }
  setSearch(){
    this.fbService.searchTerm = this.searchForm.get("searchTerm").value;
  }
}
