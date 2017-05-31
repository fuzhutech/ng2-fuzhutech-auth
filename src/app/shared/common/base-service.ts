import {Http, Headers, URLSearchParams} from '@angular/http';
import {Observable, Subscription} from 'rxjs/Rx';
import {isUndefined} from 'util';
import {HOST_API_PATH, HOST_PATH} from './constant';

export abstract class BaseService {

  protected http: Http;
  protected url: string;
  private host = HOST_PATH;
  private host_api = HOST_API_PATH;

  constructor(http: Http, path: string) {
    this.http = http;
    this.url = this.host_api + '/' + path;
  }

  getList() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');

    const searchParams = new URLSearchParams();
    //searchParams.set('offset', '1');
    //searchParams.set('rows', '20');
    //searchParams.set('sort', 'id');
    //searchParams.set('order', 'asc');

    return this.http.get(this.url, {search: searchParams, headers: headers})
      .map(response => response.json());
  }

  getListByPageInfo(offset, rows, total) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');

    const searchParams = new URLSearchParams();
    searchParams.set('offset', offset);
    searchParams.set('rows', rows);
    searchParams.set('total', total);

    return this.http.get(this.url + '/page', {search: searchParams, headers: headers})
      .map(response => response.json());
  }

  create(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.url, JSON.stringify(data), {headers: headers})
      .map(res => res.json());
  }

  edit(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(this.url, JSON.stringify(data), {headers: headers})
      .map(res => res.json());
  }

  delete(data) {
    if (!data) {
      data = {id: '-1'};
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //const url = 'http://localhost/api/computers';

    return this.http.delete(this.url + '/' + data.id, {headers: headers})
      .map(res => res.json());
  }

}
