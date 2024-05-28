import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Specialist, User } from 'src/app/@types';
import { AppService } from 'src/app/service/app.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent {
  constructor(
    private authService: AuthService,
    private appService: AppService,
    private fb: NonNullableFormBuilder,
    private message: NzMessageService,
    private i18n: NzI18nService,
  ) { }

  isChangeInfo: boolean = false
  isConfirmLoading = false;
  user: any;

  validateFormRegister: FormGroup<{
    username: FormControl<string>;
    phoneNumber: FormControl<string>;
    userId: FormControl<string>;
    email: FormControl<string>;
    gender: FormControl<string>;
    birthday: FormControl<string>;
    address: FormControl<string>;
    name: FormControl<string>;
    positon: FormControl<string>;
    specialist: FormControl<string>;
  }> = this.fb.group({
    username: [{ value: '', disabled: true }, [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    email: [{ value: '', disabled: true }, [Validators.email, Validators.required]],
    userId: [{ value: '', disabled: true }, [Validators.required]],
    gender: ['', [Validators.required]],
    birthday: ['', [Validators.required]],
    address: ['', [Validators.required]],
    name: ['', [Validators.required]],
    positon: ['', [Validators.required]],
    specialist: ['', [Validators.required]]
  });

  logOut() {
    this.authService.logout()
    window.location.reload();
  }
  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser')
    this.i18n.setLocale(vi_VN);
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
        name: this.user.name || '',
        positon: this.user.positon || '',
        specialist: this.user.specialist || ''
      });
    }
  }
  showModal(): void {
    this.isChangeInfo = true;
  }

  async handleOk(): Promise<void> {
    this.isConfirmLoading = true;
    const body: Partial<User> = {
      name: this.validateFormRegister.value.name,
      phoneNumber: this.validateFormRegister.value.phoneNumber,
      address: this.validateFormRegister.value.address,
      birthday: this.validateFormRegister.value.birthday,
      gender: this.validateFormRegister.value.gender,
      positon: this.validateFormRegister.value.positon,
      specialist: this.validateFormRegister.value.specialist
    }
    this.appService.update<User, Partial<User>>(body, `/users/${this.user.id}`).subscribe(res => {
      if (!res.body) {
        return this.message.error('Đã có lỗi xảy ra vui lòng thử lại');
      }

      if (res.body.code == 200) {
        this.user = res.body.data
        return this.message.success(res.body.message)
      }

      if (res.body && res.body.message) {
        return this.message.error(res.body.message)
      }

      return this.message.error('Đã có lỗi xảy ra vui lòng thử lại.')

    }, error => {
      if (error.error && error.error.message) {
        return this.message.error(error.error.message);
      }
      return this.message.error('Đã có lỗi xảy ra vui lòng thử lại');

    });
    setTimeout(() => {
      this.isChangeInfo = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isChangeInfo = false;
  }
}
