import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnChanges, OnInit{
  @Input() routerNav: string = '';

  constructor(
    private authService: AuthService,
  ) { }

  selectedNavItem: string = '';
  isLogin: boolean = false

  ngOnChanges(changes: SimpleChanges) {
    if (changes['routerNav']) {
      this.setSelectedItem(changes['routerNav'].currentValue);
    }
  }
  ngOnInit(): void {
    this.isLogin = this.authService.isLoggedIn()
  }

  setSelectedItem(nav: string) {
    this.selectedNavItem = nav;
  }
}
