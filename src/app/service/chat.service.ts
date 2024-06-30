import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private socket: Socket,
    private appService: AppService
  ) { }

  sendMessage(message: any) {
    this.socket.emit('send-msg', message);
  }

  getMessages() {
    return this.socket.fromEvent('receive-msg');
  }

  addUser(userId: string, role: string) {
    this.socket.emit('add-user', {userId, role});
    console.log('add user', userId, role);
  }

  chatBot(message: any) {
    const body = {
      message: message
    };
    this.appService.post<any, any>(body, '/message/chatbot').subscribe((res: any) => {
      if (res.body) {
        return res.body.message;
      }
    }
    );
  }
}
