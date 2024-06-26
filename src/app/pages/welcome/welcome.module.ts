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
import { HeaderComponent } from 'src/app/header/header.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NZ_I18N, en_US, vi_VN } from 'ng-zorro-antd/i18n';
import { ServiceLookupComponent } from '../service-lookup/service-lookup.component';
import { NavBarComponent } from 'src/app/nav-bar/nav-bar.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { PriceFormatPipe } from 'src/app/@types/price-format.pipe';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ScheduleComponent } from '../schedule/schedule.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { OrderHistoryComponent } from '../order-history/order-history.component';
import { SheduleHistoryComponent } from '../shedule-history/shedule-history.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { RecordHistoryComponent } from '../record-history/record-history.component';
import { MessageComponent } from '../message/message.component';
import { ChatBotComponent } from '../chat-bot/chat-bot.component';
import { ReturnPaymentComponent } from '../return-payment/return-payment.component';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { TaiMuiHongComponent } from './page-specialist/tai-mui-hong/tai-mui-hong.component';
import { KhoaNoiComponent } from './page-specialist/khoa-noi/khoa-noi.component';
import { KhoaNgoaiComponent } from './page-specialist/khoa-ngoai/khoa-ngoai.component';
import { KhoaPhuSanComponent } from './page-specialist/khoa-phu-san/khoa-phu-san.component';
import { KhoaMatComponent } from './page-specialist/khoa-mat/khoa-mat.component';
import { KhoaNhiComponent } from './page-specialist/khoa-nhi/khoa-nhi.component';
import { KhoaRangHamMatComponent } from './page-specialist/khoa-rang-ham-mat/khoa-rang-ham-mat.component';
import { KhoaXQuangComponent } from './page-specialist/khoa-x-quang/khoa-x-quang.component';
import { TrungTamSieuAmComponent } from './page-specialist/trung-tam-sieu-am/trung-tam-sieu-am.component';
import { TrungTamXetNhiemComponent } from './page-specialist/trung-tam-xet-nhiem/trung-tam-xet-nhiem.component';
import { KhoaNoiSoiTieuHoaComponent } from './page-specialist/khoa-noi-soi-tieu-hoa/khoa-noi-soi-tieu-hoa.component';
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
    NzMessageModule,
    NzFormModule,
    NzTableModule,
    NzSelectModule,
    NzStepsModule,
    NzPaginationModule,
    NzTagModule,
    NzResultModule,
    NzCarouselModule
  ],
  declarations: [
    WelcomeComponent,
    ProfileComponent,
    HeaderComponent,
    NavBarComponent,
    ChangePasswordComponent,
    ServiceLookupComponent,
    PriceFormatPipe,
    ScheduleComponent,
    OrderHistoryComponent,
    SheduleHistoryComponent,
    RecordHistoryComponent,
    MessageComponent,
    ChatBotComponent,
    ReturnPaymentComponent,
    TaiMuiHongComponent,
    KhoaNoiComponent,
    KhoaNgoaiComponent,
    KhoaPhuSanComponent,
    KhoaMatComponent,
    KhoaNhiComponent,
    KhoaRangHamMatComponent,
    KhoaXQuangComponent,
    TrungTamSieuAmComponent,
    TrungTamXetNhiemComponent,
    KhoaNoiSoiTieuHoaComponent
  ],
  exports: [WelcomeComponent, NavBarComponent],
  providers: [
    { provide: NZ_I18N, useValue: vi_VN,
     }
  ],
})
export class WelcomeModule { }
