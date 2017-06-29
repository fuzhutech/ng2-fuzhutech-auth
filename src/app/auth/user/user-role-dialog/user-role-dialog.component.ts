import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {ComponentDialog} from '../../../shared';
import {UserService} from '../service/user.service';
import {DialogResult} from '../../../shared/common/sub-page-component';
import {Role} from '../../role/service/role';
import {isUndefined} from 'util';
import {User} from '../model/user';

@Component({
  selector: 'fz-user-role-dialog',
  templateUrl: './user-role-dialog.component.html',
  styleUrls: ['./user-role-dialog.component.css']
})
export class UserRoleDialogComponent extends ComponentDialog<UserRoleDialogComponent, User, UserService> implements OnInit {

  color = 'primary';

  sourceList: Role[];
  targetList: Role[];


  constructor(dialogRef: MdDialogRef<UserRoleDialogComponent>) {
    super(dialogRef);
  }

  ngOnInit() {
    if (!isUndefined(this.record)) {
      this.getPickList(this.record.id);
    }
  }

  private getPickList(id: number) {
    this.service.getRoleWithUser(id).subscribe(
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
        console.log('refreshAction Complete');
      }
    );

  }

  doGrant() {

    let roleIds = '';
    for (const user of this.targetList) {
      roleIds = roleIds + user.id + ',';
    }
    if (roleIds.length > 0) {
      roleIds = roleIds.substr(0, roleIds.length - 1);
    }

    return this.service.editRoleWithUser(this.record.id, roleIds);
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
