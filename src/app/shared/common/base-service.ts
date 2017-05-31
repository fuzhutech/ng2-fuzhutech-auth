import {Http, Headers, URLSearchParams} from '@angular/http';
import {Observable, Subscription} from "rxjs/Rx";
import {isUndefined} from "util";

export abstract class BaseService {

  private host = 'http://localhost/api/';
  //private host = 'http://localhost:8080/fuzhutech-itsm/';
  protected url: string;

  constructor() {
    this.url = this.host + this.getPath();
  }

  //todo:本想采用子类构造方法中变量赋值的方式，但存在忘记变量赋值的情况
  abstract  getHttp(): Http;

  abstract getPath(): string;

  getList() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    //headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const searchParams = new URLSearchParams();
    //searchParams.set('offset', '1');
    //searchParams.set('rows', '20');
    //searchParams.set('sort', 'id');
    //searchParams.set('order', 'asc');

    return this.getHttp().get(this.url, {search: searchParams, headers: headers})
      .map(response => response.json());
  }

  getListByPageInfo(offset,rows,total) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');

    const searchParams = new URLSearchParams();
    searchParams.set('offset', offset);
    searchParams.set('rows', rows);
    searchParams.set('total', total);

    return this.getHttp().get(this.url+'/page', {search: searchParams, headers: headers})
      .map(response => response.json());
  }

  create(data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.getHttp().post(this.url, JSON.stringify(data), {headers: headers})
      .map(res => res.json());
  }

  edit(data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.getHttp().put(this.url, JSON.stringify(data), {headers: headers})
      .map(res => res.json());
  }

  delete(data) {
    if (!data)
      data = {id: '-1'};

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //const url = 'http://localhost/api/computers';

    return this.getHttp().delete(this.url + '/' + data.id, {headers: headers})
      .map(res => res.json());
  }

}
