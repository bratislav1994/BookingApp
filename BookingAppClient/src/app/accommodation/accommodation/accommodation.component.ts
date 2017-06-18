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
import { LocalStorageService } from "app/local-storage.service";

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css'],
  providers: [AccommodationService, CommentService, RoomService, LocalStorageService],

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

  showEditForm: boolean;
  showRooms: boolean;
  accommodations: Accommodation[];

  constructor(private accommodationService : AccommodationService, private route: Router, 
                private activatedRoute: ActivatedRoute, private commentService: CommentService,
                private roomService: RoomService, private localStorageService: LocalStorageService) { 
    this.accommodation = new Accommodation();
    this.rooms = [];
    this.map = {} as Map;
    this.showFormForComment = false;
    this.showEditForm = false;
    this.showRooms = true;
    this.accommodations = [];
  }

  ngOnInit() {
     this.userId = +localStorage.getItem(LocalEnum.Id.toString());
    this.rooms = [];
    this.Id = this.activatedRoute.snapshot.params["Id"];
    this.query = `?$filter=AccommodationId eq ${this.Id}`;

    this.accommodationService.getByIdMap(this.Id).subscribe(a =>
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
        
         this.isUserPostComment();
        this.GetComments();  
  }, 
    error => 
    {
      console.log("aaaaaaaaaaaaaa" + error.text());
    }
  );
}

  isShowEditPress() {
    return this.showEditForm;
  }

  changeShowEdit()
  {
    this.showEditForm = this.showEditForm ? false : true;
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
                  doc.innerText = error.json().Message;  
                  doc.className = "show";
                  setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
               } 
          );
      this.showEditForm = false;
  }

  deleteAcc(acc: Accommodation)
  {
    this.accommodationService.delete(acc.Id).subscribe(
      e => 
      {
            this.getAccommodations();
            var doc = document.getElementById("successMsg");
            doc.innerText = "Accommodation successfully deleted.";   
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000);
            this.route.navigate(['/view_accommodations/']);
      },
      error =>
      {
            var doc = document.getElementById("errorMsg");
            doc.innerText = "Error while deleting accommodation.";   
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
      }
        );
  }

  canEditOrDelete() : boolean {
    if(this.localStorageService.IsLoggedIn()){
      if(this.accommodation.UserId == this.userId){
        return true;
      }

      return false;
    }
    return false;
  }

  getAccommodations() : void{
    this.accommodationService.getAllAccommodations().subscribe(a =>
    { 
      this.accommodations = a.json();
      this.appendPortToImageUrl();
    },
    error => 
    {
        console.log(error), alert("Unsuccessful fetch operation")
    });
  }

  appendPortToImageUrl()
  {
    for (var i = 0; i < this.accommodations.length; i++) {
        this.accommodations[i].ImageUrl = DynamicUrl.socket + this.accommodations[i].ImageUrl;
    }
  }

  showRoom(id: number){
      this.route.navigate(['/view_room/' + id]);
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
          doc.innerText = error.json().Message;   
          doc.className = "show";
          setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
      }
    );
  }

  roomsClicked()
  {
     this.route.navigate(['/view_rooms/' + this.accommodation.Id]);
  }

  isShowRoomsSelected() : boolean
  {
      return this.showRooms;
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
                                                this.getAverageGrade();
                                                this.GetComments();
                                                this.isUserPostComment();
                                                var doc = document.getElementById("successMsg");
                                                doc.innerText = "Comment successfully added.";   
                                                doc.className = "show";
                                                setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000);
                                              }, error =>
                                              {
                                                var doc = document.getElementById("errorMsg");
                                                doc.innerText = error.json().Message;   
                                                doc.className = "show";
                                                setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
                                              });
    this.comment = "";
    this.Grade = undefined;
  }

  getAverageGrade() : void{
    this.accommodationService.getByIdMap(this.Id).subscribe(a =>
    {
        this.accommodation = (a[0] as Accommodation);
        this.accommodation.ImageUrl = DynamicUrl.socket + this.accommodation.ImageUrl;
    });
  }

  deleteComment(comment: Comment)
  {
     this.commentService.deleteComment(comment.Id).subscribe(
        e => 
      {
            this.GetComments();
            this.getAverageGrade()
            this.isUserPostComment();
            var doc = document.getElementById("successMsg");
            doc.innerText = "Comment successfully deleted.";   
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000);
      },
      error =>
      {
            var doc = document.getElementById("errorMsg");
            doc.innerText = error.json().Message;    
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000);
            alert(error.text()); 
      }
     );
  }

  GetComments()
   {
     this.accommodationService.getCommentsByFilter(this.query).subscribe(
        c => 
        { 
          this.Comments = c;
        },
        error =>
        {
            console.log("sfs");
        }
      );
  }

  isUserPostComment(){
    this.commentService.getCommentById(this.userId, this.accommodation.Id).subscribe(
      c => {
        this.commentObj = (c as Comment);
        this.showFormForComment = false;
        
        console.log("Nasao")
      },
      error => { 
        console.log("Nije nasao"); 
        if(localStorage.getItem(LocalEnum.Id.toString()) != undefined && localStorage.getItem(LocalEnum.Role.toString()) == "AppUser"){
            if (this.userId == this.accommodation.UserId)
            {
                this.showFormForComment = true;
            }
        }
      }
    );
  }

  isUserComment(comment: Comment){
      return comment.UserId == +localStorage.getItem(LocalEnum.Id.toString());
  }
}
