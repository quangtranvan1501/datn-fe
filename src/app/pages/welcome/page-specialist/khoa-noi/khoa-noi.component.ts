import { Component } from '@angular/core';
import { User } from 'src/app/@types';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-khoa-noi',
  templateUrl: './khoa-noi.component.html',
  styleUrls: ['./khoa-noi.component.css']
})
export class KhoaNoiComponent {
  doctorList: any[] = []

  constructor(
    private appService: AppService,
  ) { }

  getDoctorList() {
    this.appService
      .getById<User[]>('66430d5f809f801598075e8d', '/users/doctor')
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
