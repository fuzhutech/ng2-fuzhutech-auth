import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import {BaseService} from '../../../shared';

@Injectable()
export class OrganizationService extends BaseService {

    constructor(http: Http) {
        super(http, 'organizations');
    }

    getUserWithOrganization(organizationId: number) {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=UTF-8');

        const searchParams = new URLSearchParams();

        return this.http.get(this.url + '/' + organizationId + '/users', {search: searchParams, headers: headers})
            .map(response => response.json());
    }

    editUserWithOrganization(organizationId: number, data) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log(data);

        return this.http.put(this.url + '/' + organizationId + '/users', JSON.stringify(data), {headers: headers})
            .map(res => res.json());
    }

}
