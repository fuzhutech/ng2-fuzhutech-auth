import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BaseService} from '../../../shared';

@Injectable()
export class OrganizationService extends BaseService{

    constructor(private http: Http) {
        super();
    }

    getHttp(){
        return this.http;
    }

    getPath(){
        return 'organizations';
    }

}
