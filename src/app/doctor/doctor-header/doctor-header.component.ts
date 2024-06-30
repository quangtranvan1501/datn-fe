import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-doctor-header',
  templateUrl: './doctor-header.component.html',
  styleUrls: ['./doctor-header.component.css']
})
export class DoctorHeaderComponent implements OnInit {
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
    const currentUser = sessionStorage.getItem('currentUser')
    if (currentUser) {
      this.user = JSON.parse(currentUser)
    }
  }
}
