import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { Resp } from '../models/resp';
import { FbServiceService } from '../services/fb-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  resp: Resp = new Resp();

  constructor(
    private router: Router,
    public fbService:FbServiceService
  ) { }
  ngOnInit(): void {
  }

  async login(user: string, pass: string) {
    try {
     await this.fbService.login(user, pass).then(x=>
        {localStorage.setItem("user",JSON.stringify(x.user))
        const userJS = JSON.parse(localStorage.getItem('user'));
        if(userJS){
          if(userJS.email == "admin@gmail.com"){
            this.fbService.admin=true;
          }
          this.resp.job=true;
          this.resp.message="Girişiniz başarılı, 3 saniye sonra anasayfaya yönlendirileceksiniz !";
        }});
      timer(3000).subscribe(x => this.router.navigateByUrl('/'));
    } catch (e) {
      this.resp.job=false;
      this.resp.message="Şifre veya kullanıcı adı eksik veya hatalı girilmiştir !";
    }
  }
}
