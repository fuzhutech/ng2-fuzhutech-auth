import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import {Observable, Subscription} from 'rxjs/Rx';
import {BaseService} from '../../../shared';
import {ResponseResult} from '../../../shared/model/response-result-model';
/**
 * 把组件类中的逻辑限制到只有视图需要的逻辑。所有其它逻辑都应该被放到服务；把可以重复使用的逻辑放到服务里，保持组件简单并聚焦于它们预期目的；
 */
@Injectable()
export class ChainPathService extends BaseService {

    constructor(http: Http) {
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

    generateId(data) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.put(this.url + '/id', JSON.stringify(data), {headers: headers})
            .map(res => <ResponseResult> res.json())
            .catch((error: any) => {
                console.log('catchBadResponse', error);
                return Observable.throw(error.json().error || 'Server error');
                //return Observable.of<Hero[]>([]);
            })
            .finally(() => this.hideSpinner());
    }

    private catchBadResponse(err: any, source: Observable<any>) {

        console.log('catchBadResponse', err, source);
        // log and handle the exception
        return new Observable();

    }

    private hideSpinner() {

        console.log('hideSpinner');
        // hide the spinner

    }

}
