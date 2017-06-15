import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {ComponentDialog} from '../../../shared';
import {DialogResult} from '../../../shared/common/sub-page-component';
import {User} from '../../user/model/user';
import {isUndefined} from 'util';

@Component({
  selector: 'fz-user-grant-dialog',
  templateUrl: './role-grant-user-dialog.component.html',
  styleUrls: ['./role-grant-user-dialog.component.css']
})
export class RoleGrantUserDialogComponent extends ComponentDialog<RoleGrantUserDialogComponent> implements OnInit {

  color = 'primary';

  sourceList: User[];
  targetList: User[];


  constructor(dialogRef: MdDialogRef<RoleGrantUserDialogComponent>) {
    super(dialogRef);
  }

  ngOnInit() {
    if (!isUndefined(this.record)) {
      this.getPickList(this.record.id);
    }
  }

  private getPickList(id: number) {
    this.service.getUserWithRole(id).subscribe(
      result => {
        console.log(result);
        this.targetList = result.data.targetList;
        console.log(this.targetList);
        this.sourceList = result.data.sourceList;
        console.log(this.sourceList);
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('refresh Complete');
      }
    );

  }

  doGrant() {

    let userIds = '';
    for (const user of this.targetList) {
      userIds = userIds + user.id + ',';
    }
    if (userIds.length > 0) {
      userIds = userIds.substr(0, userIds.length - 1);
    }

    console.log(userIds);

    return this.service.editUserWithRole(this.record.id, userIds);
  }

  //按钮-确认
  confirm() {

    console.log('confirm ...');

    this.progress = true;

    this.doGrant().subscribe(
      data => {
        const dialogResult: DialogResult = {'success': true, 'recordId': data.id};
        this.dialogRef.close(dialogResult);
        this.progress = false;
      },
      err => {
        console.log(err);
        this.progress = false;
      },
      () => console.log('confirm Complete')
    );

    //this.record = null;
  }

  //按钮-取消
  cancel() {

    console.log('cancel ...');

    const dialogResult: DialogResult = {'success': false, 'cancel': false};
    this.dialogRef.close(dialogResult);
  }

}
