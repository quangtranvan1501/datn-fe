import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  passwordVisible = false;
  isConfirmLoading = false;
  visible = false;
  selected = true;
  textloading = 'Đang xử lý...';
  isLoading = false;

  validateFormForgotPass: FormGroup<{
    forgotPass: FormControl<string>;
  }> = this.fb.group({
    forgotPass: ['', [Validators.email, Validators.required]],
  });

  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateFormRegister.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  validateFormRegister: FormGroup<{
    username: FormControl<string>;
    phoneNumber: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirm: FormControl<string>;
    gender: FormControl<string>;
    birthday: FormControl<string>;
    address: FormControl<string>;
    name: FormControl<string>;
  }> = this.fb.group({
    username: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    confirm: ['', [Validators.required, this.confirmationValidator]],
    gender: ['', [Validators.required]],
    birthday: ['', [Validators.required]],
    address: ['', [Validators.required]],
    name: ['', [Validators.required]]
  });

  validateConfirmPassword(): void {
    setTimeout(() => this.validateFormRegister.controls.confirm.updateValueAndValidity());
  }

  selectLogin() {
    this.selected = true;
  }

  selectRegister() {
    this.selected = false;
  }

  showModal(): void {
    this.visible = true;
  }

  handleOk(): void {
    if (this.validateFormForgotPass.valid) {
      const email = this.validateFormForgotPass.value.forgotPass;
      if (email) {
        this.isLoading = true;
        this.authService.forgotPass(email).subscribe(response => {
          if (!response.body) {
            this.isLoading = false;
            this.visible = false;
            return this.message.error('Unknown error occurred.');
          }
          if (response.body.code == 200) {
            this.isLoading = false;
            this.visible = false;
            return this.message.success(response.body.message)
          }
          if (response.body && response.body.message) {
            this.isLoading = false;
            this.visible = false;
            return this.message.error(response.body.message)
          }
          return this.message.error('Unknown error occurred.')
        });
      }
      this.isLoading = false;
      this.visible = false;
    } else {
      Object.values(this.validateFormForgotPass.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.visible = false;
  }


  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      const userName = this.validateForm.value.userName;
      const password = this.validateForm.value.password;
      if (userName && password) {
        this.isLoading = true;
        this.authService.login(userName, password).subscribe(response => {
          if (!response.body) {
            this.isLoading = false;
            return this.message.error('Unknown error occurred.');
          }
          if (response.body.code == 200) {
            this.isLoading = false;
            if(response.body.data.user.role == 'doctor'){
              this.router.navigate(['/doctor']);
            }else{
              this.router.navigate(['/']);
            }
            return this.message.success(response.body.message)
          }
          if (response.body.message) {
            this.isLoading = false;
            return this.message.error(response.body.message)
          }
          return this.message.error('Unknown error occurred.')
        },
          error => {
            // Handle network or other call failures
            if (error.error && error.error.message) {
              this.isLoading = false;
              return this.message.error(error.error.message);
            }
            return this.message.error('Đã có lỗi xảy ra vui lòng thử lại');
          }
        );
        this.isLoading = false;
      }
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  forgotPass() {
    console.log('forgotPass');
  }
  register() {
    if (this.validateFormRegister.valid) {
      const formData: { [key: string]: any } = Object.keys(this.validateFormRegister.controls)
        .filter(key => key !== 'confirm')
        .reduce((acc: any, key) => {
          acc[key] = (this.validateFormRegister.controls as { [key: string]: any })[key].value;
          return acc;
        }, {});
      this.isLoading = true;
      this.authService.register(formData).subscribe(response => {
        if (!response.body) {
          this.isLoading = false;
          return this.message.error('Unknown error occurred.');
        }
        if (response.body.code == 201) {
          this.router.navigate(['/login']);
          this.isLoading = false;
          return this.message.success(response.body.message)
        }
        if (response.body && response.body.message) {
          this.isLoading = false;
          return this.message.error(response.body.message);
        }
        return this.message.error('Unknown error occurred.');
      }, error => {
        // Handle network or other call failures
        if (error.error && error.error.message) {
          this.isLoading = false;
          return this.message.error(error.error.message);
        }
        return this.message.error('Đã có lỗi xảy ra vui lòng thử lại');
      }
      );
    } else {
      Object.values(this.validateFormRegister.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router,
  ) { }
}
