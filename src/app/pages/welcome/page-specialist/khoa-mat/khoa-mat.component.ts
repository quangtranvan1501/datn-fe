import { Component } from '@angular/core';
import { User } from 'src/app/@types';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-khoa-mat',
  templateUrl: './khoa-mat.component.html',
  styleUrls: ['./khoa-mat.component.css']
})
export class KhoaMatComponent {
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
