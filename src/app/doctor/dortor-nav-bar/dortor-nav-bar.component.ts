import { Component, Input, SimpleChanges } from '@angular/core';
import { flush } from '@angular/core/testing';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-dortor-nav-bar',
  templateUrl: './dortor-nav-bar.component.html',
  styleUrls: ['./dortor-nav-bar.component.css']
})
export class DortorNavBarComponent {
  @Input() routerNav: string = '';
  @Input() isSub: string = '';

  constructor(
    private authService: AuthService,
  ) { }

  selectedNavItem: string = '';
  isOpen: string = '';
  isLogin: boolean = false

  ngOnChanges(changes: SimpleChanges) {
    if (changes['routerNav']) {
      this.setSelectedItem(changes['routerNav'].currentValue);
    }
    if (changes['isSub']) {
      this.seSubItem(changes['isSub'].currentValue);
    }
  }

  ngOnInit(): void {
    this.isLogin = this.authService.isLoggedIn()
  }

  setSelectedItem(nav: string) {
    this.selectedNavItem = nav;
  }
  seSubItem(nav: string) {
    this.isOpen = nav;
  }
}
