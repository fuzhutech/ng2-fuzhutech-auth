import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';

import {SubPageComponentWithTemplateDialog} from '../../shared';
import {MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';

import {Role} from './service/role';
import {RoleService} from './service/role.service';
import {RoleGrantResourceDialogComponent} from './role-grant-resource-dialog/role-grant-resource-dialog.component';
import {DialogResult} from '../../shared/common/sub-page-component';
import {RoleGrantUserDialogComponent} from './role-grant-user-dialog/role-grant-user-dialog.component';
import {AuthInfo, MenuInfo} from '../../shared/auth-info';

@Component({
    selector: 'fz-auth-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.css']
})
export class RoleComponent
    extends SubPageComponentWithTemplateDialog<Role, RoleService> implements OnInit, AfterViewInit, OnDestroy {

    //用户状态
    statuses = [{label: '正常', value: '0'}, {label: '非正常', value: '1'}];

    private disabledGrant = false;
    private enableGrantRight = true;
    private hasGrantRight = false;

    private disabledGrantUser = false;
    private enableGrantUserRight = true;
    private hasGrantUserRight = false;

    constructor(service: RoleService, dialog: MdDialog) {
        super(service, '角色', dialog);

        this.currentMenuId = 1100030000;
    }

    /* @override */
    ngOnInit(): void {
        console.log('RoleComponent ngOnInit');
        super.ngOnInit();
    }

    ngAfterViewInit(): void {
        //console.log('RoleComponent on AfterViewInit');
    }

    ngOnDestroy() {
        console.log('RoleComponent ngOnDestroy');
        super.ngOnDestroy();
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
        let dialogRef: MdDialogRef<RoleGrantResourceDialogComponent>
            = this.oPenBaseDialog(RoleGrantResourceDialogComponent, this.getCloneRecord(), '分配资源');

        //关闭对话框后进行,刷新
        dialogRef.afterClosed().subscribe((result: DialogResult) => {
            dialogRef = null;
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
        dialogRef.componentInstance.service = this.service;


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

    protected setAuthInfo(authInfo: AuthInfo) {

        super.setAuthInfo(authInfo);

        if (!this.currentMenuId) {
            return;
        }

        if (authInfo && authInfo.resources) {
            const arrayFilter = authInfo.resources.filter(item => {
                return item.parentId == this.currentMenuId;
            });

            arrayFilter.forEach(function (item, index, array) {
                if (item.name == '分配资源') {
                    this.hasGrantRight = true;
                } else if (item.name == '分配用户') {
                    this.hasGrantUserRight = true;
                }
            });

        }
    }

    protected setMenuInfo(menuInfo: MenuInfo) {

        super.setMenuInfo(menuInfo);

        if (!this.currentMenuId) {
            return;
        }

        if (menuInfo && menuInfo.menus) {
            const arrayFilter = menuInfo.menus.filter(item => {
                return item.parentId == this.currentMenuId;
            });

            arrayFilter.forEach(item => {
                switch (item.name) {
                    case '分配资源':
                        this.enableGrantRight = true;
                        break;
                    case '分配用户':
                        this.enableGrantUserRight = true;
                        break;
                    default:
                        break;
                }
            });

        }

    }

}
