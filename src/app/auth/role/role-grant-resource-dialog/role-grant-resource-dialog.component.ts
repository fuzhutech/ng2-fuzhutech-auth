import {Component, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import {ComponentDialog, BaseTreeNode} from '../../../shared';
import {RoleService} from '../services/role.service';

import {Message, MenuItem, TreeNode, Tree, TreeDragDropService} from 'primeng/primeng';

import {BaseTreeObject, DialogResult} from '../../../shared/common/sub-page-component';
import {isUndefined} from 'util';
import {Resource} from '../../resource/model/resource-model';

/*表格展示,暂时不启用上下级关系*/
/*角色-用户对应关系维护:pickList*/
/*角色-资源对应关系维护:pickList*/

/*角色-资源对应关系维护:tree Multiple Selection with Checkbox*/

@Component({
  selector: 'fz-user-dialog',
  templateUrl: './role-grant-resource-dialog.component.html',
  styleUrls: ['./role-grant-resource-dialog.component.css']
})
export class RoleGrantResourceDialogComponent extends ComponentDialog<RoleGrantResourceDialogComponent> implements OnInit {

  color = 'primary';

  //sourceTree: TreeNode[];
  sourceTree: BaseTreeNode[];
  targetTree: BaseTreeNode[];

  sourceSelection: BaseTreeNode[];
  targetSelection: BaseTreeNode[];


  constructor(dialogRef: MdDialogRef<RoleGrantResourceDialogComponent>, private roleService: RoleService) {
    super(dialogRef);
  }

  ngOnInit() {
    if (!isUndefined(this.record)) {
      this.getTreeData(this.record.id);
    }
  }

  private getTreeData(id: number) {
    this.roleService.getResourceWithRole(id).subscribe(
      result => {
        //console.log(result);
        let resourceRecords: Resource[] = result.data.sourceList;
        this.sourceTree = this.refreshTreeNode(resourceRecords);
        this.targetTree = this.refreshTreeNode(resourceRecords);


        resourceRecords = result.data.targetList;
        this.sourceSelection = this.getSelection(this.sourceTree, resourceRecords, this.sourceSelection);
        this.targetSelection = this.getSelection(this.targetTree, resourceRecords, this.targetSelection);
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
    for (const user of this.targetSelection) {
      userIds = userIds + user.id + ',';
    }
    if (userIds.length > 0) {
      userIds = userIds.substr(0, userIds.length - 1);
    }

    console.log(userIds);

    return this.roleService.editResourceWithRole(this.record.id, userIds);

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

    const index = this.findIndexInSelection(this.sourceSelection, event.node);
    if (index >= 0) {
      this.sourceSelection = this.sourceSelection.filter((val, i) => i != index);
    }
  }

  //原始树,恢复原有状态
  nodeUnselect(event) {
    console.log(event);
    this.sourceSelection = [...this.sourceSelection || [], event.node];
  }

  private findIndexInSelection(selection: any, node: TreeNode) {
    let index: number = -1;


    for (let i = 0; i < selection.length; i++) {
      if (selection[i] == node) {
        index = i;
        break;
      }
    }


    return index;
  }

  targetToggle(event) {
    console.log(event);

    if (event.node) {
      for (const treeNode of this.sourceTree) {
        if (this.otherNodeToggle(treeNode, event.node.expanded, event.node.data)) {
          break;
        }
      }
    }
  }

  sourceToggle(event) {
    console.log(event);

    if (event.node) {
      for (const treeNode of this.targetTree) {
        if (this.otherNodeToggle(treeNode, event.node.expanded, event.node.data)) {
          break;
        }
      }
    }
  }

  otherNodeToggle(node: TreeNode, expanded: boolean, data: any): boolean {
    //console.log(node.data);
    //console.log(data);
    if (node.data == data) {

      console.log('node.data == data');
      console.log(expanded);

      node.expanded = !node.expanded;
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

  public refreshTreeNode(resourceRecords: Resource[]): BaseTreeNode[] {

    const treeNodes: BaseTreeNode[] = [];

    //第一遍，只处理pid==null
    for (let record of resourceRecords) {
      if (record.parentId == null) {

        const treeNode: BaseTreeNode = new BaseTreeNode();
        treeNode.label = record.name;
        treeNode.expandedIcon = 'fa-folder-open';
        treeNode.collapsedIcon = 'fa-folder';
        //treeNode.expanded = true;

        treeNode.data = record;
        treeNode.id = record.id;

        treeNodes.push(treeNode);
        //处理过则去除
        record = null;
      }
    }

    this.doSet(treeNodes, resourceRecords);

    return treeNodes;

  }

  //第三遍
  //TreeNodes1 = TreeNodes3;  //上一遍的筛选记录
  private doSet(TreeNodes1: BaseTreeNode[], resourceRecords: Resource[]) {

    const TreeNodes3: BaseTreeNode[] = []; //这一遍筛选记录

    for (const treeNode1 of TreeNodes1) {
      //从records中查找该级别子节点
      for (let record of resourceRecords) {
        if (record == null) {
          continue;
        }

        if (record.parentId == treeNode1.id) {
          if (treeNode1.children == null) {
            const treeNodes2: TreeNode[] = [];
            treeNode1.children = treeNodes2;

            treeNode1.icon = '';
            treeNode1.expandedIcon = 'fa-folder-open';
            treeNode1.collapsedIcon = 'fa-folder';

          }

          const treeNode: BaseTreeNode = new BaseTreeNode();
          treeNode.label = record.name;
          //treeNode.expandedIcon = 'fa-folder-open';
          //treeNode.collapsedIcon = 'fa-folder';
          treeNode.icon = 'fa-file-image-o';
          //treeNode.expanded = true;
          treeNode.data = record;
          treeNode.id = record.id;
          treeNode1.children.push(treeNode);
          TreeNodes3.push(treeNode);

          //处理过则去除
          record = null;
        }
      }
    }

    if (TreeNodes3.length > 0) {
      this.doSet(TreeNodes3, resourceRecords);
    }
  }


  /*private getIndex(resourceRecords: Resource[], id: number): number {

   for (let index = resourceRecords.length - 1; index >= 0; index--) {
   if (resourceRecords[index].id == id) {
   return index;
   }
   }

   return -1;
   }*/


  private getSelection(treeNodes: BaseTreeNode[], resourceRecords: Resource[], selection: BaseTreeNode[]): BaseTreeNode[] {

    for (const node of treeNodes) {

      for (const resource of resourceRecords) {
        if (node.id == resource.id) {
          selection = [...selection || [], node];
          break;
        }
      }

      if (node.children != null) {
        const treeNodes1 = <BaseTreeNode[]> node.children;
        selection = this.getSelection(treeNodes1, resourceRecords, selection);
      }
    }

    return selection;
  }

}
