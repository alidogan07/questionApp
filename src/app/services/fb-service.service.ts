import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Comments } from '../models/comments';
import { Questions } from '../models/questions';
import { Writer } from '../models/writer';

@Injectable({
  providedIn: 'root'
})
export class FbServiceService {

  admin:boolean=false;
  searchTerm="";
  signupMail="";
  private dbQuests="/Questions";
  private dbWriter="/Writers"
  private dbComment="/Comments"
  questRef:AngularFireList<Questions>=null;
  writerRef:AngularFireList<Writer>=null;
  commentRef:AngularFireList<Comments>=null;
  constructor(
    public db:AngularFireDatabase,
    public afAuth:AngularFireAuth
  ) { 
    this.questRef = db.list(this.dbQuests);
    this.writerRef = db.list(this.dbWriter);
    this.commentRef = db.list(this.dbComment);
  }

  login(email: string, pass: string) {
    return  this.afAuth.signInWithEmailAndPassword(email, pass);
  }
  logOut(){
    localStorage.removeItem("user");
   return this.afAuth.signOut();
  }
  isLogin(){
    if(localStorage.getItem('user')){
      return true;
    }else{
      return false;
    }
  }
  signUp(user:Writer){
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
  }
  userAdd(user:Writer){
    return this.writerRef.push(user);
  }
  getQuestionsByUid(uid:string){
    return this.db.list("/Questions", q => q.orderByChild("uid").equalTo(uid));
  }
  getQuestionByKey(key:string){
    return this.db.object("/Questions/" + key);
  }
  getQuestions(){
    return this.questRef;
  }
  getQuestionsSearch(search : string){
    return this.questRef + "?q=" + search;
  }
  setQuestion(quest:Questions){
    return this.questRef.push(quest);
  }
  updateQuestion(quest:Questions){
    return this.questRef.update(quest.key,quest);
  }
  deleteQuestion(key:string){
    return this.questRef.remove(key);
  }
  setComment(comment:Comments){
    return this.commentRef.push(comment);
  }
  updateComment(comment:Comments){
    return this.commentRef.update(comment.key,comment);
  }
  deleteComment(key:string){
    return this.commentRef.remove(key);
  }
  getCommentByQid(qid:string){
    return this.db.list("/Comments",c => c.orderByChild("qid").equalTo(qid))
  }
  
}
