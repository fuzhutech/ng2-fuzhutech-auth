import {Injectable} from '@angular/core';
import {Http,Headers,URLSearchParams} from '@angular/http';
import {Observable,Subscription} from "rxjs/Rx";
import {BaseService} from '../../../shared';

@Injectable()
export class UserService extends BaseService{

    constructor(private http: Http) {
        super();
    }

    getHttp(){
        return this.http;
    }

    getPath(){
        return 'users';
    }

}
