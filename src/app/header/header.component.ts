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

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.router.navigate(["/login"]);
  }

  logout() {
    this.authenticationService.logout();
  }

}
