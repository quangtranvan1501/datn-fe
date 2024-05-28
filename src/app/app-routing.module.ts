import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from 'src/app/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ServiceLookupComponent } from './pages/service-lookup/service-lookup.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';
import { SheduleHistoryComponent } from './pages/shedule-history/shedule-history.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [authGuard]},
  { path: 'service-lookup', component: ServiceLookupComponent},
  { path: 'schedule', component: ScheduleComponent, canActivate: [authGuard]},
  { path: 'order-history', component: OrderHistoryComponent, canActivate: [authGuard]},
  { path: 'shedule-history', component: SheduleHistoryComponent, canActivate: [authGuard]},
  { path: 'doctor', loadChildren: () => import('./doctor/doctor.module').then(m => m.DoctorModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
