import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-return-payment',
  templateUrl: './return-payment.component.html',
  styleUrls: ['./return-payment.component.css']
})
export class ReturnPaymentComponent implements OnInit{
  orderId: any;
  isPayment: boolean = false;

  constructor(
    private router: Router,
    private appService: AppService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params['orderCode']) {
        this.orderId = params['orderCode'];
        console.log(this.orderId);
      }
      if (params['status'] == 'PAID') {
        const body = {
          status: '1'
        };
        this.isPayment = true;
        this.appService.update<any, any>(body, `/orders/user/${this.orderId}`).subscribe( response => {
          if (!response.body) {
            return;
          }
          if (response.body.code == 200) {
            return;
          }
          if (response.body && response.body.message) {
            return;
          }
          return;
        } );
      }
      if (params['status'] == 'CANCELLED') {
        const body = {
          status: '1'
        };
        this.isPayment = false;
        this.appService.deleteOption<any>(this.orderId, '/orders').subscribe(
          (response) => {
            if (!response.body) {
              return;
            }
            if (response.body.code == 200) {
              return;
            }
            if (response.body && response.body.message) {
              return;
            }
            return;
          },
          (error) => {
            if (error.error && error.error.message) {
              return;
            }
            return;
          }
        );
      }
    }
    );
  }

  backToHome() {
    this.router.navigate(['/welcome']);
  }
}
