import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { TreeNode } from 'primeng/primeng';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class NodeService {

    constructor(private http: Http) {}

    getFiles() {
        return this.http.get('assets/data/files.json')
                    .toPromise()
                    .then(res => <TreeNode[]> res.json().data);
    }


  getFiles1() {
    return this.http.get('assets/data/files.json')
      .toPromise();
  }
}
