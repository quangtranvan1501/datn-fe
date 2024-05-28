import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-config-shedule',
  templateUrl: './config-shedule.component.html',
  styleUrls: ['./config-shedule.component.css'],
  providers: [DatePipe]
})
export class ConfigSheduleComponent implements OnInit {
  sheduleDoctor: any = []
  filteredSheduleDoctor: any = []
  doctor: any
  isCreate = false;
  startTime: any;
  endTime: any;

  filterStatus = [
    { text: 'Từ chối', value: '-1' },
    { text: 'Đang duyệt', value: '0' },
    { text: 'Đã duyệt', value: '1' },
  ];

  sheduleForm: FormGroup<{
    doctorId: FormControl<string>;
    day: FormControl<string>;
    startTime: FormControl<Date>;
    endTime: FormControl<Date>;
  }> = this.fb.group({
    doctorId: ['', [Validators.required]],
    day: ['', [Validators.required]],
    startTime: [new Date(), [Validators.required]],
    endTime: [new Date(), [Validators.required]],
  });

  // validateTime: ValidatorFn = () => {

  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const valid = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(control.value);
  //     return valid ? null : { timeFormat: true };
  //   };
  // }
  constructor(
    private appService: AppService,
    private modal: NzModalService,
    private message: NzMessageService,
    private datePipe: DatePipe,
    private fb: NonNullableFormBuilder,
    private i18n: NzI18nService
  ) { }

  isConfirmDelete = false;

  formatTime(time:Date) {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  createSheduleDoctor() {
    this.isCreate = true;
    console.log('create')
  }

  closeEdit() {
    this.isCreate = false;
  }
  createShudele(){
    // this.sheduleForm.patchValue({
    //   doctorId: this.doctor.id,
    //   startTime: this.startTime,
    //   endTime: this.endTime
    // })
    const body = {
      doctorId: this.doctor.id,
      day: this.sheduleForm.value.day? this.datePipe.transform(this.sheduleForm.value.day, 'yyyy-MM-dd') : '',
      startTime: this.sheduleForm.value.startTime? this.formatTime(this.sheduleForm.value.startTime) : '',
      endTime: this.sheduleForm.value.endTime?.getHours() + ':' + this.sheduleForm.value.endTime?.getMinutes(),
    }
    this.appService.post<any, any>(body, '/scheduleDoctors').subscribe(response => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 201) {
        this.isCreate = false;
        this.sheduleForm.reset();
        this.message.success(response.body.message);
        this.getSheduleDoctor();
      } else {
        this.message.error(response.body.message);
      }
    }, error => {
      console.log(error)
    })
  }
  confirmDelete(data:any): void {
    const formattedDay = this.datePipe.transform(data.day, 'dd/MM/yyyy');
    this.modal.confirm({
      nzTitle: `Xác nhận xóa lịch làm việc ngày: ${ formattedDay } ?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.delete(data.scheduleDoctorId),
      nzCancelText: 'No',
      nzOnCancel: () => this.handleCancel()
    });
  }

  handleCancel(): void {
    this.isConfirmDelete = false;
  }

  delete(data: any) {
    this.appService.deleteOption<any>(data, '/scheduleDoctors').subscribe(response => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 200) {
        this.getSheduleDoctor();
        this.isConfirmDelete = false;
        return this.message.success(response.body.message);
      }
      else{
        return this.message.error(response.body.message);
      }
    })
  };
  edit(data: any) {
    console.log('edit', data)
  }

  sortSheduleDoctor(statuses: any) {
    let statusArray: any;
    console.log(statuses[0].value)
    if (statuses[0].value.length > 0) {
       statusArray = statuses[0].value
    }
    console.log(statusArray)
    
    if (statusArray) {
      this.filteredSheduleDoctor = this.sheduleDoctor.filter((item: any) => {
        console.log(statusArray.includes(item.status))
        return statusArray.includes(item.status);
      });
    }
    
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.sortSheduleDoctor(filter);
  }

  getSheduleDoctor() {
    this.appService.getById<any>(this.doctor.id, '/scheduleDoctors/doctor').subscribe(response => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 200) {
        this.sheduleDoctor = response.body.data;
        this.filteredSheduleDoctor = this.sheduleDoctor;
      }
    })
  }

  ngOnInit(): void {
    this.i18n.setLocale(vi_VN);
    const currentUser = localStorage.getItem('currentUser')
    if (!currentUser) {
      return;
    }
    this.doctor = JSON.parse(currentUser)
    this.getSheduleDoctor()
  }
}
