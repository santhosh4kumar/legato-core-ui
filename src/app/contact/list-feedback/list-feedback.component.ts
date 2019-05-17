import { Feedback } from './../../model/feedback.model';
import { FeedbackService } from './../../services/feedback.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-feedback',
  templateUrl: './list-feedback.component.html',
  styleUrls: ['./list-feedback.component.scss']
})
export class ListFeedbackComponent implements OnInit {
  comments: Feedback[] = [];
  constructor(private _feedbackService: FeedbackService) { }

  ngOnInit() {
    this._feedbackService.getFeedbacks().subscribe(data => {
      this.comments = data;
    }, error => {
      // this._httpClientService.handleError(error);
    });
  }

}
