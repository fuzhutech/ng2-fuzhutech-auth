import {Component, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import {ComponentDialog, BaseTreeNode} from '../../../shared';
import {RoleService} from '../services/role.service';

import {Message, MenuItem, TreeNode, Tree, TreeDragDropService} from 'primeng/primeng';

import {BaseTreeObject, DialogResult} from '../../../shared/common/sub-page-component';
import {isUndefined} from 'util';
import {Resource} from '../../resource/model/resource-model';

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
        let resourceRecords: Resource[] = result.data.sourceList;
        this.sourceTree = this.refreshTreeNode(resourceRecords);
        this.targetTree = this.refreshTreeNode(resourceRecords);


        resourceRecords = result.data.targetList;
        this.sourceSelection = this.getSelection(this.sourceTree, resourceRecords, this.sourceSelection);
        this.targetSelection = this.getSelection(this.targetTree, resourceRecords, this.targetSelection);

        this.setPropagateUp(this.sourceSelection);
        this.setPropagateUp(this.targetSelection);
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('refresh Complete');
      }
    );

  }

  private getSelectedIds(node: BaseTreeNode, ids: string): string {
    if (node && node.id) {
      ids = ids + node.id + ',';
    }


    if (node && node.parent) {
      ids = this.getSelectedIds(<BaseTreeNode> node.parent, ids);
    }

    return ids;
  }

  doGrant() {
    let roleId = -1;
    if (this.record && this.record.id) {
      roleId = this.record.id;
    } else {
      return;
    }

    let ids = '';

    if (this.targetSelection) {
      const realSelection: TreeNode[] = this.targetSelection || [];

      for (const node of this.targetSelection) {
        let node1 = node.parent;
        while (node1) {
          if (this.findIndexInSelection(realSelection, node1) == -1) {
            realSelection.push(node1);
          }
          node1 = node1.parent;
        }
      }

      for (const node of <BaseTreeNode[]> realSelection) {
        ids = ids + node.id + ',';


        let node1 = <BaseTreeNode> node.parent;
        while (node1) {
          ids = ids + node1.id + ',';
          node1 = <BaseTreeNode> node1.parent;
        }

      }
      if (ids.length > 0) {
        ids = ids.substr(0, ids.length - 1);
      }

    }

    return this.roleService.editResourceWithRole(roleId, ids);

  }

  //按钮-确认
  confirm() {

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
    const dialogResult: DialogResult = {'success': false, 'cancel': false};
    this.dialogRef.close(dialogResult);
  }

  //原始树,恢复原有状态
  nodeSelect(event) {
    const index = this.findIndexInSelection(this.sourceSelection, event.node);
    if (index >= 0) {
      this.sourceSelection = this.sourceSelection.filter((val, i) => i != index);
    }
  }

  //原始树,恢复原有状态
  nodeUnselect(event) {
    this.sourceSelection = [...this.sourceSelection || [], event.node];
  }


  private findIndexInSelection(selection: TreeNode[], node: TreeNode) {
    let index: number = -1;

    if (selection) {
      for (let i = 0; i < selection.length; i++) {
        if (selection[i] == node) {
          index = i;
          break;
        }
      }
    }

    return index;
  }

  targetToggle(event) {
    if (event.node) {
      for (const treeNode of this.sourceTree) {
        if (this.otherNodeToggle(treeNode, event.node.expanded, event.node.data)) {
          break;
        }
      }
    }
  }

  sourceToggle(event) {
    if (event.node) {
      for (const treeNode of this.targetTree) {
        if (this.otherNodeToggle(treeNode, event.node.expanded, event.node.data)) {
          break;
        }
      }
    }
  }

  otherNodeToggle(node: TreeNode, expanded: boolean, data: any): boolean {
    if (node.data == data) {
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
          treeNode.parent = treeNode1;
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

  setPropagateUp(selection: TreeNode[]) {
    if (selection) {
      for (const node of selection) {
        this.propagateUp(node, selection);
      }
    }
  }

  /**
   * 根据selection改变Tree的状态
   * @param node
   * @param selection 可能发生缩减变化
   */
  propagateUp(node: TreeNode, selection: TreeNode[]) {
    if (node.children && node.children.length) {
      let selectedCount = 0;
      let childPartialSelected = false;

      for (const child of node.children) {
        if (this.findIndexInSelection(selection, child) > -1) {
          selectedCount++;
        } else if (child.partialSelected) {
          childPartialSelected = true;
        }
      }

      if (selectedCount == node.children.length) {
        node.partialSelected = false;
      } else {
        if (childPartialSelected || selectedCount > 0 && selectedCount != node.children.length) {
          node.partialSelected = true;
        } else {
          node.partialSelected = false;
        }
      }

      if (node.partialSelected) {
        const index = this.findIndexInSelection(selection, node);
        if (index >= 0) {
          selection.splice(index, 1);
        }
      }
    }

    const parent = node.parent;
    if (parent) {
      this.propagateUp(parent, selection);
    }
  }

  expandAll() {
    this.sourceTree.forEach(node => {
      this.expandRecursive(node, true);
    });

    this.targetTree.forEach(node => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll() {
    this.sourceTree.forEach(node => {
      this.expandRecursive(node, false);
    });

    this.targetTree.forEach(node => {
      this.expandRecursive(node, false);
    });
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  reset() {
    if (!isUndefined(this.record)) {
      this.getTreeData(this.record.id);
    }
  }

  clear() {
    this.targetSelection = [];

    this.targetTree.forEach(node => {
      this.clearRecursive(node);
    });
  }

  private clearRecursive(node: TreeNode) {
    node.partialSelected = false;
    if (node.children) {
      node.children.forEach(childNode => {
        this.clearRecursive(childNode);
      });
    }
  }

}
