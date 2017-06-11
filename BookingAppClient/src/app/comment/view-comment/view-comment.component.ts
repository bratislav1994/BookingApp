import { Component, OnInit } from '@angular/core';
import { CommentService } from "app/comment/comment.service";
import { Comment } from "app/comment/comment.model";

@Component({
  selector: 'app-view-comment',
  templateUrl: './view-comment.component.html',
  styleUrls: ['./view-comment.component.css'],
  providers: [CommentService]
})
export class ViewCommentComponent implements OnInit {
 
  comments: Comment[];
  constructor(private commentService : CommentService) { 
    this.comments = [];
  }

  ngOnInit() {
    this.commentService.getAllComments().subscribe(a => this.comments = a, error => 
    {
        console.log(error), alert("Unsuccessful fetch operation")
    });
  }

}
