import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginStatusSubject=new Subject<boolean>();
  constructor(private http:HttpClient) { }

 
  //generate token
  public generateToken(loginData: any){
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  //login user : set token in localstorage 
  public loginUser(token: any){
    localStorage.setItem("token",token);
    return true;
  }

  // check user is loggedin or not
  public isLoggedIn(){
    let tokenstr=localStorage.getItem('token');
    if(tokenstr==undefined || tokenstr=='' || tokenstr== null)
    {
      return false;
    }
    else {
      return true;
    }
  }

  //logout remove toke from localstorage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // get token
  public getToken(){
    return localStorage.getItem('token');
  }
//set user details
public setUser(user: any){
  localStorage.setItem('user',JSON.stringify(user));
}
//get user details
 public getUser()
 {
   let userStr= localStorage.getItem('user');
   if(userStr!=null)
   {
     return JSON.parse(userStr);
   }else{
     this.logout();
     return null;
   }
 }
 //get user role
 public getUserRole(){
   let user=this.getUser();
   return user.authorities[0].authority;
 }

 //get current user: which is logged in
 public getCurrentUser(){
   return this.http.get(`${baseUrl}/current-user`);
 }
}
