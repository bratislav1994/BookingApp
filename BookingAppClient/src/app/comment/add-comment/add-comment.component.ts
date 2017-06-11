import { Component, OnInit } from '@angular/core';
import { Accommodation } from "app/accommodation/accommodation.model";
import { AccommodationService } from "app/accommodation/accommodation.service"
import { CommentService } from "app/comment/comment.service";
import { NgForm } from '@angular/forms'
import { Comment } from 'app/comment/comment.model'
@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
  providers: [CommentService, AccommodationService]
})
export class AddCommentComponent implements OnInit {

    Id: number;
    Grade: number;
    Text: string;
    AccommodationId: number;
    accommodations: Accommodation[];
   constructor(private commentService: CommentService, private accommodationService: AccommodationService) {
                  this.accommodations = [];
             }


   ngOnInit() {
    this.accommodationService.getAllAccommodations().subscribe(p => this.accommodations = p, error => 
    {
        console.log(error), alert("Unsuccessful fetch operation")
    });
  }

  onSubmit(form: NgForm){
    this.commentService.addComment(new Comment(0, this.Grade, this.Text, 0, this.AccommodationId)).subscribe();
    form.reset();
  }
}
