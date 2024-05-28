import { Component, OnInit } from '@angular/core';
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
  ) { }

  user: any;
  listOfData : any = []
  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser')
    if(currentUser){
      this.user = JSON.parse(currentUser)
    }
    this.appService.getById<Order>(this.user.id ,'/orders/user').subscribe(response => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 200) {
        console.log(response.body)
        this.listOfData = response.body.data;
        // return this.message.success(res.body.message)
      }
    })
  }
}
