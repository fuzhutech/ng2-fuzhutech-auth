import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import {Observable, Subscription} from 'rxjs/Rx';
import {BaseService} from '../../../shared';
import {ResponseResult} from '../../../shared/model/response-result-model';

@Injectable()
export class ResourceService extends BaseService {

    constructor(http: Http) {
        super(http, 'resources');
    }

    getPermissionWithResource(resourceId: number) {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=UTF-8');

        const searchParams = new URLSearchParams();

        return this.http.get(this.url + '/' + resourceId + '/permissions', {search: searchParams, headers: headers})
            .map(response => response.json());
    }

    editPermissionWithResource(resourceId: number, data): Observable<ResponseResult> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        //console.log(data);

        return this.http.put(this.url + '/' + resourceId + '/permissions', JSON.stringify(data), {headers: headers})
            .map(res => res.json());
    }

    generateId(data) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.put(this.url + '/id', JSON.stringify(data), {headers: headers})
            .map(res => <ResponseResult> res.json());
    }

}
