import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {ComponentDialog} from '../../../shared';
import {UserService} from '../../user/services/user.service';
import {DialogResult} from '../../../shared/common/sub-page-component';
import {User} from '../../user/model/user';
import {Organization} from '../services/organization';
import {OrganizationService} from '../services/organization.service';

@Component({
  selector: 'fz-organization-grant-dialog',
  templateUrl: './grant-dialog.component.html',
  styleUrls: ['./grant-dialog.component.css'],
  providers: [UserService]
})
export class OrganizationGrantDialogComponent extends ComponentDialog<OrganizationGrantDialogComponent, Organization, OrganizationService>
  implements OnInit {

  color = 'primary';

  sourceList: User[];
  targetList: User[];

  constructor(dialogRef: MdDialogRef<OrganizationGrantDialogComponent>) {
    super(dialogRef);
  }

  ngOnInit() {
    this.getPickList(this.record.id);
  }

  private getPickList(id: number) {
    this.service.getUserWithOrganization(id).subscribe(
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

    let userIds = '';
    for (const user of this.targetList) {
      userIds = userIds + user.id + ',';
    }
    if (userIds.length > 0) {
      userIds = userIds.substr(0, userIds.length - 1);
    }

    console.log(userIds);

    return this.service.editUserWithOrganization(this.record.id, userIds);
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
