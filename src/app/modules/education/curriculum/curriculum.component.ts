import { UpdateComponent } from './../public/update/update.component';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';
import { NzDrawerService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';
import { PreviewComponent } from '../../public/customer-preview/preview/preview.component';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.less']
})
export class CurriculumComponent implements OnInit {

  @ViewChild('EaTable') table;

  queryNode: QueryNode[] = [
    {
      label: '课程名称',
      key: 'name',
      type: 'input',
      placeholder: '请输入课程名称'
    },
    {
      label: '课程类别',
      key: 'followerId',
      type: 'select',
      optionsUrl: '/kindergarten/reserve/queryReserve',
    },
    {
      label: '上课时长',
      key: 'memberFromId',
      type: 'select',
      optionsUrl: '/membermanage/returnVisit/getMemberFrom',
      optionKey: { label: 'fromName', value: 'id' }
    },
    {
      label: '课程状态',
      key: 'memberFromIds',
      type: 'select',
      optionsUrl: '/membermanage/returnVisit/getMemberFrom',
      optionKey: { label: 'fromName', value: 'id' }
    },
  ];

  tableNode = ['课程名称', '类别', '时长', '目标', '效果', '教具', '状态', '操作'];

  constructor(
    private drawer: NzDrawerService,
  ) { }

  ngOnInit() {
    
  }

  @DrawerCreate({ content: PreviewComponent, width: 960, closable: false }) preview: ({ id: number, source: string }) => void;

  @DrawerCreate({ title: '新建课程', content: UpdateComponent }) addCustomer: () => void;


}
