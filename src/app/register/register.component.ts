import { PropertyService } from './../services/property.service';
import { User } from './../model/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../services/user.service';
import { Admin } from './../model/admin.model';
import { first, map, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FileUploader } from "ng2-file-upload";

import { AuthenticationService } from './../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  admins: Admin[] = [];
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  file: File = null;
  filename: string = 'Choose file';

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private propertyService: PropertyService, 
    private toastrService: ToastrService) {
    this.dpConfig.containerClass = 'theme-default';
    this.dpConfig.adaptivePosition = true;
    this.dpConfig.dateInputFormat = 'YYYY-MM-DD';
    this.dpConfig.maxDate = new Date();
  }

  ngOnInit() {
    this.loading = true;
    this.userService.getAdmins()
      .subscribe(response => {
        this.loading = false;
        this.admins = response.data;
      }, error => {
        if(error.status === 0) {
          this.toastrService.error('Application server may not be running!', 'Error Message');
        } else {
          this.toastrService.error('Failed to load manager list!', 'Error Message');
        }
        this.loading = false;
      });

    this.registrationForm = this.formBuilder.group({
      username: ['af83580', Validators.required],
      password: ['Niranjan', Validators.required],
      firstName: ['Niranjan', Validators.required],
      lastName: ['Maharana', Validators.required],
      email: ['niranjan@gmail.com', [Validators.required, Validators.email]],
      // mobile: ['9556824846', Validators.required],
      mobile: ['9556824846', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      birthDate: ['', Validators.required],
      managerId: ['', Validators.required]
    });
  }

  onLoginClick() {
    this.router.navigate(["/login"]);
  }

  onFileChange(files: FileList) {
    this.file = files.item(0);
    this.filename = this.file.name;
  }

  // convenience getter for easy access to form fields
  get f() { return this.registrationForm.controls; }

  onSubmit() {
    let fileSizeLimit = +this.propertyService.config.FILE_UPLOAD_SIZE;
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }
    debugger;

    if(this.file && this.file.size > fileSizeLimit) {
      this.toastrService.error('File size should not exceed '+(fileSizeLimit/1024)+' KBs!', 'Error Message');
      return;
    }

    this.loading = true;
    let user: User = new User(this.registrationForm.value);

    this.userService.addUser(user, this.file)
    .subscribe(response => {
      this.loading = false;
      this.toastrService.success(response.statusMessage, 'Success Message');
      this.router.navigateByUrl('login');
    }, error => {
      if(error.status === 0) {
        this.toastrService.error('Application server may not be running!', 'Error Message');
      } else {
        this.toastrService.error(error.error.statusMessage, 'Error Message');
      }
      this.loading = false;
    });

    // this.authenticationService.login(this.f.username.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe(
    //   data => {
    //     this.router.navigate([this.returnUrl]);
    //   },
    //   error => {
    //     this.error = error;
    //     this.loading = false;
    //   });
    this.loading = false;
  }
}