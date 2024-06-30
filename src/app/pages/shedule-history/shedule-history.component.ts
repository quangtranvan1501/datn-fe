import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Shedule } from 'src/app/@types';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-shedule-history',
  templateUrl: './shedule-history.component.html',
  styleUrls: ['./shedule-history.component.css']
})
export class SheduleHistoryComponent implements OnInit {
  constructor(
    private appService: AppService,
    private modal: NzModalService,
    private message: NzMessageService
  ) { }

  user: any;
  listOfData: any = []
  isConfirmDelete = false;

  confirmDelete(examinationSchedulesId:string): void {
    this.modal.confirm({
      nzTitle: 'Bạn muốn xóa lịch khám?',
      nzOkText: 'Xóa',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.delete(examinationSchedulesId),
      nzCancelText: 'Hủy',
      nzOnCancel: () => this.handleCancel()
    });
  }

  handleCancel(): void {
    this.isConfirmDelete = false;
  }

  delete(examinationSchedulesId:string){

    this.appService.deleteOption<Shedule>(examinationSchedulesId, '/examinationSchedules').subscribe(response => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 200) {
        this.message.success(response.body.message)
        this.listOfData = this.listOfData.filter((item: any) => item.examinationScheduleId !== examinationSchedulesId)
        this.isConfirmDelete = false;
      }
    }, error => {
      console.log(error)
    })
  
  }

  ngOnInit() {
    const currentUser = sessionStorage.getItem('currentUser')
    if (currentUser) {
      this.user = JSON.parse(currentUser)
    }

    const req: HttpParams = new HttpParams().set('page', '0').set('size', '10').set('sortBy', 'day:desc');
    this.appService.get<any>(req ,`/examinationSchedules/user/${this.user.id}`).subscribe(response => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 200) {
        this.listOfData = response.body.data.results;
      }
    })
    // this.appService.getById<Shedule>(this.user.id, '/examinationSchedules/user').subscribe(response => {
    //   if (!response.body) {
    //     return;
    //   }
    //   if (response.body.code == 200) {
    //     console.log(response.body)
    //     this.listOfData = response.body.data;
    //     console.log(this.listOfData)
    //     // return this.message.success(res.body.message)
    //   }
    // }, error => {
    //   console.log(error)
    // })
  }
}
