import { environment } from './../environments/environment';
import { Component, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Learn @ Legato';

  constructor(private toastrService: ToastrService) { }

  ngOnInit(): void {
    // this.toastrService.success('Something got success.', 'Success Message');
  }
}
