import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  isLogin : boolean = false
  user: any;
  constructor(
    private authService: AuthService
  ) { }
  logOut(){
    this.authService.logout()
    window.location.reload();
  }
  ngOnInit() {
    this.isLogin = this.authService.isLoggedIn()
    const currentUser = localStorage.getItem('currentUser')
    if(currentUser){
      this.user = JSON.parse(currentUser)
    }
    console.log(this.user)
    console.log("login ", this.isLogin)
  }

}
