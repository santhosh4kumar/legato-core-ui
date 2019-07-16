import { PropertyService } from './services/property.service';
import { AuthenticationService } from './services/authentication.service';
import { environment } from './../environments/environment';
import { Component, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Learn @ Legato';

  constructor(private propertyService: PropertyService, 
    private _authService: AuthenticationService,
    private userIdle: UserIdleService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    if (this._authService.token) {
      //Start watching for user inactivity.
      this.userIdle.startWatching();
      // Start watching when user idle is starting.
      this.userIdle.onTimerStart().subscribe(count => {
        setTimeout(() => {
          this.toastrService.warning('Expiration', 'Your session will expire soon!', {
            tapToDismiss: false,
            timeOut: 60000
          });
        }, 0);
      });
      // Start watch when time is up.
      this.userIdle.onTimeout().subscribe(() => {
        this._authService.logout();
      });
    }
  }

  stop() {
    this.userIdle.stopTimer();
  }

  stopWatching() {
    this.userIdle.stopWatching();
  }

  startWatching() {
    this.userIdle.startWatching();
  }

  restart() {
    this.userIdle.resetTimer();
  }
}
