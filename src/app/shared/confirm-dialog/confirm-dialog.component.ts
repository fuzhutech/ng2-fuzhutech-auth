import {Component, Inject, ViewChild, TemplateRef} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import {Observable, Subscription} from "rxjs/Rx";
import {Http, Headers, URLSearchParams, Request, Response} from '@angular/http';
import {DialogResult} from '../../shared'

@Component({
  moduleId: module.id,
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.component.html',
  styleUrls: ['confirm-dialog.component.css']
})
export class ConfirmDialog {

  messages:string[]=['角色管理记录','ID:[2]','名称:[测试1]'];
  actionsAlignment:string ='end';
  progress:boolean = false;

  listener:(event:Event)=>void;

  confirmProcess:ConfirmProcess;

  constructor(public dialogRef: MdDialogRef<ConfirmDialog>, @Inject(MD_DIALOG_DATA) public data: any) {
    //
  }

  //按钮-确认
  confirm() {
    this.progress = true;
    let observable: Observable<any> = this.confirmProcess.doProgress();

    observable.subscribe(
      data => {
        let dialogResult: DialogResult = {'success': true, 'refresh': data.obj};
        this.dialogRef.close(dialogResult);
        this.progress = false;
      },
      err => {
        console.log('出错');
        console.log(err);
        this.progress = false;
      },
      () => console.log('confirm Complete')
    );
    //this.record = null;
  }

  cancel(){
    this.dialogRef.close(false);
  }

}

export interface ConfirmProcess{
  doProgress():Observable<Response>;
}
