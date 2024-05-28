import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorRoutingModule } from './doctor-routing.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { DoctorComponent } from './doctor.component';
import { DortorNavBarComponent } from './dortor-nav-bar/dortor-nav-bar.component';
import { DoctorHeaderComponent } from './doctor-header/doctor-header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { ConfigSheduleComponent } from './config-shedule/config-shedule.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { DoctorChangePasswordComponent } from './doctor-change-password/doctor-change-password.component';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { SheduleListComponent } from './shedule-list/shedule-list.component';
import { MedicalRecordComponent } from './medical-record/medical-record.component';
import { CreateRecordComponent } from './create-record/create-record.component';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@NgModule({
  declarations: [
    DoctorComponent,
    DortorNavBarComponent,
    DoctorHeaderComponent,
    ConfigSheduleComponent,
    DoctorProfileComponent,
    DoctorChangePasswordComponent,
    SheduleListComponent,
    MedicalRecordComponent,
    CreateRecordComponent,
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzAvatarModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzDropDownModule,
    NzInputModule,
    NzMenuModule,
    NzIconModule,
    NzCalendarModule,
    NzBadgeModule,
    NzModalModule,
    NzDescriptionsModule,
    NzDatePickerModule,
    NzRadioModule,
    NzTableModule,
    NzTagModule,
    NzTimePickerModule
  ]
})
export class DoctorModule { }
