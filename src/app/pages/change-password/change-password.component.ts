import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  isLoading = false;
  token = this.authService.getToken()
  passwordVisible = false;

  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.newPassword.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  validateForm: FormGroup<{
    currentPassword: FormControl<string>;
    newPassword: FormControl<string>;
    confirmPassword: FormControl<string>;
  }> = this.fb.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required, this.confirmationValidator]],
  });
  constructor(
    private authService: AuthService,
    private fb: NonNullableFormBuilder,
    private message: NzMessageService
  ) { }


  submitForm(): void {
    if (this.validateForm.valid) {

      this.isLoading = true;
      const body = {
        "currentPassword": this.validateForm.value.currentPassword,
        "newPassword": this.validateForm.value.newPassword,
      }
      this.authService.changePassword(body).subscribe(response => {
        if (!response.body) {
          this.isLoading = false;
          return this.message.error('Đã có lỗi xảy ra vui lòng thử lại');
        }
        if (response.body.code == 200) {
          this.isLoading = false;
          return this.message.success(response.body.message)
        }
        if (response.body.message) {
          this.isLoading = false;
          return this.message.error(response.body.message)
        } 
        return  this.message.error('Đã có lỗi xảy ra vui lòng thử lại')
      },
        error => {
          // Handle network or other call failures
          if (error.error && error.error.message) {
            return  this.message.error(error.error.message);
          } 
          return  this.message.error('Đã có lỗi xảy ra vui lòng thử lại');
        }
      );
      this.isLoading = false;
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  logOut() {
    this.authService.logout()
    window.location.reload();
  }

  ngOnInit() {
  }
}
