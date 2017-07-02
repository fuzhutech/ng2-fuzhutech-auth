import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

import {MdDialog, MdDialogRef} from '@angular/material';

import {ActionType, SubPageComponentWithComponentDialog} from '../../shared';

import {ResourceDialogComponent} from './dialog/resource-dialog.component';
import {Resource} from './model/resource-model';
import {ResourceService} from './service/resource.service';
import {ResourceGrantDialogComponent} from './grant-dialog/resource-grant-dialog.component';
import {DialogResult} from '../../shared/common/sub-page-component';

@Component({
    selector: 'fz-auth-resource',
    templateUrl: './resource.component.html',
    styleUrls: ['./resource.component.css']
})
export class ResourceComponent
    extends SubPageComponentWithComponentDialog<Resource, ResourceService, ResourceDialogComponent>
    implements OnInit {

    //状态
    statuses = [{label: '正常', value: '0'}, {label: '非正常', value: '1'}];

    constructor(service: ResourceService, dialog: MdDialog, @Inject(DOCUMENT) doc: any) {
        super(service, '用户', dialog, ResourceDialogComponent);
        this.useTreeTable = true;
    }

    newInstance(): Resource {
        return new Resource();
    };

    ngOnInit() {
        console.log('ResourceComponent ngOnInit');
        //获取权限
        this.currentAuthInfo = JSON.parse(localStorage.getItem('currentAuthInfo'));

        this.authInfoService.authInfoSubject
        //.merge(this.userRegisterService.currentUser)
            .subscribe(
                data => {
                    this.currentAuthInfo = data;
                    console.log('ResourceComponent currentAuthInfo subscribe');
                },
                error => console.error(error)
            );
    }

    add(event) {
        if (!this.canDoAdd()) {
            return;
        }

        this.action = ActionType.newAction;
        this.record = this.newInstance();

        const data = this.getCloneRecord();
        this.record.systemId = data.systemId;
        this.record.parentId = data.parentId || data.id;

        console.log(this.record);

        let dialogRef = this.oPenDialog('--新增');

        //关闭对话框后进行,刷新
        dialogRef.afterClosed().subscribe((result: DialogResult) => {
            dialogRef = null;

            if (result.success) {
                this.doRefresh(result.recordId);
            }
        });
    }

    getFilterType(data) {
        if (data == '0') {
            return '空';
        } else {
            return '权限';
        }
    }

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
        let dialogRef: MdDialogRef<ResourceGrantDialogComponent>
            = this.oPenBaseDialog(ResourceGrantDialogComponent, this.getCloneRecord(), '分配权限');

        //关闭对话框后进行,刷新
        dialogRef.afterClosed().subscribe((result: DialogResult) => {
            dialogRef = null;
            if (result.success) {
                this.doRefresh(result.recordId);
            }
        });
    }

    canDoGrant(): boolean {
        return true;
    }

}
