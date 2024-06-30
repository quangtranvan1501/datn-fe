import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-shedule-list',
  templateUrl: './shedule-list.component.html',
  styleUrls: ['./shedule-list.component.css']
})
export class SheduleListComponent implements OnInit{
  constructor(
    private appService: AppService,
  ) { }

  examinationSchedule:any = []
  filteredSchedule:any = []
  doctor: any
  daySearch : any
  inputSearch: string = ''

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
    if(result.length == 0){
      console.log("123")
      this.filteredSchedule = this.examinationSchedule;
      console.log(this.filteredSchedule)
    }
    if(result.length >0){
      const start = new Date(result[0]);
      const end = new Date(result[1]);
  
      // Chỉ giữ phần ngày
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
  
      this.filteredSchedule = this.examinationSchedule.filter((schedule: any) => {
        const scheduleDate = new Date(schedule.day);
        scheduleDate.setHours(0, 0, 0, 0);
        return scheduleDate >= start && scheduleDate <= end;
      });
    }
  }

  filterSchedule(): void {
    const searchTerm = this.inputSearch.toLowerCase();
    if (!searchTerm) {
      this.filteredSchedule = this.examinationSchedule;
    } else {
      this.filteredSchedule = this.examinationSchedule.filter((schedule: any) => {
        const scheduleId = schedule.examinationScheduleId.toString().toLowerCase();
        const patientName = schedule.patient.name?.toLowerCase() || '';
        const serviceNames = schedule.service.name?.toLowerCase() || '';
        return scheduleId.includes(searchTerm) || patientName.includes(searchTerm) || serviceNames.includes(searchTerm);
      });
    }
  }


  ngOnInit(): void {
    const currentUser = sessionStorage.getItem('currentUser')
    if (!currentUser) {
      return;
    }
    this.doctor = JSON.parse(currentUser)
    this.appService.getById<any>(this.doctor.id, '/examinationSchedules/doctor').subscribe(response => {
      if (!response.body) {
        return;
      }
      this.examinationSchedule = response.body.data;
      this.filteredSchedule = this.examinationSchedule;
    })
  }
}
