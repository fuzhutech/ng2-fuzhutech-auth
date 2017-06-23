import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {ToolbarOption} from './toolbar.option';

@Component({
  selector: 'fz-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit, AfterViewInit {

  @Input() option: ToolbarOption = new ToolbarOption();    //查看按钮是否可用

  @Input() set permissions(value: string) {
    console.log('permissions');
  }

  @Input() disabledView = false;    //查看按钮是否可用
  @Input() disabledAdd = false;     //新增按钮是否可用
  @Input() disabledDelete = false;  //删除按钮是否可用
  @Input() disabledEdit = false;    //编辑按钮是否可用
  @Input() disabledRefresh = false; //刷新按钮是否可用
  @Input() disabledClose = false;   //关闭按钮是否可用

  @Input() visibleView = true;
  @Input() visibleAdd = true;
  @Input() visibleDelete = true;
  @Input() visibleEdit = true;
  @Input() visibleRefresh = true;
  @Input() visibleClose = true;

  @Output() onViewClick: EventEmitter<any> = new EventEmitter();    //查看
  @Output() onAddClick: EventEmitter<any> = new EventEmitter();     //新增
  @Output() onDeleteClick: EventEmitter<any> = new EventEmitter();  //删除
  @Output() onEditClick: EventEmitter<any> = new EventEmitter();    //编辑
  @Output() onRefreshClick: EventEmitter<any> = new EventEmitter(); //刷新
  @Output() onLookupClick: EventEmitter<any> = new EventEmitter();  //查找
  @Output() onImportClick: EventEmitter<any> = new EventEmitter();  //导入
  @Output() onExportClick: EventEmitter<any> = new EventEmitter();  //导出
  @Output() onPrintClick: EventEmitter<any> = new EventEmitter();   //打印
  @Output() onCloseClick: EventEmitter<any> = new EventEmitter();   //关闭

  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
    console.log('ToolbarComponent on afterViewInit');
  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    console.log('ToolbarComponent on init');
  }

  viewClick(event: Event) {
    if (this.option && this.option.viewButtonOption && this.option.viewButtonOption.disabled) {
      this.onViewClick.next({originalEvent: event});
    }
  }

  addClick(event: Event) {
    this.onAddClick.next({originalEvent: event});
  }

  deleteClick(event: Event) {
    this.onDeleteClick.next({originalEvent: event});
  }

  editClick(event: Event) {
    this.onEditClick.next({originalEvent: event});
  }

  refreshClick(event: Event) {
    this.onRefreshClick.next({originalEvent: event});
  }

  lookupClick(event: Event) {
    this.onEditClick.next({originalEvent: event});
  }

  importClick(event: Event) {
    this.onEditClick.next({originalEvent: event});
  }

  exportClick(event: Event) {
    this.onEditClick.next({originalEvent: event});
  }

  printClick(event: Event) {
    this.onEditClick.next({originalEvent: event});
  }

  closeClick(event: Event) {
    this.onEditClick.next({originalEvent: event});
  }


}
