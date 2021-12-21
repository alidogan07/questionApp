import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { Resp } from '../models/resp';
import { Writer } from '../models/writer';
import { FbServiceService } from '../services/fb-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  resp: Resp = new Resp();
  selectedWriter: Writer = new Writer();

  public signUpForm:FormGroup;
  wrongPass = false;
  isSignUp = false;
  constructor(
    public fbService:FbServiceService,
    private formBuilder: FormBuilder,
    public router : Router
  ) {
    this.resp.message="";
    this.selectedWriter.email = this.fbService.signupMail;
    this.signUpForm = this.formBuilder.group({
      email:[this.fbService.signupMail,Validators.required],
      password:["",[Validators.minLength(6),Validators.required]],
      displayName:[""],
      photoURL:[""],
      emailVerified:[""],
    })
   }

  ngOnInit(): void { } 

  onSubmit(): void {
    if(this.signUpForm.get("password").value == this.signUpForm.get("retryPass").value){
      this.fbService.signUp(this.signUpForm.value);
      this.signUpForm.reset();
      this.wrongPass = false;
      this.isSignUp = true;
    }else{
      this.wrongPass = true;
    }  
  }

  signUp(){
    this.fbService.signUp(this.selectedWriter).then(v =>{      
      v.user.updateProfile({
        displayName:this.selectedWriter.username
      }).then();
      this.selectedWriter.uid = v.user.uid;      
      this.resp.job=true;
      this.resp.message="Kayıtınız başarılı, 3 saniye sonra anasayfaya yönlendirileceksiniz !";
      this.addUser();
      localStorage.setItem("user",JSON.stringify(v.user));  
    },err=>{
      this.resp.job=false;
      this.resp.message="Hata oluştu lütfen tekrar deneyiniz !";
    })
  }

  addUser(){
    this.fbService.userAdd(this.selectedWriter).then(v=>{
      timer(3000).subscribe(x => this.router.navigateByUrl('/'));
    })
  }

}
