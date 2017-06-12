import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {ComponentDialog} from '../../../shared';
import {UserService} from '../services/user.service';
import {DialogResult} from '../../../shared/common/sub-page-component';

@Component({
  selector: 'fz-user-grant-dialog',
  templateUrl: './user-role-dialog.component.html',
  styleUrls: ['./user-role-dialog.component.css']
})
export class UserRoleDialogComponent extends ComponentDialog<UserRoleDialogComponent> implements OnInit {

  color = 'primary';

  unauthorizedRoleList: any[];

  authorizedRoleList: any[];


  constructor(dialogRef: MdDialogRef<UserRoleDialogComponent>, private userService: UserService) {
    super(dialogRef);
  }

  ngOnInit() {
    this.getUnauthorizedRoleList();
    this.getAuthorizedRoleList();
  }

  private getUnauthorizedRoleList() {
    this.userService.getAuthorizedRoleList().subscribe(
      data => {
        //this.records = data.rows;
        this.unauthorizedRoleList = data;
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('refresh Complete');
      }
    );

  }


  getAuthorizedRoleList() {
    this.userService.getAuthorizedRoleList().subscribe(
      data => {
        //this.records = data.rows;
        this.authorizedRoleList = data;
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
    return this.userService.editAuthorizedRoleList(this.authorizedRoleList);
  }

  //按钮-确认
  confirm() {

    console.log('confirm ...');

    this.progress = true;

    this.doGrant().subscribe(
      data => {
        const dialogResult: DialogResult = {'success': true, 'refresh': data.obj};
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
