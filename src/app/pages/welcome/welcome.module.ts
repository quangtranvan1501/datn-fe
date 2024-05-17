import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ProfileComponent } from '../profile/profile.component';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzMessageModule } from 'ng-zorro-antd/message';
@NgModule({
  imports: [
    WelcomeRoutingModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzGridModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzAvatarModule,
    CommonModule,
    NzDropDownModule,
    NzDescriptionsModule,
    NzModalModule,
    FormsModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzRadioModule,
    NzMessageModule

  ],
  declarations: [
    WelcomeComponent,
    ProfileComponent
  ],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
