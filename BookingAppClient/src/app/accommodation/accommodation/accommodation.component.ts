import { Component, OnInit, Input } from '@angular/core';
import { Accommodation } from "app/accommodation/accommodation.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Room } from "app/room/room.model";
import { AccommodationService } from "app/accommodation/accommodation.service";
import { Map } from "app/map/angular-map.model";
import { CommentService } from "app/comment/comment.service";
import { DynamicUrl } from "app/DynamicUrl.model";
import { RoomService } from "app/room/room.service";
import { Comment } from "app/comment/comment.model";
import { LocalEnum } from "app/localEnum.model";
import { User } from "app/login/userLogin.model";

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css'],
  providers: [AccommodationService, CommentService, RoomService],

})

export class AccommodationComponent implements OnInit {

  map: Map

  Id            : number;
  accommodation : Accommodation;
  comment       : string;
  Grade         : number;
  Name          : string; 
  Description   : string;
  Address       : string;
  ImageURL      : string;
  showFormForComment : boolean;
  Comments: Comment[];
  commentObj: Comment;
  query: string;
  userId: number;
  rooms: Room[];
  User: User;

  constructor(private accommodationService : AccommodationService, private route: Router, 
                private activatedRoute: ActivatedRoute, private commentService: CommentService,
                private roomService: RoomService) { 
    this.accommodation = new Accommodation();
    this.rooms = [];
    this.map = {} as Map;
    this.showFormForComment = false;
  }

  ngOnInit() {
     this.userId = +localStorage.getItem(LocalEnum.Id.toString())
    

    this.rooms = [];
    let id = this.activatedRoute.snapshot.params["Id"];
    this.query = `?$filter=AccommodationId eq ${id}`;

    this.accommodationService.getByIdMap(id).subscribe(a =>
    {
        this.accommodation = (a[0] as Accommodation);
        console.log(this.accommodation.Name);
        this.rooms = this.accommodation.Rooms;
        this.ImageURL = this.accommodation.ImageUrl;
        this.accommodation.ImageUrl = DynamicUrl.socket + this.accommodation.ImageUrl;
        this.Name = this.accommodation.Name;
        this.Description = this.accommodation.Description;
        this.Address = this.accommodation.Address;
        this.map = new Map(this.accommodation.Latitude, this.accommodation.Longitude, 
                            "assets/ftn.png", "Jugodrvo" , "" , "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
        
        this.GetComments();
        this.isUserPostComment();
  }, 
    error => 
    {
      console.log("aaaaaaaaaaaaaa" + error.text());
    }
  );

  
  
}

  onSubmit()
  {
      this.accommodationService.edit(new Accommodation(this.accommodation.Id, this.Name, this.Description, this.Address,
                                      this.accommodation.Approved, this.ImageURL, this.accommodation.Latitude,
                                      this.accommodation.Longitude, this.accommodation.PlaceId,
                                       this.accommodation.AccommodationTypeId, this.accommodation.UserId)).subscribe( 
               x => 
               { 
                 this.accommodation.Name = this.Name; 
                 this.accommodation.Address = this.Address; 
                 this.accommodation.Description = this.Description;
                 var doc = document.getElementById("successMsg");
                doc.innerText = "Accommodation successfully changed.";   
                doc.className = "show";
                setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000);  
               },
               error =>
               {
                  var doc = document.getElementById("errorMsg");
                  doc.innerText = "Error during editing accommodation.";   
                  doc.className = "show";
                  setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
               } 
              );
  }

  showRoom(id: number){
      this.route.navigate(['/home/view_room/' + id]);
  }

  deleteRoom(id: number){
    this.roomService.deleteRoom(id).subscribe(
      e => 
      {
          this.getRooms();
          var doc = document.getElementById("successMsg");
          doc.innerText = "Room successfully deleted.";   
          doc.className = "show";
          setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000);
      },
      error =>
      {
          var doc = document.getElementById("errorMsg");
          doc.innerText = "Error while deleting room.";   
          doc.className = "show";
          setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
      }
    );
  }

  getRooms() : void{
    this.roomService.getAllRooms().subscribe(
      r => this.rooms = r.json(), 
      error => {
        console.log(error), alert("Unsuccessful fetch operation");
      });
  }

  onSubmitComment()
  {
    this.commentService.addComment(new Comment(0, this.Grade, 
                                               this.comment,
                                               this.userId,
                                              this.accommodation.Id)).subscribe(a => 
                                              {
                                                this.GetComments();
                                                this.isUserPostComment();
                                              }, error =>
                                              {
                                                console.log("Nije dodao"); 
                                              });
  }

  ReadAll()
  {

  }

  deleteComment()
  {
      this.commentService.addComment(new Comment(0, 
                                                 this.Grade,
                                                 this.comment,
                                                 this.userId,
                                                 this.accommodation.Id)).subscribe(a => alert("Dodat"),
                                                 error => alert("nije dodao"));
  }

  GetComments()
   {
     this.accommodationService.getCommentsByFilter(this.query).subscribe(
        c => 
        { 
          this.Comments = c;
          console.log("usao");
         
        },
        error =>
        {
            console.log("sfs");
        }
      );
     //return this.accommodation.UserId == userId;
  }

  isUserPostComment(){
    this.commentService.getCommentById(this.userId).subscribe(
      c => {
        this.commentObj = (c as Comment);
        this.showFormForComment = false;
        
        console.log("Nasao")
      },
      error => { console.log("Nije nasao"); this.showFormForComment = true; }
    )
  }

    switchShowFormComment()
    {
      return this.showFormForComment;
  }

}
