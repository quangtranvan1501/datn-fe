"use strict";(self.webpackChunkdatn_frontend2=self.webpackChunkdatn_frontend2||[]).push([[891],{9891:(dn,C,r)=>{r.r(C),r.d(C,{WelcomeModule:()=>un});var l=r(3403),n=r(5879),I=r(9680),m=r(3410),u=r(6814),y=r(8324),p=r(2787),z=r(551),S=r(7582),N=r(8645),T=r(9773),F=r(2181),E=r(7921),P=r(1608),R=r(7754),Z=r(9388),D=r(2074),L=r(5448);const h=["*"];function Y(t,c){}function J(t,c){if(1&t&&(n.ynx(0),n.TgZ(1,"span",3),n.YNc(2,Y,0,0,"ng-template",4),n._UZ(3,"span",5),n.qZA(),n.BQk()),2&t){const e=n.oxw(),o=n.MAs(2);n.xp6(1),n.Q6J("nzDropdownMenu",e.nzOverlay),n.xp6(1),n.Q6J("ngTemplateOutlet",o)}}function j(t,c){1&t&&(n.TgZ(0,"span",6),n.Hsn(1),n.qZA())}function Q(t,c){if(1&t&&(n.ynx(0),n._uU(1),n.BQk()),2&t){const e=n.oxw(2);n.xp6(1),n.hij(" ",e.nzBreadCrumbComponent.nzSeparator," ")}}function w(t,c){if(1&t&&(n.TgZ(0,"nz-breadcrumb-separator"),n.YNc(1,Q,2,1,"ng-container",7),n.qZA()),2&t){const e=n.oxw();n.xp6(1),n.Q6J("nzStringTemplateOutlet",e.nzBreadCrumbComponent.nzSeparator)}}function W(t,c){if(1&t){const e=n.EpF();n.TgZ(0,"nz-breadcrumb-item")(1,"a",2),n.NdJ("click",function(a){const i=n.CHM(e).$implicit,d=n.oxw(2);return n.KtG(d.navigate(i.url,a))}),n._uU(2),n.qZA()()}if(2&t){const e=c.$implicit;n.xp6(1),n.uIk("href",e.url,n.LSH),n.xp6(1),n.Oqu(e.label)}}function $(t,c){if(1&t&&(n.ynx(0),n.YNc(1,W,3,2,"nz-breadcrumb-item",1),n.BQk()),2&t){const e=n.oxw();n.xp6(1),n.Q6J("ngForOf",e.breadcrumbs)}}class _{}let H=(()=>{class t{static#n=this.\u0275fac=function(o){return new(o||t)};static#t=this.\u0275cmp=n.Xpm({type:t,selectors:[["nz-breadcrumb-separator"]],hostAttrs:[1,"ant-breadcrumb-separator"],exportAs:["nzBreadcrumbSeparator"],ngContentSelectors:h,decls:1,vars:0,template:function(o,a){1&o&&(n.F$t(),n.Hsn(0))},encapsulation:2})}return t})(),A=(()=>{class t{constructor(e){this.nzBreadCrumbComponent=e}static#n=this.\u0275fac=function(o){return new(o||t)(n.Y36(_))};static#t=this.\u0275cmp=n.Xpm({type:t,selectors:[["nz-breadcrumb-item"]],inputs:{nzOverlay:"nzOverlay"},exportAs:["nzBreadcrumbItem"],ngContentSelectors:h,decls:4,vars:3,consts:[[4,"ngIf","ngIfElse"],["noMenuTpl",""],[4,"ngIf"],["nz-dropdown","",1,"ant-breadcrumb-overlay-link",3,"nzDropdownMenu"],[3,"ngTemplateOutlet"],["nz-icon","","nzType","down"],[1,"ant-breadcrumb-link"],[4,"nzStringTemplateOutlet"]],template:function(o,a){if(1&o&&(n.F$t(),n.YNc(0,J,4,2,"ng-container",0),n.YNc(1,j,2,0,"ng-template",null,1,n.W1O),n.YNc(3,w,2,1,"nz-breadcrumb-separator",2)),2&o){const s=n.MAs(2);n.Q6J("ngIf",!!a.nzOverlay)("ngIfElse",s),n.xp6(3),n.Q6J("ngIf",a.nzBreadCrumbComponent.nzSeparator)}},dependencies:[u.O5,u.tP,y.f,p.cm,z.Ls,H],encapsulation:2,changeDetection:0})}return t})(),G=(()=>{class t{constructor(e,o,a,s,i){this.injector=e,this.cdr=o,this.elementRef=a,this.renderer=s,this.directionality=i,this.nzAutoGenerate=!1,this.nzSeparator="/",this.nzRouteLabel="breadcrumb",this.nzRouteLabelFn=d=>d,this.breadcrumbs=[],this.dir="ltr",this.destroy$=new N.x}ngOnInit(){this.nzAutoGenerate&&this.registerRouterChange(),this.directionality.change?.pipe((0,T.R)(this.destroy$)).subscribe(e=>{this.dir=e,this.prepareComponentForRtl(),this.cdr.detectChanges()}),this.dir=this.directionality.value,this.prepareComponentForRtl()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}navigate(e,o){o.preventDefault(),this.injector.get(l.F0).navigateByUrl(e)}registerRouterChange(){try{const e=this.injector.get(l.F0),o=this.injector.get(l.gz);e.events.pipe((0,F.h)(a=>a instanceof l.m2),(0,T.R)(this.destroy$),(0,E.O)(!0)).subscribe(()=>{this.breadcrumbs=this.getBreadcrumbs(o.root),this.cdr.markForCheck()})}catch{throw new Error(`${P.Bq} You should import RouterModule if you want to use 'NzAutoGenerate'.`)}}getBreadcrumbs(e,o="",a=[]){const s=e.children;if(0===s.length)return a;for(const i of s)if(i.outlet===l.eC){const d=i.snapshot.url.map(g=>g.path).filter(g=>g).join("/"),B=d?`${o}/${d}`:o,U=this.nzRouteLabelFn(i.snapshot.data[this.nzRouteLabel]);return d&&U&&a.push({label:U,params:i.snapshot.params,url:B}),this.getBreadcrumbs(i,B,a)}return a}prepareComponentForRtl(){"rtl"===this.dir?this.renderer.addClass(this.elementRef.nativeElement,"ant-breadcrumb-rtl"):this.renderer.removeClass(this.elementRef.nativeElement,"ant-breadcrumb-rtl")}static#n=this.\u0275fac=function(o){return new(o||t)(n.Y36(n.zs3),n.Y36(n.sBO),n.Y36(n.SBq),n.Y36(n.Qsj),n.Y36(Z.Is,8))};static#t=this.\u0275cmp=n.Xpm({type:t,selectors:[["nz-breadcrumb"]],hostAttrs:[1,"ant-breadcrumb"],inputs:{nzAutoGenerate:"nzAutoGenerate",nzSeparator:"nzSeparator",nzRouteLabel:"nzRouteLabel",nzRouteLabelFn:"nzRouteLabelFn"},exportAs:["nzBreadcrumb"],features:[n._Bn([{provide:_,useExisting:t}])],ngContentSelectors:h,decls:2,vars:1,consts:[[4,"ngIf"],[4,"ngFor","ngForOf"],[3,"click"]],template:function(o,a){1&o&&(n.F$t(),n.Hsn(0),n.YNc(1,$,2,1,"ng-container",0)),2&o&&(n.xp6(1),n.Q6J("ngIf",a.nzAutoGenerate&&a.breadcrumbs.length))},dependencies:[u.sg,u.O5,A],encapsulation:2,changeDetection:0})}return(0,S.gn)([(0,R.yF)()],t.prototype,"nzAutoGenerate",void 0),t})(),X=(()=>{class t{static#n=this.\u0275fac=function(o){return new(o||t)};static#t=this.\u0275mod=n.oAB({type:t});static#e=this.\u0275inj=n.cJS({imports:[u.ez,y.T,D.U8,L.e4,p.b1,z.PV,Z.vT]})}return t})();var f=r(2987),b=r(2920),v=r(2840),K=r(855),V=r(1958),x=r(824),O=r(6928);function k(t,c){1&t&&(n.TgZ(0,"button",19),n._UZ(1,"span",20),n.qZA())}function q(t,c){1&t&&(n.ynx(0),n.TgZ(1,"button",21),n._uU(2,"\u0110\u0103ng nh\u1eadp"),n.qZA(),n.BQk())}function nn(t,c){if(1&t){const e=n.EpF();n.TgZ(0,"div",22),n._uU(1),n.qZA(),n.TgZ(2,"nz-button-group"),n._UZ(3,"nz-avatar",23),n.qZA(),n.TgZ(4,"nz-dropdown-menu",null,24)(6,"ul",25)(7,"li",26),n._UZ(8,"span",27),n._uU(9," Th\xf4ng tin c\xe1 nh\xe2n "),n.qZA(),n.TgZ(10,"li",28),n.NdJ("click",function(){n.CHM(e);const a=n.oxw();return n.KtG(a.logOut())}),n._UZ(11,"span",29),n._uU(12," \u0110\u0103ng xu\u1ea5t "),n.qZA()()()}if(2&t){const e=n.MAs(5),o=n.oxw();n.xp6(1),n.hij("Hi, ",o.user.name,""),n.xp6(2),n.Q6J("nzDropdownMenu",e)}}const tn=[{path:"",component:(()=>{class t{constructor(e){this.authService=e,this.isLogin=!1}logOut(){this.authService.logout(),window.location.reload()}ngOnInit(){this.isLogin=this.authService.isLoggedIn();const e=localStorage.getItem("currentUser");e&&(this.user=JSON.parse(e)),console.log(this.user),console.log("login ",this.isLogin)}static#n=this.\u0275fac=function(o){return new(o||t)(n.Y36(I.e))};static#t=this.\u0275cmp=n.Xpm({type:t,selectors:[["app-welcome"]],decls:47,vars:3,consts:[["nz-row","","nzJustify","space-between"],["nz-col","","nzSpan","4",1,"logo"],["src","assets/images/logo.png","alt","logo"],["nz-col","","nzSpan","14",1,"search"],["nzSearch","",1,"inputSearch",3,"nzAddOnAfter"],["type","text","nz-input","","placeholder","input search text"],["suffixIconButton",""],["nz-col","","nzSpan","6",1,"info"],[4,"ngIf","ngIfElse"],["infoUser",""],["nz-menu","","nzMode","horizontal",1,"navBar"],["nz-menu-item","","nzSelected","",1,"navItem"],["nz-icon","","nzType","home","nzTheme","fill",2,"color","rgb(8, 84, 44)"],["nz-menu-item","",1,"navItem"],["nz-icon","","nzType","schedule","nzTheme","fill",2,"color","rgb(197, 240, 25)"],["nz-icon","","nzType","bars","nzTheme","outline",2,"color","rgb(244, 27, 27)"],["nz-icon","","nzType","customer-service","nzTheme","fill",2,"color","rgb(8, 61, 84)"],["nz-icon","","nzType","robot","nzTheme","fill",2,"color","rgb(73, 8, 84)"],[1,"inner-content"],["nz-button","","nzType","primary","nzSearch",""],["nz-icon","","nzType","search"],["routerLink","/login","nzSize","default","nz-button",""],[1,"userName"],["nzIcon","user","nz-dropdown","",1,"avatar",2,"background-color","#87d068",3,"nzDropdownMenu"],["infoNemu","nzDropdownMenu"],["nz-menu",""],["routerLink","/profile","nz-menu-item",""],["nz-icon","","nzType","user","nzTheme","outline"],["nz-menu-item","",3,"click"],["nz-icon","","nzType","logout","nzTheme","outline"]],template:function(o,a){if(1&o&&(n.TgZ(0,"nz-layout")(1,"nz-header")(2,"div",0)(3,"div",1),n._UZ(4,"img",2),n.qZA(),n.TgZ(5,"div",3)(6,"nz-input-group",4),n._UZ(7,"input",5),n.qZA(),n.YNc(8,k,2,0,"ng-template",null,6,n.W1O),n.qZA(),n.TgZ(10,"div",7),n.YNc(11,q,3,0,"ng-container",8),n.YNc(12,nn,13,2,"ng-template",null,9,n.W1O),n.qZA()()(),n.TgZ(14,"nz-content")(15,"ul",10)(16,"li",11),n._UZ(17,"span",12),n.TgZ(18,"div"),n._uU(19," Trang ch\u1ee7 "),n.qZA()(),n.TgZ(20,"li",13),n._UZ(21,"span",14),n.TgZ(22,"div"),n._uU(23," \u0110\u1eb7t l\u1ecbch kh\xe1m "),n.qZA()(),n.TgZ(24,"li",13),n._UZ(25,"span",15),n.TgZ(26,"div"),n._uU(27," D\u1ecbch v\u1ee5 "),n.qZA()(),n.TgZ(28,"li",13),n._UZ(29,"span",16),n.TgZ(30,"div"),n._uU(31," T\u01b0 v\u1ea5n vi\xean "),n.qZA()(),n.TgZ(32,"li",13),n._UZ(33,"span",17),n.TgZ(34,"div"),n._uU(35," Chatbot "),n.qZA()()(),n.TgZ(36,"nz-breadcrumb")(37,"nz-breadcrumb-item"),n._uU(38,"Home"),n.qZA(),n.TgZ(39,"nz-breadcrumb-item"),n._uU(40,"List"),n.qZA(),n.TgZ(41,"nz-breadcrumb-item"),n._uU(42,"App"),n.qZA()(),n.TgZ(43,"div",18),n._uU(44,"Content"),n.qZA()(),n.TgZ(45,"nz-footer"),n._uU(46,"Ant Design \xa92020 Implement By Angular"),n.qZA()()),2&o){const s=n.MAs(9),i=n.MAs(13);n.xp6(6),n.Q6J("nzAddOnAfter",s),n.xp6(5),n.Q6J("ngIf",!a.isLogin)("ngIfElse",i)}},dependencies:[l.rH,m.hw,m.E8,m.OK,m.nX,G,A,f.wO,f.u9,b.t3,b.SK,v.ix,v.fY,K.w,V.dQ,x.Zp,x.gB,z.Ls,O.Dz,u.O5,p.cm,p.RR],styles:[".logo[_ngcontent-%COMP%]{background:rgba(255,255,255,.2);width:100%;height:100%;display:flex;justify-content:center;align-items:center}.logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;padding:8px 4px}.info[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}.info[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-top:15px;box-shadow:2px 2px 2px gray}.userName[_ngcontent-%COMP%]{color:#333;font-size:16px;font-weight:600;padding-right:8px}[nz-menu][_ngcontent-%COMP%]{line-height:64px}nz-header[_ngcontent-%COMP%]{background:#fff;box-shadow:2px 2px 2px #cdcdcd}nz-breadcrumb[_ngcontent-%COMP%]{margin:16px 0}nz-content[_ngcontent-%COMP%]{padding:0 50px;margin-top:10px}nz-footer[_ngcontent-%COMP%]{text-align:center}.ant-col-14[_ngcontent-%COMP%]{margin-top:15px}button[_ngcontent-%COMP%]{border-radius:4px;background-color:#08542c;border:none;font-size:18px;color:#fff}.search[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}.inputSearch[_ngcontent-%COMP%]{width:80%}.inner-content[_ngcontent-%COMP%]{background:#fff;padding:24px;min-height:280px}.navBar[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;font-size:18px;border-radius:4px;box-shadow:2px 2px 4px #cdcdcd99}.navItem[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;flex-direction:column}.navItem[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{margin-top:-28px;margin-bottom:-12px}.avatar[_ngcontent-%COMP%]{box-shadow:2px 2px 4px #d1d1d180}  .navItem .ant-menu-title-content svg{font-size:28px}  .navItem .ant-menu-title-content{text-align:center}"]})}return t})()}];let en=(()=>{class t{static#n=this.\u0275fac=function(o){return new(o||t)};static#t=this.\u0275mod=n.oAB({type:t});static#e=this.\u0275inj=n.cJS({imports:[l.Bz.forChild(tn),l.Bz]})}return t})();var on=r(8125),rn=r(5842),M=r(95),an=r(2612),cn=r(7511),sn=r(7907),ln=r(3460);let un=(()=>{class t{static#n=this.\u0275fac=function(o){return new(o||t)};static#t=this.\u0275mod=n.oAB({type:t});static#e=this.\u0275inj=n.cJS({imports:[en,m.wm,X,f.ip,b.Jb,v.sL,x.o7,z.PV,O.Rt,u.ez,p.b1,on.q6,rn.Qp,M.u5,M.UX,an.Wr,cn.Hb,sn.aF,ln.gR]})}return t})()}}]);