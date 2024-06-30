import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { AuthService } from 'src/app/service/auth.service';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  images = [
    'assets/images/slide1.jpg',
    'assets/images/slide2.jpg',
    'assets/images/slide3.png',
    'assets/images/slide4.jpg',
    'assets/images/slide5.jpg',
  ];

  services: any[] = [];
  specialistList: any[] = [];

  constructor(private appService: AppService) {}

  getServices() {
    this.appService.find<any>('/orders/topServices').subscribe((response) => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 200) {
        this.services = response.body.data;
      }
    });
  }

  removeSpecialChars(value: string): string {
    if (!value) return value;
    return value.replace(/[^a-zA-Z0-9]/g, '');
  }
  getSpecialist() {
    this.appService.find<any>('/specialist').subscribe((response) => {
      if (!response.body) {
        return;
      }
      if (response.body.code == 200) {
        this.specialistList.push(...response.body.data.results);
        // return this.message.success(res.body.message)
        this.specialistList.forEach((specialist: any) => {
          const name = specialist.name;
          const route = this.removeSpecialChars(name);
          specialist.route = route.toLowerCase();
        });
        console.log(this.specialistList);
      }
    });
  }

  ngOnInit() {
    this.getServices();
    this.getSpecialist();
  }
}
