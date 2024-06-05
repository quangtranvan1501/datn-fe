import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, delay, finalize, map, merge, scan, timer } from 'rxjs';
import { AsyncStep, Order, Service, Shedule, SyncStep, User } from 'src/app/@types';
import { AppService } from 'src/app/service/app.service';
import { differenceInCalendarDays, setHours } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
type Step = SyncStep | AsyncStep;

function mockAsyncStep(): Observable<number> {
  const subStep1 = timer(600).pipe(map(() => 25));
  const subStep2 = subStep1.pipe(delay(600));
  const subStep3 = subStep2.pipe(delay(600));
  const subStep4 = subStep3.pipe(delay(600));
  return merge(subStep1, subStep2, subStep3, subStep4).pipe(scan((a, b) => a + b));
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, OnChanges {
  constructor(
    private appService: AppService,
    private message: NzMessageService,
    private router: Router,
  ) { }
  current = 0;
  processing = false;
  service: Service[] = []
  serviceCode: string = '';
  doctorId: string = '';
  isDoctorTime: boolean = false;
  isDoctor: boolean = true;
  sheduleDay: Date = new Date();
  isDisabled = true;
  steps: Step[] = [
    {
      id: 1,
      title: `Chọn dịch vụ`,
      async: false,
      percentage: null
    },
    {
      id: 2,
      title: `Đặt lịch khám`,
      async: true,
      percentage: 0
    },
    {
      id: 3,
      title: `Hoàn tất đặt lịch`,
      async: true,
      percentage: 0
    }
  ];
  user: User = {
    userId: '',
    username: '',
    name: '',
    gender: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    birthday: ''
  };
  doctor: User[] = []
  today = new Date();
  timeDefaultValue = setHours(new Date(), 0);

  range(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  disabledDate = (current: Date): boolean =>
    differenceInCalendarDays(current, this.today) < 0;

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.loadingAndStep();
  }

  done(): void {
    const order: Partial<Order> = {
      patient: this.user.id,
      totalAmount: this.service[0].price,
      orderService:[
        {
          service: this.service[0].id,
          quantity: 1
        }
      ]
    }

    this.appService.post<Order, Partial<Order>>(order, '/orders').subscribe(async response => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 201) {
        await this.createShedule();
        return this.message.success(response.body.message)
      }

      if (response.body && response.body.message) {
        return this.message.error(response.body.message)
      }
      return this.message.error('Đã có lỗi xảy ra vui lòng thử lại.')

    }, error => {
      if (error.error && error.error.message) {
        return this.message.error(error.error.message);
      }
      return this.message.error('Đã có lỗi xảy ra vui lòng thử lại');

    })


    // this.loadingAndStep();
    console.log('done');
  }

  createShedule(){
    const shedule: Partial<Shedule> = {
      patient: this.user.id,
      service: this.service[0].id,
      day: this.sheduleDay.toISOString(),
      ...(this.doctorId ? { doctor: this.doctorId } : {})
    }
    console.log(shedule)
    this.isDisabled = true
    this.appService.post<Shedule, Partial<Shedule>>(shedule, '/examinationSchedules').subscribe(response => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 201) {
        this.isDisabled = false
        this.service = []
        this.doctor = []
        this.doctorId = ''
        this.sheduleDay = new Date()
        this.current = 0
        this.serviceCode = ''
        this.isDoctorTime = false
        return this.message.success(response.body.message)
      }

      if (response.body && response.body.message) {
        return this.message.error(response.body.message)
      }
      return this.message.error('Đã có lỗi xảy ra vui lòng thử lại.')

    } , error => {
      if (error.error && error.error.message) {
        return this.message.error(error.error.message);
      }
      return this.message.error('Đã có lỗi xảy ra vui lòng thử lại');

    });
  }

  trackById(_: number, item: Step): number {
    return item.id;
  }

  loadingAndStep(): void {
    if (this.current < this.steps.length) {
      const step = this.steps[this.current];
      if (step.async) {
        this.processing = true;
        mockAsyncStep()
          .pipe(
            finalize(() => {
              step.percentage = 0;
              this.processing = false;
              this.current += 1;
            })
          )
          .subscribe(p => {
            step.percentage = p;
          });
      } else {
        this.current += 1;
      }
    }
  }

  search() {
    this.appService.getById<Service>(this.serviceCode, '/services').subscribe(response => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 200) {
        this.service = [response.body.data];
        this.getDoctor();
        this.isDisabled = false
        console.log(this.service)
        // return this.message.success(res.body.message)
      }
    })
  }
  getDoctor() {
    this.appService.getById<User[]>(this.service[0].specialist.id, '/users/doctor').subscribe(response => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 200) {
        this.doctor = response.body.data;
        console.log(this.doctor)
        // return this.message.success(res.body.message)
      }
    })
  }
  getDoctorNameById(id: string): string {
    const selectedDoctor = this.doctor.find(doc => doc.id === id);
    return selectedDoctor ? selectedDoctor.name : '';
  }
  onTimeChange(time: any): void {
    if (time && this.isDoctorTime) {
      this.isDisabled = false
    } else {
      this.isDisabled = true
      this.isDoctorTime = false
    }
  }
  onDoctorChange(selectedDoctorId: number): void {
    if(selectedDoctorId){
      this.isDoctor = false
      this.isDisabled = true
    }
  }
  checkDoctorShedule() {
    this.isDisabled = true
    this.appService.post<any, any>({ doctor: this.doctorId, day: this.sheduleDay }, '/examinationSchedules/checkDoctorShedule').subscribe(response => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 200) {
        this.isDoctorTime = true
        this.isDisabled = false
        return this.message.success(response.body.message)
      }

      if (response.body && response.body.message) {
        return this.message.error(response.body.message)
      }
      return this.message.error('Đã có lỗi xảy ra vui lòng thử lại.')

    }, error => {
      if (error.error && error.error.message) {
        return this.message.error(error.error.message);
      }
      return this.message.error('Đã có lỗi xảy ra vui lòng thử lại');
    });
  }
  setStep(){
    this.isDisabled = true;
  }
  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      this.user = JSON.parse(currentUser)
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['doctorId']) {
      this.isDoctor = false;
    }
  }
}
