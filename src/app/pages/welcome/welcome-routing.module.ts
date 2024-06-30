import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { TaiMuiHongComponent } from './page-specialist/tai-mui-hong/tai-mui-hong.component';
import { KhoaNoiComponent } from './page-specialist/khoa-noi/khoa-noi.component';
import { KhoaNgoaiComponent } from './page-specialist/khoa-ngoai/khoa-ngoai.component';
import { KhoaPhuSanComponent } from './page-specialist/khoa-phu-san/khoa-phu-san.component';
import { KhoaNhiComponent } from './page-specialist/khoa-nhi/khoa-nhi.component';
import { KhoaMatComponent } from './page-specialist/khoa-mat/khoa-mat.component';
import { KhoaXQuangComponent } from './page-specialist/khoa-x-quang/khoa-x-quang.component';
import { KhoaNoiSoiTieuHoaComponent } from './page-specialist/khoa-noi-soi-tieu-hoa/khoa-noi-soi-tieu-hoa.component';
import { TrungTamXetNhiemComponent } from './page-specialist/trung-tam-xet-nhiem/trung-tam-xet-nhiem.component';
import { TrungTamSieuAmComponent } from './page-specialist/trung-tam-sieu-am/trung-tam-sieu-am.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'taimuihong', component: TaiMuiHongComponent },
  { path: 'khoanoi', component: KhoaNoiComponent},
  { path: 'khoangoai', component: KhoaNgoaiComponent},
  { path: 'khoaphusan', component: KhoaPhuSanComponent},
  { path: 'khoanhi', component: KhoaNhiComponent},
  { path: 'khoamt', component: KhoaMatComponent },
  { path: 'x-quang', component: KhoaXQuangComponent },
  { path: 'noisoitieuhoa', component: KhoaNoiSoiTieuHoaComponent },
  { path:'trungtamxetnhiem', component: TrungTamXetNhiemComponent},
  { path: 'trungtamsieuam', component: TrungTamSieuAmComponent},
  { path: 'khoataimihng', redirectTo: 'taimuihong' },
  { path: 'khoani', redirectTo: 'khoanoi' },
  { path: 'khoangoi', redirectTo: 'khoangoai' },
  { path: 'khoasn', redirectTo: 'khoaphusan' },
  { path: 'khoaxquang', redirectTo: 'x-quang' },
  { path: 'khoanisoitiuha', redirectTo: 'noisoitieuhoa' },
  { path: 'trungtmxtnghim', redirectTo: 'trungtamxetnhiem' },
  { path: 'trungtmsium', redirectTo: 'trungtamsieuam' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
