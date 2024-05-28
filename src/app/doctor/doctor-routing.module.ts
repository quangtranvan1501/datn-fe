import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor.component';
import { ConfigSheduleComponent } from './config-shedule/config-shedule.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { authGuard } from '../auth.guard';
import { DoctorChangePasswordComponent } from './doctor-change-password/doctor-change-password.component';
import { SheduleListComponent } from './shedule-list/shedule-list.component';
import { MedicalRecordComponent } from './medical-record/medical-record.component';
import { CreateRecordComponent } from './create-record/create-record.component';



const routes: Routes = [
  { path: '', component: DoctorComponent, canActivate: [authGuard] },
  { path: 'config-shedule', component: ConfigSheduleComponent, canActivate: [authGuard]},
  { path: 'profile', component: DoctorProfileComponent, canActivate: [authGuard]},
  { path: 'change-password', component: DoctorChangePasswordComponent, canActivate: [authGuard]},
  { path: 'shedule-list', component: SheduleListComponent, canActivate: [authGuard] },
  { path: 'medical-record', component: MedicalRecordComponent, canActivate: [authGuard] },
  { path: 'create-record', component: CreateRecordComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
