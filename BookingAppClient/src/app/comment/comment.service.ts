import { Injectable } from '@angular/core';
import { Comment } from "app/comment/comment.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DynamicUrl } from "app/DynamicUrl.model";

@Injectable()
export class CommentService {

  constructor(private http : Http) { }

  addComment(comment : Comment) : Observable<any> {
        let opts = DynamicUrl.PutHeader();
        return this.http.post(DynamicUrl.socket + `api/Comment/Create`, comment, opts);
  }


  getAllComments() : Observable<any> {
        return this.http.get("http://localhost:54043/api/Comment/ReadAll");
  }

  getCommentById(id : number) : Observable<any> {
        return this.http.get(`http://localhost:54043/api/Comment/Read/${id}`);
  }

  deleteComment(id: number) : Observable<any>{
        let opts = DynamicUrl.PutHeader();
        return this.http.delete(`http://localhost:54043/api/Comment/Delete/${id}`, opts);
  }
}
