import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.css']
})
export class MedicalRecordComponent implements OnInit{
  constructor(
    private appService: AppService,
    private modal: NzModalService,
    private message: NzMessageService,
    private fb: NonNullableFormBuilder,

  ) { }

  doctor: any;
  medicalRecord: any[] = [];
  isView = false;
  isEdit = false;
  medicalRecordId: any;

  recordView: any ={
    medicalRecordId: '',
    patient: {
      name: '',
      address: '',
      gender: '',
      birthday: '',
    },
    doctor: '',
    service: {
      name: '',
    },
    diagnose: '',
    prescription: '',
    symptom: '',
    note: '',
    testResults: '',
    day: ''
  }

  recordForm: FormGroup<{
    diagnose: FormControl<string>;
    prescription: FormControl<string>;
    symptom: FormControl<string>;
    note: FormControl<string>;
    testResults: FormControl<string>;
    day: FormControl<string>;
  }> = this.fb.group({
    diagnose: ['', [Validators.required]],
    prescription: [' ', [Validators.required]],
    symptom: ['', [Validators.required]],
    note: [' ', [Validators.required]],
    testResults: ['', [Validators.required]],
    day: ['', [Validators.required]],
  });

  isConfirmDelete = false;

  confirmDelete(data:any): void {
    // const formattedDay = this.datePipe.transform(data.day, 'dd/MM/yyyy');
    this.modal.confirm({
      nzTitle: `Xác nhận xóa bệnh án: ${ data.medicalRecordId } ?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.delete(data.medicalRecordId),
      nzCancelText: 'No',
      nzOnCancel: () => this.handleCancel()
    });
  }

  handleCancel(): void {
    this.isConfirmDelete = false;
  }

  okView(): void {
    console.log('Button ok clicked!');
    this.isView = false;
  }

  closeView(): void {
    console.log('Button close clicked!');
    this.isView = false;
  }

  closeEdit(): void {
    console.log('Button close clicked!');
    this.isEdit = false;
  }

  editRecord(): void {
    console.log('Button edit clicked!');
    this.appService.update<any, any>(this.recordForm.value, `/medicalRecords/${this.medicalRecordId}`).subscribe(response => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 200) {
        this.getMedicalRecord();
        this.isEdit = false;
        return this.message.success(response.body.message);
      }
      return this.message.error(response.body.message);
    })
    this.isEdit = true;
  }

  delete(data: any) {
    this.appService.deleteOption<any>(data, '/medicalRecords').subscribe(response => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 200) {
        this.getMedicalRecord();
        return this.message.success(response.body.message);
      }
      return this.message.error(response.body.message);
    }, error => {
      return this.message.error('Xóa không thành công');
    })
  };

  viewPrescription(data: any) {
    this.appService.getById<any>(data, '/medicalRecords').subscribe(response => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 200) {
        this.recordView = response.body.data;
        console.log(this.recordView);
        this.isView = true;
      }
    })
  }

  editMedicalRecord(data: any) {
    this.recordView = data;
    this.medicalRecordId = data.medicalRecordId;
    this.recordForm.patchValue({
      // medicalRecordId: data.medicalRecordId,
      diagnose: data.diagnose,
      prescription: data.prescription,
      symptom: data.symptom,
      note: data.note,
      testResults: data.testResults,
      day: data.day,
    })
    this.isEdit = true;
  }

  getMedicalRecord(): void {
    this.appService.getById<any>(this.doctor.id, '/medicalRecords/doctor').subscribe(response => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 200) {
        this.medicalRecord = response.body.data;      
      }
    })
  }

  ngOnInit(): void {
    const currentUser = sessionStorage.getItem('currentUser')
    if (!currentUser) {
      return;
    }
    this.doctor = JSON.parse(currentUser)
    this.getMedicalRecord();
  }
}
