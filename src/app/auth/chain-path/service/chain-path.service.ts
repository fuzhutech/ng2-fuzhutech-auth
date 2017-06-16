import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import {Observable, Subscription} from 'rxjs/Rx';
import {BaseService} from '../../../shared';
import {ResponseResult} from "../../../shared/model/response-result-model";

@Injectable()
export class ChainPathService extends BaseService {

  constructor(protected http: Http) {
    super(http, 'chain-paths');
  }

  getPermissionWithPath(pathId: number) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');

    const searchParams = new URLSearchParams();

    return this.http.get(this.url + '/' + pathId + '/permissions', {search: searchParams, headers: headers})
      .map(response => response.json());
  }

  editPermissionWithPath(pathId: number, data): Observable<ResponseResult> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //console.log(data);

    return this.http.put(this.url + '/' + pathId + '/permissions', JSON.stringify(data), {headers: headers})
      .map(res => res.json());
  }

}
