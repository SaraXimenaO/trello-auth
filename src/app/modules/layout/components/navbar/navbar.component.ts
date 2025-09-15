import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import { User } from '@models/user.model';

import {AuthService} from '@services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;

  user: User | null = null;

  constructor(
    private authservice: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authservice.getProfile()
    .subscribe(result =>
      {
       this.user = result;
      }
    )
  }

  logout(){
    this.authservice.logout();
    this.router.navigate(['/login']);
  }
}
