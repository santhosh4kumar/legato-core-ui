import { Feedback } from './../../model/feedback.model';
import { FeedbackService } from './../../services/feedback.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.scss']
})
export class AddFeedbackComponent implements OnInit {
  submitted = false;
  feedbackFormGroup: FormGroup;
  feedback: Feedback = {
    id: null,
    username: '',
    email: '',
    mobile: '',
    message: ''
  };

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _feedbackService: FeedbackService,
    private _formBuilder: FormBuilder) {
    this.createForm();
    this.submitted = false;
  }

  createForm() {
    this.feedbackFormGroup = this._formBuilder.group({
      id: ['', ],
      username: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      message: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    
  }

  onSubmit() {
    this.submitted = true;
    if(!this.feedbackFormGroup.valid) {
      return;
    }

    this._feedbackService.save(this.feedback);    
  }
}
