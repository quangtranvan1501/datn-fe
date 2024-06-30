import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Service, User } from 'src/app/@types';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.css']
})
export class CreateRecordComponent implements OnInit {
  constructor(
    private appService: AppService,
    private fb: NonNullableFormBuilder,
    private message: NzMessageService,
  ) { }

  patientId: string = ''
  serviceId: string = ''
  user: User = {
    id: '',
    userId: '',
    username: '',
    name: '',
    gender: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    birthday: '',
  }
  service: Service = {
    id: '',
    serviceId: '',
    name: '',
    unit: '',
    price: 0,
    specialist: {}
  }

  doctorInfo: any

  recordForm: FormGroup<{
    patient: FormControl<string>;
    doctor: FormControl<string>;
    service: FormControl<string>;
    diagnose: FormControl<string>;
    prescription: FormControl<string>;
    symptom: FormControl<string>;
    note: FormControl<string>;
    testResults: FormControl<string>;
  }> = this.fb.group({
    patient: ['', [Validators.required]],
    doctor: ['', [Validators.required]],
    diagnose: ['', [Validators.required]],
    service: ['', [Validators.required]],
    prescription: [' ', [Validators.required]],
    symptom: ['', [Validators.required]],
    note: [' ', [Validators.required]],
    testResults: ['', [Validators.required]],
  });

  getPatient() {
    this.appService.getById<any>(this.patientId, '/users/doctor/patient').subscribe(response => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 200) {
        this.user = response.body.data;
      }
    })
  }

  getService() {
    console.log(this.serviceId)
    this.appService.getById<any>(this.serviceId, '/services').subscribe(response => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 200) {
        this.service = response.body.data;
        console.log(this.service)
      }
    })
  }

  submitForm() {
    this.recordForm.patchValue({
      patient: this.user.id,
      doctor: this.doctorInfo.id,
      service: this.service.id
    })

    if (this.recordForm.valid) {

      this.appService.create<any, any>(this.recordForm.value, '/medicalRecords').subscribe(response => {
        if (!response.body) {
          return;
        }
        if (response.body.code == 201) {
          this.recordForm.reset()
          this.user = {
            birthday: '',
            address: '',
            name: '',
            gender: '',
            email: '',
            password: '',
            phoneNumber: '',
            userId: '',
            username: '',
          }
          this.service = {
            id: '',
            serviceId: '',
            name: '',
            unit: '',
            price: 0,
            specialist: {}
          }
          this.serviceId = ''
          this.patientId = ''
          this.message.success(response.body.message)
        }
      })

      console.log(this.recordForm.value)
    } else {
      Object.values(this.recordForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnInit(): void {
    const currentUser = sessionStorage.getItem('currentUser')
    if (!currentUser) {
      return;
    }
    this.doctorInfo = JSON.parse(currentUser)

  }
}
