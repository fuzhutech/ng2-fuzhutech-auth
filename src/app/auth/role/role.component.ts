import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';

import {SubPageComponentWithTemplateDialog} from '../../shared';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';

import {Role} from './services/role';
import {RoleService} from './services/role.service';
import {RoleGrantResourceDialogComponent} from './role-grant-resource-dialog/role-grant-resource-dialog.component';
import {DialogResult} from '../../shared/common/sub-page-component';
import {RoleGrantUserDialogComponent} from './role-grant-user-dialog/role-grant-user-dialog.component';
import {AuthInfoService, AuthInfo} from '../auth-info/auth-info.module';
import {Subscription} from 'rxjs/Subscription';
import {MenuInfo} from '../auth-info/auth-info';

@Component({
  templateUrl: './role.component.html'
})
export class RoleComponent extends SubPageComponentWithTemplateDialog<Role, RoleService> implements OnInit, AfterViewInit, OnDestroy {

  //用户状态
  statuses = [{label: '正常', value: '0'}, {label: '非正常', value: '1'}];

  private currentMenuId = 1100030000;
  private currentMenuInfo: MenuInfo;
  private menuInfoSubscription: Subscription;
  private currentAuthInfo: AuthInfo;
  private subscription: Subscription;

  constructor(private service: RoleService, dialog: MdDialog, private authInfoService: AuthInfoService) {
    super('角色', dialog);
  }

  ngOnInit(): void {
    console.log('RoleComponent on init');

    //获取菜单信息
    this.menuInfoSubscription = this.authInfoService.menuInfoSubject
      .subscribe(
        data => {
          console.log('RoleComponent menuInfoSubject subscribe');
          console.log(data);
          this.currentMenuInfo = data;
        },
        error => console.error(error)
      );

    //获取权限--考虑开始未登录-->登录动作-->已登录
    this.subscription = this.authInfoService.authInfoSubject
    //.merge(this.userRegisterService.currentUser)
      .subscribe(
        data => {
          console.log('RoleComponent currentAuthInfo subscribe');
          console.log(data);
          this.currentAuthInfo = data;
        },
        error => console.error(error)
      );
  }

  ngAfterViewInit(): void {
    //console.log('RoleComponent on AfterViewInit');
  }

  ngOnDestroy() {
    //console.log('RoleComponent on ngOnDestroy');

    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }

    if (this.menuInfoSubscription !== undefined) {
      this.menuInfoSubscription.unsubscribe();
    }

  }

  /* @override */
  getService(): RoleService {
    return this.service;
  }

  /* @override */
  newInstance(): Role {
    return new Role();
  };

  /* @override */
  getDeleteMessage(): string[] {
    const message = super.getDeleteMessage();
    message.push('名称:[' + this.selectedRecord.name + ']');
    return message;
  };


  getStatus(value) {
    let label = null;
    for (const status of this.statuses) {
      if (status.value == value) {
        label = status.label;
        break;
      }
    }

    return label;
  }


  grant() {

    if (!this.canDoGrant()) {
      return;
    }

    //弹出对话框
    const dialogRef: MdDialogRef<RoleGrantResourceDialogComponent> = this.dialog.open(RoleGrantResourceDialogComponent, this.dialogConfig);

    dialogRef.componentInstance.record = this.getCloneRecord();

    dialogRef.componentInstance.record.status = 11;
    console.log(dialogRef.componentInstance.record);
    console.log(this.selectedRecord);

    dialogRef.componentInstance.dialogHeader = '分配资源';
    dialogRef.componentInstance.action = this.action;
    dialogRef.componentInstance.service = this.getService();


    //关闭对话框后进行,刷新
    dialogRef.afterClosed().subscribe((result: DialogResult) => {
      this.dialogRef = null;
      if (result.success) {
        this.doRefresh(result.recordId);
      }
    });
  }

  private canDoGrant(): boolean {
    return (this.selectedRecord && this.selectedRecord.id);
  }

  grantUser() {

    if (!this.canDoGrantUser()) {
      return;
    }

    //弹出对话框
    const dialogRef: MdDialogRef<RoleGrantUserDialogComponent> = this.dialog.open(RoleGrantUserDialogComponent, this.dialogConfig);
    dialogRef.componentInstance.record = this.getCloneRecord();
    dialogRef.componentInstance.dialogHeader = '分配用户';
    dialogRef.componentInstance.action = this.action;
    dialogRef.componentInstance.service = this.getService();


    //关闭对话框后进行,刷新
    dialogRef.afterClosed().subscribe((result: DialogResult) => {
      this.dialogRef = null;
      if (result.success) {
        this.doRefresh(result.recordId);
      }
    });
  }

  private canDoGrantUser(): boolean {
    return (this.selectedRecord && this.selectedRecord.id);
  }

}
