import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { get } from 'firebase/database';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Order } from 'src/app/@types';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit{
  constructor(
    private appService: AppService,
    private message: NzMessageService,
    private modal: NzModalService,
  ) { }

  user: any;
  listOfData : any = []
  isConfirmDelete = false;

  confirmDelete(orderId:string): void {
    this.modal.confirm({
      nzTitle: `Xác nhận xóa hóa đơn ${orderId} ?`,
      nzOkText: 'Xóa',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteOrder(orderId),
      nzCancelText: 'Hủy',
      nzOnCancel: () => this.handleCancel()
    });
  }

  handleCancel(): void {
    this.isConfirmDelete = false;
  }

  payment(order: any){
    if(!order.paymentId){
      const body = {
        paymentRequest:{
          orderCode: JSON.parse(order.orderId),
          amount: order.totalAmount,
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
            this.updateOrder(response.body.data.data.data.paymentLinkId, order.orderId)

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
    if(order.paymentId){
      console.log(order.paymentId)
      const paymentId = order.paymentId
      window.open(`https://pay.payos.vn/web/${paymentId}`)
    }
    // this.appService.query<any>({},`/payment/${paymentId}`).subscribe(response => {
    //   if (!response.body) {
    //     return;
    //   }
    //   if (response.body.code == 200) {
    //     console.log(response.body)
    //     // return this.message.success(res.body.message)
    //   }
    // })
  }

  updateOrder(paymentId: any, orderId: any): void {
    const order: any = {
      paymentId: paymentId,
    };
    this.appService
      .update<Order, Partial<Order>>(order, '/orders/payment/' + orderId)
      .subscribe(
        (response) => {
          if (!response.body) {
            return;
          }
          if (response.body.code == 200) {
            this.getOrder()
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

  getOrder(){
    var body = {
      patient: this.user.id,
      sortBy: ['orderDate:desc'],
      page: 1,
      limit: 10
    }
    // const req: HttpParams = new HttpParams().set('page', '0').set('size', '10').set('sortBy', 'createAt:desc');
    this.appService.query<any>(body ,`/orders/user`).subscribe(response => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 200) {
        console.log(response.body)
        this.listOfData = response.body.data.results;
        // return this.message.success(res.body.message)
      }
    })
  }

  deleteOrder(order: any){
    this.appService.deleteOption<any>(order, '/orders').subscribe(
      (response) => {
        if (!response.body) {
          return;
        }
        if (response.body.code == 200) {
          this.message.success(response.body.message)
          this.getOrder()
          return;
        }
        if (response.body && response.body.message) {
          this.message.error(response.body.message)
          return;
        }
        return;
      },
      (error) => {
        if (error.error && error.error.message) {
          this.message.error(error.error.message)
          return;
        }
        return;
      }
    );
  }

  ngOnInit() {
    const currentUser = sessionStorage.getItem('currentUser')
    if(currentUser){
      this.user = JSON.parse(currentUser)
    }
    this.getOrder()
  }
}
