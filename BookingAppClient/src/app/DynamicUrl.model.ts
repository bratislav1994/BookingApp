import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { LocalEnum } from "app/localEnum.model";

export class DynamicUrl {
    static socket : string = `http://localhost:54043/`;
    
    static PutHeader(): RequestOptions{
        let header = new Headers();
        header.append('Content-type', 'application/json');
        header.append("Authorization", "Bearer " + localStorage.getItem(LocalEnum.User.toString()));
        
        let opts = new RequestOptions();
        opts.headers = header;

        return opts;
    }
}