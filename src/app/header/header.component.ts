import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isLogin: boolean = false
  user: any;
  constructor(
    private authService: AuthService,
    // private appService: AppService,
    // private fb: NonNullableFormBuilder,
    // private message: NzMessageService
  ) { }
  logOut() {
    this.authService.logout()
    window.location.reload();
  }
  ngOnInit() {
    this.isLogin = this.authService.isLoggedIn()
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      this.user = JSON.parse(currentUser)
    }
  }
}
