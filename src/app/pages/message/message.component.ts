import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { ChatService } from 'src/app/service/chat.service';
import { ChatV2Service } from 'src/app/service/chatv2.service';

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
  chatId: string = '';

  selectTVV(ttv: any): void {
    this.userId = ttv.userId;
    console.log(this.userId);
    this.chatId = this.chatService2.generateChatID(this.user.userId, this.userId);
    this.getMessages2();
  }

  constructor(
    private chatService: ChatService,
    private appService: AppService,
    private chatService2: ChatV2Service
  ) { }

  sendMessage(): void {
    this.chatService.sendMessage({
      message: this.message, 
      to: this.userId
    });
    this.message = '';
  }

  sendMessage2(): void {
    console.log(this.userId);
    this.chatService2.sendMessage(this.chatId, {
      message: this.message,
      receiverID: this.userId,
      senderID: this.user.userId,
      timestamp: Date.now(),
      username: this.user.username,
    });
    this.message = '';
    this.sendNotification();
    this.createNotification();
  }

  sendNotification(): void {
    const body = {
      userId: this.userId,
      message: {
        title: 'Notification',
        body: `${this.user.username} gửi tin nhắn cho bạn`
      }
    };

    this.appService.postOption<any, any>(body, '/notifications').subscribe((res: any) => {
      console.log(res);
    });
  }

  createNotification(): void {
    const body = {
      senderId: this.user.userId,
      receiverId: this.userId,
      body: `${this.user.username} gửi tin nhắn cho bạn`,
    };

    this.appService.postOption<any, any>(body, '/notifications/create').subscribe((res: any) => {
      console.log(res);
    });
  }

  getMessages2(): void {
    this.chatService2.getMessages(this.chatId, 10).subscribe((messages: any) => {
      this.messages = Object.values(messages);
      // tôi muốn đảo ngược thứ tự của mảng messages
      this.messages.reverse();
    });
  }

  getMessages(): void {
    this.chatService.getMessages().subscribe((message: any) => {
  
      this.messages.push(message);
      console.log(this.messages);
    });
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem('currentUser')) {
      return;
    }
    this.user = JSON.parse(sessionStorage.getItem('currentUser') ?? '{}');

    this.chatService.addUser(this.user.userId, this.user.role);
    // this.getMessages();

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
