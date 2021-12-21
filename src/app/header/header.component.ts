import { Component, OnInit } from '@angular/core';
import { FbServiceService } from '../services/fb-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user;
  username;
  constructor(
    public fbService:FbServiceService
    ) { }
  
  ngOnInit(): void {
    this.fbService.isLogin();
    this.user = JSON.parse(localStorage.getItem("user"));
    this.username = this.user.displayName;
  }
  
  clearMail(){
    this.fbService.signupMail = "";
  }  
}
