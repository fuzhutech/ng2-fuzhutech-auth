import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import {Observable, Subscription} from 'rxjs/Rx';
import {BaseService} from '../../../shared';
import {ResponseResult} from '../../../shared/model/response-result-model';

@Injectable()
export class PermissionService extends BaseService {

  constructor(http: Http) {
    super(http, 'permissions');
  }

  generateId(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(this.url + '/id', JSON.stringify(data), {headers: headers})
      .map(res => <ResponseResult> res.json());
  }

}
