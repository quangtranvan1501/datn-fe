import { Component } from '@angular/core';
import { User } from 'src/app/@types';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-trung-tam-sieu-am',
  templateUrl: './trung-tam-sieu-am.component.html',
  styleUrls: ['./trung-tam-sieu-am.component.css']
})
export class TrungTamSieuAmComponent {
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
