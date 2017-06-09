import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

import {MdDialog} from '@angular/material';

import {ActionType, SubPageComponent_UseComponentDialog} from '../../shared';

import {ChainPathDialogComponent} from './dialog/chain-path-dialog.component';
import {ChainPath} from './model/chain-path-model';
import {ChainPathService} from './service/permission.service';

@Component({
  selector: 'fz-permission',
  templateUrl: './chain-path.component.html',
  styleUrls: ['./chain-path.component.css']
})
export class ChainPathComponent
  extends SubPageComponent_UseComponentDialog<ChainPathDialogComponent, ChainPath, ChainPathService>
  implements OnInit {

  //状态
  statuses = [{label: '正常', value: '0'}, {label: '非正常', value: '1'}];

  constructor(private service: ChainPathService, public _dialog: MdDialog, @Inject(DOCUMENT) doc: any) {
    super('用户', _dialog, ChainPathDialogComponent);
  }

  getService(): ChainPathService {
    return this.service;
  }

  newInstance(): ChainPath {
    return new ChainPath();
  };

  ngOnInit() {
    //this.doRefresh(null);
  }

  getFilterType(data) {
    if (data == '0') {
      return '空';
    } else {
      return '权限';
    }
  }

  getStatus(value) {
    let label = null;
    for (const status of this.statuses) {
      if (status.value == value) {
        label = status.label;
        break;
      }
    }

    return label;
  }

}
