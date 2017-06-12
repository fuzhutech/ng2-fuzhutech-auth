import {Component, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import {ComponentDialog} from '../../../shared';
import {RoleService} from '../services/role.service';

import {Message, MenuItem, TreeNode, Tree, TreeDragDropService} from 'primeng/primeng';

import {NodeService} from '../services/nodeservice';
import {DialogResult} from '../../../shared/common/sub-page-component';

/*表格展示,暂时不启用上下级关系*/
/*角色-用户对应关系维护:pickList*/
/*角色-资源对应关系维护:pickList*/

/*角色-资源对应关系维护:tree Multiple Selection with Checkbox*/

@Component({
  selector: 'fz-user-dialog',
  templateUrl: './role-grant-dialog.component.html',
  styleUrls: ['./role-grant-dialog.component.css']
})
export class RoleGrantDialogComponent extends ComponentDialog<RoleGrantDialogComponent> implements OnInit {

  color = 'primary';

  filesTree4: TreeNode[];

  selectedFile2: TreeNode;


  constructor(dialogRef: MdDialogRef<RoleGrantDialogComponent>, private userService: RoleService, private nodeService: NodeService) {
    super(dialogRef);
  }

  ngOnInit() {
    this.nodeService.getFiles().then(files => this.filesTree4 = files);
  }

  doGrant() {
    return this.userService.editAuthorizedRoleList(this.filesTree4);
  }

  //按钮-确认
  confirm() {

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
    const dialogResult: DialogResult = {'success': false, 'cancel': false};
    this.dialogRef.close(dialogResult);
  }

}
