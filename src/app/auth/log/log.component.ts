import {Component} from '@angular/core';

import {SubPageComponentWithTemplateDialog} from '../../shared';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';

import {Log} from './services/log';
import {LogService} from './services/log.service';

import {LazyLoadEvent} from 'primeng/primeng';
import {AuthInfoService} from '../auth-info/auth-info.service';

@Component({
  templateUrl: './log.component.html'
})
export class LogComponent extends SubPageComponentWithTemplateDialog<Log, LogService> {

  totalRecords: number;

  //用户状态
  statuses = [{label: '正常', value: '0'}, {label: '非正常', value: '1'}];


  doRefresh(id: number) {
    this.getService().getList().subscribe(
      data => {
        this.records = data.rows;
        this.totalRecords = data.total;

        for (const record of this.records) {
          if (record.id == id) {
            this.selectedRecord = record;
            break;
          }
        }

        //若为树表展示
        if (this.useTreeTable) {
          this.treeTableService.records = this.records;
          this.treeTableService.refreshTreeNode(id);
        }
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('refresh Complete');
      }
    );
  }

  loadCarsLazy(event: LazyLoadEvent) {
    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    //imitate db connection over a network


    console.log('loadCarsLazy');

    console.log(event);
    console.log(event.first);
    console.log(event.rows);

    this.getService().getListByPage(event.first, event.rows).subscribe(
      data => {
        this.records = data.rows;
        this.totalRecords = data.total;

        console.log(data.total);
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('refresh Complete');
      }
    );

    /*setTimeout(() => {
     if(this.datasource) {
     this.cars = this.datasource.slice(event.first, (event.first + event.rows));
     }
     }, 250);*/
  }

  constructor(service: LogService, dialog: MdDialog) {
    super('日志', dialog);
    this.initParams(service);
  }

  //abstract
  getService(): LogService {
    return this.service;
  }

  //abstract
  newInstance(): Log {
    return new Log();
  };

  //override
  getDeleteMessage(): string[] {
    return super.getDeleteMessage();
  };


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
