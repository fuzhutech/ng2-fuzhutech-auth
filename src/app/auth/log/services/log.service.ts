import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import {Observable, Subscription} from "rxjs/Rx";
import {BaseService} from '../../../shared';

@Injectable()
export class LogService extends BaseService {

  constructor(private http: Http) {
    super();
  }

  getHttp() {
    return this.http;
  }

  getPath() {
    return 'logs';
  }

  getListByPage(offset,rows) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    //headers.append('Content-Type', 'application/x-www-form-urlencoded');

    //const url = 'http://localhost/api/computers';
    const searchParams = new URLSearchParams();
    searchParams.set('offset', offset);
    searchParams.set('rows', rows);

    return this.getHttp().get(this.url, {search: searchParams, headers: headers})
      .map(response => response.json());
  }

}
