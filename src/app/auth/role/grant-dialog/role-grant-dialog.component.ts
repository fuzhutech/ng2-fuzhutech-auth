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
  filesTree5: TreeNode[];

  //selectedFile2: TreeNode;
  selectedFile2: any;
  selectedFile3: TreeNode;


  constructor(dialogRef: MdDialogRef<RoleGrantDialogComponent>, private userService: RoleService, private nodeService: NodeService) {
    super(dialogRef);
  }

  ngOnInit() {
    this.nodeService.getFiles1().then(res => {
      this.filesTree4 = <TreeNode[]> res.json().data;
      this.filesTree5 = <TreeNode[]> res.json().data;
    });
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

  //原始树,恢复原有状态
  nodeSelect(event) {
    console.log(event);

    const index = this.findIndexInSelection(this.selectedFile2, event.node);
    if (index >= 0) {
      this.selectedFile2 = this.selectedFile2.filter((val, i) => i != index);
    } else {
      this.selectedFile2 = [...this.selectedFile2 || [], event.node];
    }
  }

  toggle(event) {
    console.log(event.node);
    console.log(event.node.expanded);
    console.log(event.node.data);

    if (event.node) {
      for (const treeNode of this.filesTree4) {
        //console.log(child);
        if (this.otherNodeToggle(treeNode, event.node.expanded, event.node.data)) {
          break;
        }
      }
    }
  }

  findIndexInSelection(selection: any, node: TreeNode) {
    let index: number = -1;


    for (let i = 0; i < selection.length; i++) {
      if (selection[i] == node) {
        index = i;
        break;
      }
    }


    return index;
  }

  otherNodeToggle(node: TreeNode, expanded: boolean, data: any): boolean {
    console.log(node.data);
    console.log(node.expanded);
    console.log(data);
    if (node.data == data) {

      console.log('node.data == data');
      console.log(expanded);

      node.expanded = !node.expanded
      return true;
    }

    let result = false;
    if (node.children && node.children.length) {
      for (const child of node.children) {
        if (this.otherNodeToggle(child, expanded, data)) {
          result = true;
          break;
        }
      }
    }

    return result;
  }

}
