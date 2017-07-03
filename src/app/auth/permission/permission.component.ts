import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

import {MdDialog} from '@angular/material';

import {ActionType, DialogResult, SubPageComponentWithComponentDialog} from '../../shared';

import {PermissionDialogComponent} from './dialog/permission-dialog.component';
import {Permission} from './model/permission-model';
import {PermissionService} from './service/permission.service';

/*采用树形表格展示，不调整位置、不调整上下级关系;只有增删改动作*/

@Component({
    selector: 'fz-auth-permission',
    templateUrl: './permission.component.html',
    styleUrls: ['./permission.component.css']
})
export class PermissionComponent
    extends SubPageComponentWithComponentDialog<Permission, PermissionService, PermissionDialogComponent> {

    //状态
    statuses = [{label: '正常', value: '0'}, {label: '非正常', value: '1'}];

    constructor(service: PermissionService, dialog: MdDialog, @Inject(DOCUMENT) doc: any) {
        super(service, '权限管理', dialog, PermissionDialogComponent);

        this.useTreeTable = true;
    }

    /* @override */
    newInstance(): Permission {
        return new Permission();
    };

    /* @override */
    protected initAddParams(): boolean {
        if (super.initAddParams()) {
            const data = this.getCloneRecord();
            this.record.systemId = data.systemId;
            this.record.parentId = data.parentId || data.id;
            console.log(this.record);
            return true;
        } else {
            return false;
        }
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

}
