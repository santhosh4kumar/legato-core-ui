import { Router } from '@angular/router';
import { User } from './../model/user.model';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  collapse: boolean = true;
  username: string = "";
  loggedIn: boolean = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    if (this.authenticationService.currentUserValue) {
      this.username = this.authenticationService.currentUserValue.username;
      this.loggedIn = this.authenticationService.loggedIn;
    }
  }

  ngOnInit() {
    if (this.authenticationService.currentUserValue) {
      this.username = this.authenticationService.currentUserValue.username;
      this.loggedIn = this.authenticationService.loggedIn;
    }
  }

  login() {
    this.loggedIn = false;
    this.router.navigate(["/login"]);
  }

  logout() {
    this.loggedIn = false;
    this.router.navigate(["/login"]);
  }

}
