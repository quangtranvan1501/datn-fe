import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit{
  messages: any[] = [];
  message: string = '';
  user:any;
  userId: string = '';
  tvvs: any[] = [];

  selectTVV(ttv: any): void {
    this.userId = ttv.userId;
  }

  constructor(
    private chatService: ChatService,
    private appService: AppService
  ) { }

  sendMessage(): void {
    this.chatService.sendMessage({
      message: this.message, 
      to: this.userId
    });
    this.message = '';
  }

  getMessages(): void {
    this.chatService.getMessages().subscribe((message: any) => {
  
      this.messages.push(message);
      console.log(this.messages);
    });
  }

  ngOnInit(): void {
    if (!localStorage.getItem('currentUser')) {
      return;
    }
    this.user = JSON.parse(localStorage.getItem('currentUser') ?? '{}');

    this.chatService.addUser(this.user.userId, this.user.role);
    this.getMessages();

    // const params: HttpParams = {
    //   role: 'admin',
    //   page: 1,
    //   limit: 10,
    // };

    // tạo biến params kiểu HttpParams gồm trường role, limit, page
    let params = new HttpParams();
    params = params.append('role', 'admin');
    params = params.append('page', '1');
    params = params.append('limit', '10');

    this.appService.getOption<any>(params, '/message/onlineUsers').subscribe((res: any) => {
      this.tvvs = res.body;
      console.log(this.tvvs);
    });
    
    // this.appService.find('/users/tvv').subscribe((res: any) => {
    //   this.tvvs = res.body.data;
    // })
  }

}
