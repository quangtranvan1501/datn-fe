import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-record-history',
  templateUrl: './record-history.component.html',
  styleUrls: ['./record-history.component.css']
})
export class RecordHistoryComponent {
  constructor(
    private appService: AppService,
    private modal: NzModalService,
    private message: NzMessageService,
    private fb: NonNullableFormBuilder,

  ) { }

  listOfData: any[] = []
  pageIndex: number = 1
  pageSize: number = 5
  total: number = 0
  isConfirmLoading = false;
  inputSearch: string = '';
  isView: boolean = false;
  medicalRecordId: string = '';
  user: any;
  recordView: any ={
    medicalRecordId: '',
    patient: {
      name: '',
      address: '',
      gender: '',
      birthday: '',
    },
    doctor: '',
    service: '',
    diagnose: '',
    prescription: '',
    symptom: '',
    note: '',
    testResults: '',
    day: ''
  }


  okView(): void {
    console.log('Button ok clicked!');
    this.isView = false;
  }

  closeView(): void {
    console.log('Button close clicked!');
    this.isView = false;
  }

  viewPrescription(data: any) {
    this.appService.getById<any>(data, '/medicalRecords').subscribe(response => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 200) {
        this.recordView = response.body.data;
        this.isView = true;
      }
    })
  }

  cancel(): void {
  }


  showModal(data: any) {
    // this.validateFormRegister = this.fb.group({
    //   id: [data.id, [Validators.required]],
    //   username: [data.username, [Validators.required]],
    //   phoneNumber: [data.phoneNumber, [Validators.required]],
    //   email: [data.email, [Validators.email, Validators.required]],
    //   userId: [data.userId, [Validators.required]],
    //   gender: [data.gender, [Validators.required]],
    //   birthday: [data.birthday, [Validators.required]],
    //   address: [data.address, [Validators.required]],
    //   name: [data.name, [Validators.required]],
    //   isEmailVerified: [data.isEmailVerified.toString(), [Validators.required]],
    // });
    // console.log(this.validateFormRegister.value)
  }

  changePageIndex(pageIndex: number) {
    this.pageIndex = pageIndex
    this.getMedicalRecord()
  }

  searchUser() {
    if(this.inputSearch == ''){
      this.getMedicalRecord()
      return
    }
    this.appService.getById<any>(this.inputSearch, '/medicalRecords').subscribe(response => {
      if(!response.body){
        return
      }
      if (response.body.code == 200) {
        this.listOfData = response.body.data
      }
      this.listOfData = response.body.data
    }, error => {
      this.listOfData = []
      return this.message.error('Không tìm thấy bệnh án')
    })
  }

  getMedicalRecord() {
    var body = {
      patient: this.user.id,
      sortBy: ['createdAt:desc'],
      page: this.pageIndex,
      limit: this.pageSize
    }
    this.appService.query<any>(body, '/medicalRecords').subscribe(response => {
      if(!response.body){
        return
      }
      if (response.body.code == 200) {
        this.listOfData = response.body.data.results
        this.total = response.body.data.totalResults
      }
    })
  }

  ngOnInit(): void {
    const currentUser = sessionStorage.getItem('currentUser')
    if(currentUser){
      this.user = JSON.parse(currentUser)
    }
    this.getMedicalRecord()
  }
}
