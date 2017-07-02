import {BaseObject} from '../../../shared';

export class Organization implements BaseObject {
    id?;
    name?;
    address?;
    code?;
    icon?;
    parentId?;
    seq?;
    createdate?;
    lastModifyTime;
}
