import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent {
  messages: any[] = [];
  message: string = '';
  user:any;
  userId: string = '';
  tvvs: any[] = [];
  isLoading = false;

  selectTVV(ttv: any): void {
    this.userId = ttv.userId;
  }

  constructor(
    private chatService: ChatService,
    private appService: AppService
  ) { }

  async sendMessage(): Promise<void>{
    this.isLoading = true;
    const body = {
      message: this.message
    };
    this.messages.push({
      'from': 'user',
      'message': this.message});
    this.appService.post<any, any>(body, '/message/chatbot').subscribe((res: any) => {
      if (res.body) {
        this.isLoading = false;
        this.messages.push({
          'from': 'chatbot',
          'message': res.body.message});
        this.message = '';
      }
    }
    );
  }

  // getMessages(): void {
  //   this.chatService.getMessages().subscribe((message: any) => {
  
  //     this.messages.push(message);
  //     console.log(this.messages);
  //   });
  // }

  ngOnInit(): void {
    // if (!sessionStorage.getItem('currentUser')) {
    //   return;
    // }
    // this.user = JSON.parse(sessionStorage.getItem('currentUser') ?? '{}');

    // this.chatService.addUser(this.user.userId, this.user.role);
    // this.getMessages();

    // const params: HttpParams = {
    //   role: 'admin',
    //   page: 1,
    //   limit: 10,
    // };

    // tạo biến params kiểu HttpParams gồm trường role, limit, page
    // let params = new HttpParams();
    // params = params.append('role', 'admin');
    // params = params.append('page', '1');
    // params = params.append('limit', '10');

    // this.appService.getOption<any>(params, '/message/onlineUsers').subscribe((res: any) => {
    //   this.tvvs = res.body;
    //   console.log(this.tvvs);
    // });
    
    // this.appService.find('/users/tvv').subscribe((res: any) => {
    //   this.tvvs = res.body.data;
    // })
  }
}
