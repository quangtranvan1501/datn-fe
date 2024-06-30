import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, delay, finalize, map, merge, scan, timer } from 'rxjs';
import {
  AsyncStep,
  Order,
  Service,
  Shedule,
  SyncStep,
  User,
} from 'src/app/@types';
import { AppService } from 'src/app/service/app.service';
import { differenceInCalendarDays, setHours } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
type Step = SyncStep | AsyncStep;

function mockAsyncStep(): Observable<number> {
  const subStep1 = timer(600).pipe(map(() => 25));
  const subStep2 = subStep1.pipe(delay(600));
  const subStep3 = subStep2.pipe(delay(600));
  const subStep4 = subStep3.pipe(delay(600));
  return merge(subStep1, subStep2, subStep3, subStep4).pipe(
    scan((a, b) => a + b)
  );
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit, OnChanges {
  constructor(
    private appService: AppService,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.generateTimeButtons();
  }
  current = 0;
  processing = false;
  service: Service[] = [];
  serviceCode: string = '';
  voucherCode: string = '';
  discount: number = 0;
  totalAmount: number = 0;
  voucher: any;
  doctorId: string = '';
  sheduleDay: Date = new Date();
  isDisabled = true;
  isDisabled2 = true;
  isDoctor: boolean = true;
  isDoctorTime: boolean = false;
  // isVoucher: boolean = false;
  orderId: string = '';
  timeButtons: string[] = [];
  activeButton: string | null = null;
  steps: Step[] = [
    {
      id: 1,
      title: `Chọn dịch vụ`,
      async: false,
      percentage: null,
    },
    {
      id: 2,
      title: `Đặt lịch khám`,
      async: true,
      percentage: 0,
    },
    {
      id: 3,
      title: `Hoàn tất đặt lịch`,
      async: true,
      percentage: 0,
    },
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
    birthday: '',
  };
  doctor: User[] = [];
  today = new Date();
  timeDefaultValue = setHours(new Date(), 0);

  clearVoucher(): void {
    this.voucher = null;
    this.discount = 0;
    // this.isVoucher = false;
    this.totalAmount = this.service[0].price;
  }

  useVoucher(): void {
    this.appService
      .getById<any>(this.voucherCode, '/vouchers/use')
      .subscribe((response) => {
        if (!response.body) {
          return;
        }
        if (response.body.code == 200) {
          // this.isVoucher = true;
          this.voucher = response.body.data;
          const type = this.voucher.type;
          if (type == 'percent') {
            this.discount = (this.service[0].price * this.voucher.discount) / 100;
          }
          if (type == 'amount'){
            this.discount = this.voucher.discount;
          }
          if(this.discount > this.service[0].price){
            this.totalAmount = 0;
          }
          if(this.discount < this.service[0].price){
            this.totalAmount = this.service[0].price - this.discount;
          }

          return this.message.success(response.body.message);
        }
        return this.message.error('Đã có lỗi xảy ra vui lòng thử lại.');
      }, error => {
        this.message.error('Mã giảm giá không hợp lệ');
      });
  }

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

  next2(): void {
    this.loadingAndStep();
    this.createShedule();
  }

  createOrder(payment: any): void {
    const order: Partial<Order> = {
      patient: this.user.id,
      totalAmount: this.totalAmount,
      discount: this.discount,
      orderService: [
        {
          service: this.service[0].id,
          quantity: 1,
        },
      ],
    };

    this.appService.post<Order, Partial<Order>>(order, '/orders').subscribe(
      async (response) => {
        if (!response.body) {
          return;
        }
        if (response.body.code == 201) {
          this.orderId = response.body.data.orderId ?? '';
          console.log(this.orderId);
          if (payment) {
            this.payment();

          }
          return this.message.success(response.body.message);
        }

        if (response.body && response.body.message) {
          return this.message.error(response.body.message);
        }
        return this.message.error('Đã có lỗi xảy ra vui lòng thử lại.');
      },
      (error) => {
        if (error.error && error.error.message) {
          return this.message.error(error.error.message);
        }
        return this.message.error('Đã có lỗi xảy ra vui lòng thử lại');
      }
    );
  }

  done(payment: any): void {
    // this.loadingAndStep();
    this.createOrder(payment);
    this.current = 0;
    this.serviceCode = '';
    this.service = [];
    this.doctorId = '';
    this.isDoctor = true;
    this.sheduleDay = new Date();
    this.orderId = '';
    this.isDisabled = true;
    this.isDisabled2 = true;

    console.log('done');
  }

  payment(): void {
    const body = {
      paymentRequest:{
        orderCode: JSON.parse(this.orderId),
        amount: this.totalAmount,
        description: '',
        buyerName: this.user.name,
        buyerEmail: this.user.email,
        buyerPhone: this.user.phoneNumber,
        buyerAddress: this.user.address,
      }
    };
    this.appService.post<any, any>(body, '/payment').subscribe(
      (response) => {
        if (!response.body) {
          return;
        }
        if (response.body.code == 201) {
          const url = response.body.data.data.data.checkoutUrl;

          console.log(response.body.data);
          window.open(url, '_blank')
          return this.message.success(response.body.message);
        }

        if (response.body && response.body.message) {
          return this.message.error(response.body.message);
        }
        return this.message.error('Đã có lỗi xảy ra vui lòng thử lại.');
      },
      (error) => {
        if (error.error && error.error.message) {
          return this.message.error(error.error.message);
        }
        return this.message.error('Đã có lỗi xảy ra vui lòng thử lại');
      }
    );
  }

  updateOrder(paymentId: any): void {
    const order: any = {
      paymentId: paymentId,
    };
    this.appService
      .update<Order, Partial<Order>>(order, '/payment/' + this.orderId)
      .subscribe(
        (response) => {
          if (!response.body) {
            return;
          }
          if (response.body.code == 200) {
            console.log(response.body);
            return this.message.success(response.body.message);
          }

          if (response.body && response.body.message) {
            return this.message.error(response.body.message);
          }
          return this.message.error('Đã có lỗi xảy ra vui lòng thử lại.');
        },
        (error) => {
          if (error.error && error.error.message) {
            return this.message.error(error.error.message);
          }
          return this.message.error('Đã có lỗi xảy ra vui lòng thử lại');
        }
      );
  }

  createShedule() {
    const shedule: Partial<Shedule> = {
      patient: this.user.id,
      service: this.service[0].id,
      day: this.sheduleDay.toISOString(),
      ...(this.doctorId ? { doctor: this.doctorId } : {}),
    };
    console.log(shedule);
    this.isDisabled2 = true;
    this.appService
      .post<Shedule, Partial<Shedule>>(shedule, '/examinationSchedules')
      .subscribe(
        (response) => {
          if (!response.body) {
            return;
          }
          if (response.body.code == 201) {
            // this.createOrder();
            return this.message.success(response.body.message);
          }

          if (response.body && response.body.message) {
            return this.message.error(response.body.message);
          }
          return this.message.error('Đã có lỗi xảy ra vui lòng thử lại.');
        },
        (error) => {
          if (error.error && error.error.message) {
            return this.message.error(error.error.message);
          }
          return this.message.error('Đã có lỗi xảy ra vui lòng thử lại');
        }
      );
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
          .subscribe((p) => {
            step.percentage = p;
          });
      } else {
        this.current += 1;
      }
    }
  }

  search() {
    this.appService
      .getById<Service>(this.serviceCode, '/services')
      .subscribe((response) => {
        if (!response.body) {
          return;
        }
        if (response.body.code == 200) {
          this.service = [response.body.data];
          this.getDoctor();
          this.isDisabled = false;
          this.isDisabled2 = false;
          console.log(this.service);
          this.totalAmount = this.service[0].price;
          // return this.message.success(res.body.message)
        }
      });
  }
  getDoctor() {
    this.appService
      .getById<User[]>(this.service[0].specialist.id, '/users/doctor')
      .subscribe((response) => {
        if (!response.body) {
          return;
        }
        if (response.body.code == 200) {
          this.doctor = response.body.data;
          console.log(this.doctor);
          // return this.message.success(res.body.message)
        }
      });
  }
  getDoctorNameById(id: string): string {
    const selectedDoctor = this.doctor.find((doc) => doc.id === id);
    return selectedDoctor ? selectedDoctor.name : '';
  }
  onTimeChange(time: any): void {
    if (time && this.isDoctorTime) {
      this.isDisabled2 = false;
    } else {
      this.isDisabled2 = true;
      this.isDoctorTime = false;
    }
  }
  onDoctorChange(selectedDoctorId: number): void {
    if (selectedDoctorId) {
      this.isDoctor = false;
      this.isDisabled2 = true;
    }
  }
  checkDoctorShedule() {
    this.isDisabled2 = true;
    this.appService
      .post<any, any>(
        { doctor: this.doctorId, day: this.sheduleDay },
        '/examinationSchedules/checkDoctorShedule'
      )
      .subscribe(
        (response) => {
          if (!response.body) {
            return;
          }
          if (response.body.code == 200) {
            this.isDoctorTime = true;
            this.isDisabled2 = false;
            return this.message.success(response.body.message);
          }

          if (response.body && response.body.message) {
            return this.message.error(response.body.message);
          }
          return this.message.error('Đã có lỗi xảy ra vui lòng thử lại.');
        },
        (error) => {
          if (error.error && error.error.message) {
            return this.message.error(error.error.message);
          }
          return this.message.error('Đã có lỗi xảy ra vui lòng thử lại');
        }
      );
  }
  setStep() {
    this.isDisabled = true;
  }

  generateTimeButtons(): void {
    const startTime = 8 * 60; // 08:00 in minutes
    const endTime = 17 * 60; // 17:00 in minutes
    const interval = 30; // 30 minutes

    for (let time = startTime; time <= endTime; time += interval) {
      const hours = Math.floor(time / 60);
      const minutes = time % 60;
      const timeString = `${this.padZero(hours)}:${this.padZero(minutes)}`;
      this.timeButtons.push(timeString);
    }
  }

  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  onTimeButtonClick(time: string, event: any): void {
    if (this.sheduleDay) {
      const [hours, minutes] = time.split(':').map(Number);
      const selectedDateTime = new Date(this.sheduleDay);
      selectedDateTime.setHours(hours, minutes, 0, 0);
      this.sheduleDay = selectedDateTime;
      this.activeButton = time;
      // this.message.info(`Selected Date and Time: ${selectedDateTime}`);.
    } else {
      this.message.warning('Please select a date first!');
    }

    // Tôi muốn nút đc ấn sẽ đổi màu
    event.target.classList.add('active');
  }

  isActive(time: string): boolean {
    return this.activeButton === time;
  }

  ngOnInit(): void {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      this.user = JSON.parse(currentUser);
    }
    this.route.params.subscribe((params) => {
      console.log(params['serviceId']);
      this.serviceCode = params['serviceId'];
      this.search();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['doctorId']) {
      this.isDoctor = false;
    }
  }
}
