import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllQuestionsComponent } from './all-questions/all-questions.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { MyQuestionsComponent } from './my-questions/my-questions.component';
import { QuestionAddComponent } from './question-add/question-add.component';
import { QuestionComponent } from './question/question.component';
import { QuestionsComponent } from './questions/questions.component';
import { SignupComponent } from './signup/signup.component';
import { AngularFireAuthGuard,redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const redirectLogin =()=>redirectUnauthorizedTo(['/Login']);
const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: '', component: HomeComponent,
      },
      { path: 'Login', component: LoginComponent },
      { path: 'SignUp', component: SignupComponent },
      { path: 'Questions', component: QuestionsComponent },
      { path: 'Question/:key', component: QuestionComponent },
      { path: 'QuestionAdd', component: QuestionAddComponent },
      { 
        path: 'MyQuestions', 
        component: MyQuestionsComponent,
        canActivate: [AngularFireAuthGuard],
        data:{
          authGuardPipe:redirectLogin
        }
      },
      { path: 'AllQuestions', component: AllQuestionsComponent,
        canActivate: [AngularFireAuthGuard],
        data:{
          authGuardPipe:redirectLogin
        } 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
