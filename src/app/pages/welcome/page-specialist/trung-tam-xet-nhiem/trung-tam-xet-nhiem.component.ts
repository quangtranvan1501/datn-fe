import { Component } from '@angular/core';
import { User } from 'src/app/@types';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-trung-tam-xet-nhiem',
  templateUrl: './trung-tam-xet-nhiem.component.html',
  styleUrls: ['./trung-tam-xet-nhiem.component.css']
})
export class TrungTamXetNhiemComponent {
  doctorList: any[] = []

  constructor(
    private appService: AppService,
  ) { }

  getDoctorList() {
    this.appService
      .getById<User[]>('6642dfdc2b5fbc51640843dd', '/users/doctor')
      .subscribe((response) => {
        if (!response.body) {
          return;
        }
        if (response.body.code == 200) {
          this.doctorList = response.body.data;
        }
      });
    }


  ngOnInit() {
    this.getDoctorList();
  }
}
