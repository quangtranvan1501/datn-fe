import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { AppService } from '../service/app.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private appService: AppService
  ) { }
  isVisible = false;
  day: Date = new Date();
  doctor: any
  dayList: any = []
  examinationSchedulesList :any = []
  listDataMap: { [key: string]: Array<{ type: string, content: string }> } = {};

  getMonthData(month: Date): number {
    // Return some data based on the month if needed
    return month.getMonth() + 1;
  }

  selectChange(select: Date): void {
    this.isVisible = true;
    this.day = select;

    const body = {
      day: select,
      doctor: this.doctor.id
    }

    this.appService.post<any, any>(body, '/examinationSchedules/doctor/day').subscribe(response => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 200) {
        this.examinationSchedulesList = response.body.data;
      }
    })
  }
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    this.examinationSchedulesList = []
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.examinationSchedulesList = []

  }

  getDoctorSchedule() {
    this.appService.getById<any>(this.doctor.id, '/examinationSchedules/doctor/schedule-days').subscribe(response => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 200) {
        this.dayList = response.body.data;
        this.dayList.forEach((item: string) => {
          const dateKey = item.split('T')[0];
          if (this.listDataMap[dateKey]) {
            this.listDataMap[dateKey].push({ type: 'processing', content: 'Có lịch khám' });
          } else {
            this.listDataMap[dateKey] = [{ type: 'processing', content: 'Có lịch khám' }];
          }
        });
      }
    }, error => {
      console.log(error)
    })
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser')
    if (!currentUser) {
      return;
    }
    this.doctor = JSON.parse(currentUser)

    this.appService.getById<any>(this.doctor.id, '/scheduleDoctors/doctor').subscribe(response => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 200) {
        const doctorShedule = response.body.data;
        doctorShedule.forEach((item: any) => {
          this.listDataMap[item.day.split('T')[0]] = [
            { type: 'success', content: `Start: ${item.startTime}` },
            { type: 'error', content: `End: ${item.endTime}` }];
        });
        this.getDoctorSchedule()
      }
    })

  }
}
