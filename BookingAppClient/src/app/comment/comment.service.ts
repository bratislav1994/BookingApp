import { Injectable } from '@angular/core';
import { Comment } from "app/comment/comment.model";
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommentService {

  constructor(private http : Http) { }

  addComment(comment : Comment) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post('http://localhost:54043/comment/Create', comment, opts);
  }


  getAllComments() : Observable<any> {
        return this.http.get("http://localhost:54043/comment/ReadAll");
  }

  getCommentById(id : number) : Observable<any> {
        return this.http.get(`http://localhost:54043/comment/Read/${id}`);
  }
}
