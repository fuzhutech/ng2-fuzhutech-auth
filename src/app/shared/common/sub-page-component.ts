import {Component, Inject, TemplateRef, ViewChild, Input, OnInit, OnDestroy} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {TreeNode} from 'primeng/primeng';
import {Http, Headers, URLSearchParams, Request, Response} from '@angular/http';
import {Observable, Subscription} from 'rxjs/Rx';

import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA, ComponentType} from '@angular/material';
import {ConfirmDialogComponent} from '../../shared';
import {isUndefined} from 'util';

import {BaseService, DialogResult, ConfirmProcess} from '../index';
import {ResponseResult} from '../model';
import {AuthInfo, MenuInfo} from '../../auth/auth-info/auth-info';
import {AuthInfoService} from '../../auth/auth-info/auth-info.service';
import {ServiceUtil} from '../utils/service-util';

export const enum ActionType {
  viewAction = 0,
  newAction = 1,
  editAction = 2,
  deleteAction = 3,
  refreshAction = 4,
  lookupAction = 5
}

export interface  BaseObject {
  id?: any;
}

export abstract class SubPageComponent<T extends BaseObject, S extends BaseService> implements OnInit, OnDestroy {

  /*普通表格展示相关变量*/
  record: T;             //临时变量
  selectedRecord: T;    //选中记录
  records: T[];          //数据列表

  /*http服务*/
  service: S;

  //树形表格所需属性
  useTreeTable = false;
  treeTableService: TreeTableService = new TreeTableService();

  /*编辑框相关变量*/
  action: ActionType;    //操作类型
  mainHeader: string;
  dialogHeader: string;  //编辑页面标题

  /*权限控制相关变量*/
  currentMenuId: number;
  currentMenuInfo: MenuInfo;
  menuInfoSubscription: Subscription;
  currentAuthInfo: AuthInfo;
  authInfoSubscription: Subscription;
  authInfoService: AuthInfoService;

  constructor(mainHeader?: string) {
    this.authInfoService = ServiceUtil.getAuthInfoService();
  }

  initParams(service: S, mainHeader?: string) {
    this.service = service;
    this.mainHeader = mainHeader;
  }

  ngOnInit(): void {
    //获取菜单信息
    this.menuInfoSubscription = this.authInfoService.menuInfoSubject
      .subscribe(
        data => {
          console.log('RoleComponent menuInfoSubject subscribe', data);
          this.setMenuInfo(data);
        },
        error => console.error(error)
      );

    //获取权限--考虑开始未登录-->登录动作-->已登录
    this.authInfoSubscription = this.authInfoService.authInfoSubject
    //.merge(this.userRegisterService.currentUser)
      .subscribe(
        data => {
          console.log('RoleComponent currentAuthInfo subscribe', data);
          this.setAuthInfo(data);
        },
        error => console.error(error)
      );
  }

  ngOnDestroy(): void {
    if (this.authInfoSubscription !== undefined) {
      this.authInfoSubscription.unsubscribe();
    }

    if (this.menuInfoSubscription !== undefined) {
      this.menuInfoSubscription.unsubscribe();
    }
  }

  //获取服务
  abstract  getService(): S;

  //获取操作实例
  abstract  newInstance(): T;

  //是否具有操作前提条件
  canDoView(): boolean {
    if (this.useTreeTable) {
      return !isUndefined(this.treeTableService) && !isUndefined(this.treeTableService.selectedNode);
    } else {
      return !isUndefined(this.selectedRecord);
    }
  }

  //复制当前选中数据记录
  protected getCloneRecord(): T {
    let data;
    if (this.useTreeTable) {
      data = this.treeTableService.selectedNode.data;
    } else {
      data = this.selectedRecord;
    }

    /*const obj = this.newInstance();
     if (data) {
     for (const prop in data) {
     obj[prop] = data[prop];
     }
     }*/
    //Object.assign(obj,data);

    return Object.assign({}, data);
  }

//刷新
  refresh() {
    this.action = ActionType.refreshAction;
    if (this.canDoRefresh()) {
      this.doRefresh(null);
    }
  }

  protected canDoRefresh(): boolean {
    return true;
  }

  doRefresh(id: number) {
    this.getService().getList().subscribe(
      data => {
        //this.records = data.rows;
        this.records = data;

        for (const record of this.records) {
          if (record.id == id) {
            this.selectedRecord = record;
            break;
          }
        }

        //若为树表展示
        if (this.useTreeTable) {
          this.treeTableService.records = this.records;
          //this.treeTableService.records = Object.assign([], this.records);
          //Object.assign(this.treeTableService.records, this.records);
          //this.treeTableService.records = [...this.records];
          this.treeTableService.refreshTreeNode(id);
        }
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('refreshAction Complete');
      }
    );
  }

//新增
  protected canDoAdd(): boolean {
    return true;
  }

  doAdd(): Observable<any> {
    return this.getService().create(this.record);
  }

//编辑
  protected canDoEdit(): boolean {
    if (this.useTreeTable) {
      return !isUndefined(this.treeTableService) && !isUndefined(this.treeTableService.selectedNode);
    } else {
      return !isUndefined(this.selectedRecord);
    }
  }

  doEdit(): Observable<any> {
    return this.getService().edit(this.record);
  }

//删除
  protected canDoDelete(): boolean {
    if (this.useTreeTable) {
      return !isUndefined(this.treeTableService) && !isUndefined(this.treeTableService.selectedNode);
    } else {
      return !isUndefined(this.selectedRecord);
    }
  }

  doDelete(): Observable<any> {
    let data;
    if (this.useTreeTable) {
      data = this.treeTableService.selectedNode.data;
    } else {
      data = this.selectedRecord;
    }

    return this.getService().delete(data);
  }

  protected setAuthInfo(authInfo: AuthInfo) {
    this.currentAuthInfo = authInfo;
  }

  protected setMenuInfo(menuInfo: MenuInfo) {
    this.currentMenuInfo = menuInfo;
  }

}

export interface  BaseTreeObject {
  id?: any;
  parentId?: any;
}

export class BaseTreeNode implements TreeNode {
  label?: string;
  data?: any;
  icon?: any;
  expandedIcon?: any;
  collapsedIcon?: any;
  children?: TreeNode[];
  leaf?: boolean;
  expanded?: boolean;
  type?: string;
  parent?: TreeNode;
  partialSelected?: boolean;

  id: number;
}

export class TreeTableService {

  selectedNode: BaseTreeNode;       //选中记录--树
  nodes: BaseTreeNode[];        //数据列表-树
  records: BaseTreeObject[];

  public refreshTreeNode(id: number) {
    //this.records = data.rows;
    this.nodes = [];
    //第一遍，只处理pid==null
    for (let record of this.records) {
      if (record.parentId == null) {
        const treeNode: BaseTreeNode = new BaseTreeNode();
        treeNode.data = record;
        treeNode.id = record.id;
        this.nodes.push(treeNode);
        //处理过则去除
        record = null;
      }
    }

    this.doSet(this.nodes);

    for (const node of this.nodes) {
      if (node.id == id) {
        this.selectedNode = node;
        break;
      }
    }
  }

  //第三遍
  //TreeNodes1 = TreeNodes3;  //上一遍的筛选记录
  private doSet(TreeNodes1: BaseTreeNode[]) {

    const TreeNodes3: BaseTreeNode[] = []; //这一遍筛选记录

    for (const treeNode1 of TreeNodes1) {
      //从records中查找该级别子节点
      for (let record of this.records) {
        if (record == null) {
          continue;
        }

        if (record.parentId == treeNode1.id) {
          if (treeNode1.children == null) {
            treeNode1.children = [];
          }

          const treeNode: BaseTreeNode = new BaseTreeNode();
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
      this.doSet(TreeNodes3);
    }
  };
}

//SubPageComponentWithDialog
export abstract class SubPageComponentWithDialog<T extends BaseObject, S extends BaseService>
  extends SubPageComponent<T, S>
  implements ConfirmProcess {

  public dialog: MdDialog;

  //编辑对话框设置信息
  dialogConfig: MdDialogConfig = {
    disableClose: false,
    width: '',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    },
    data: {
      message: 'Jazzy jazz jazz'
    }
  };

  dialogRef;

  abstract oPenDialog(actionName: string);

  view() {
    if (!this.canDoView()) {
      return;
    }

    this.action = ActionType.viewAction;
    this.record = this.getCloneRecord();

    this.oPenDialog('--查看');
  }

  add() {
    if (!this.canDoAdd()) {
      return;
    }

    this.action = ActionType.newAction;
    this.record = this.newInstance();

    this.oPenDialog('--新增');

    //关闭对话框后进行,刷新
    this.dialogRef.afterClosed().subscribe((result: DialogResult) => {
      this.dialogRef = null;

      if (result.success) {
        this.doRefresh(result.recordId);
      }
    });
  }

  edit() {
    if (!this.canDoEdit()) {
      return;
    }

    this.action = ActionType.editAction;
    this.record = this.getCloneRecord();

    this.oPenDialog('--编辑');

    //关闭对话框后进行,刷新
    this.dialogRef.afterClosed().subscribe((result: DialogResult) => {
      this.dialogRef = null;
      if (result.success) {
        this.doRefresh(result.recordId);
      }
    });
  }

  doProgress(): Observable<Response> {
    return this.doDelete();
  }

  getDeleteMessage(): string[] {
    const message = [];
    message.push(this.mainHeader + '记录');
    if (this.useTreeTable) {
      message.push('ID:[' + this.treeTableService.selectedNode.id + ']');
    } else {
      message.push('ID:[' + this.selectedRecord.id + ']');
    }

    return message;
  };

  delete() {
    if (!this.canDoDelete()) {
      return;
    }

    this.action = ActionType.deleteAction;

    //弹出对话框，确认是否删除
    let dialogRef: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent, this.dialogConfig);
    dialogRef.componentInstance.messages = this.getDeleteMessage();
    dialogRef.componentInstance.confirmProcess = this;

    //关闭对话框后进行,刷新
    dialogRef.afterClosed().subscribe((result: DialogResult) => {
      dialogRef = null;
      if (result.success) {
        this.doRefresh(result.recordId);
      }
    });
  }


}

/** @deprecated */
export abstract class SubPageComponentWithTemplateDialog<T extends BaseObject, S extends BaseService>
  extends SubPageComponentWithDialog<T, S> {

  @ViewChild('TemplateRef') template: TemplateRef<any>;
  progress = false;
  actionsAlignment = 'end';

  constructor(mainHeader: string, dialog: MdDialog) {
    super();

    this.dialog = dialog;
    this.mainHeader = mainHeader;
  }

  //abstract
  oPenDialog(actionName: string) {
    this.dialogHeader = this.mainHeader + actionName;
    this.dialogRef = this.dialog.open(this.template, this.dialogConfig);
  }

  //按钮-确认
  confirm() {
    this.progress = true;
    let observable: Observable<any> = null;


    if (this.action == ActionType.newAction) {//新增
      observable = this.doAdd();
    } else if (this.action = ActionType.editAction) {//编辑
      observable = this.doEdit();
    }

    observable.subscribe(
      responseResult => {
        const dialogResult: DialogResult = {'success': true, 'recordId': responseResult.data.id};
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

export abstract class SubPageComponentWithComponentDialog<D extends BaseDialog, T extends BaseObject, S extends BaseService>
  extends SubPageComponentWithDialog<T, S> {

  //编辑对话框类型
  componentOrTemplateRef: ComponentType<D> | TemplateRef<D>;

  constructor(mainHeader: string, _dialog: MdDialog,
              _componentOrTemplateRef: ComponentType<D> | TemplateRef<D>) {
    super();
    this.mainHeader = mainHeader;
    this.dialog = _dialog;
    this.componentOrTemplateRef = _componentOrTemplateRef;
  }

  //abstract
  oPenDialog(actionName: string) {
    const dialogRef: MdDialogRef<D> = this.dialog.open(this.componentOrTemplateRef, this.dialogConfig);
    dialogRef.componentInstance.record = this.record;
    dialogRef.componentInstance.dialogHeader = actionName;
    dialogRef.componentInstance.action = this.action;
    dialogRef.componentInstance.service = this.getService();

    this.dialogRef = dialogRef;

    console.log(this.action);
  }
}

export interface BaseDialog {
  record: any;
  dialogHeader: string;
  action: any;
  service: any;
}

export interface DialogResult {
  success: boolean;
  cancel?: boolean;
  recordId?: number;
}

export class ComponentDialog<D, T, S extends BaseService> implements BaseDialog {
  actionsAlignment = 'end';
  progress = false;
  dialogHeader: string;  //编辑页面标题

  action: ActionType;
  service: S;

  dialogRef: MdDialogRef<D>;
  record: T;        //临时变量

  //refreshAction:(event:Event)=>void;

  constructor(_dialogRef: MdDialogRef<D>) {
    this.dialogRef = _dialogRef;
  }

  doAdd(): Observable<ResponseResult> {
    return this.service.create(this.record);
  }

  //编辑
  doEdit() {
    return this.service.edit(this.record);
  }

  //按钮-确认
  confirm() {
    this.progress = true;
    let observable: Observable<any> = null;
    console.log(this.action);


    if (this.action == ActionType.newAction) {//新增
      observable = this.doAdd();
    } else if (this.action == ActionType.editAction) {//编辑
      observable = this.doEdit();
    } else {
      const dialogResult: DialogResult = {'success': false, 'cancel': false};
      this.dialogRef.close(dialogResult);
      return;
    }

    if (observable != null) {
      observable.subscribe(
        responseResult => {
          const dialogResult: DialogResult = {'success': true, 'recordId': responseResult.data.id};
          this.dialogRef.close(dialogResult);
          this.progress = false;
        },
        err => {
          console.log(err);
          this.progress = false;
        },
        () => console.log('confirm Complete')
      );
    }
    //this.record = null;
  }

  //按钮-取消
  cancel() {
    const dialogResult: DialogResult = {'success': false, 'cancel': false};
    this.dialogRef.close(dialogResult);
  }

}
