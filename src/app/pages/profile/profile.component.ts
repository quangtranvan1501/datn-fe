import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AppService } from 'src/app/service/app.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  isLogin: boolean = false
  isChangeInfo: boolean = false
  isConfirmLoading = false;
  token = this.authService.getToken()
  
  validateFormRegister: FormGroup<{
    username: FormControl<string>;
    phoneNumber: FormControl<string>;
    userId: FormControl<string>;
    email: FormControl<string>;
    gender: FormControl<string>;
    birthday: FormControl<string>;
    address: FormControl<string>;
    name: FormControl<string>;
  }> = this.fb.group({
    username: [{ value: '', disabled: true }, [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    email: [{ value: '', disabled: true }, [Validators.email, Validators.required]],
    userId: [{ value: '', disabled: true }, [Validators.required]],
    gender: ['', [Validators.required]],
    birthday: ['', [Validators.required]],
    address: ['', [Validators.required]],
    name: ['', [Validators.required]]
  });

  user: any;
  constructor(
    private authService: AuthService,
    private appService: AppService,
    private fb: NonNullableFormBuilder,
    private message: NzMessageService
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
      this.validateFormRegister.patchValue({
        username: this.user.username || '',
        phoneNumber: this.user.phoneNumber || '',
        email: this.user.email || '',
        userId: this.user.userId || '',
        gender: this.user.gender || '',
        birthday: this.user.birthday || '',
        address: this.user.address || '',
        name: this.user.name || ''
      });
    }
  }
  showModal(): void {
    this.isChangeInfo = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    const body = {
      "name": this.validateFormRegister.value.name,
      "phoneNumber": this.validateFormRegister.value.phoneNumber,
      "address": this.validateFormRegister.value.address,
      "birthday": this.validateFormRegister.value.birthday,
      "gender": this.validateFormRegister.value.gender
    }
    this.appService.update(body, `/users/${this.user.id}`, {    
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + this.token}).subscribe(res => {
      if (res.body.code == 200) {
        this.message.success(res.body.message)
      } else {
        if (res.body.error && res.body.error.message) {
          this.message.error(res.body.error.message)
        } else {
          this.message.error('Đã có lỗi xảy ra vui lòng thử lại.')
        }
      }
      setTimeout(() => {
        this.isChangeInfo = false;
        this.isConfirmLoading = false;
      }, 1000);
    }, error => {
      if (error.error && error.error.message) {
        this.message.error(error.error.message);
      } else {
        this.message.error('Đã có lỗi xảy ra vui lòng thử lại');
      }
      setTimeout(() => {
        this.isChangeInfo = false;
        this.isConfirmLoading = false;
      }, 1000);
    });

  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isChangeInfo = false;
  }
}
