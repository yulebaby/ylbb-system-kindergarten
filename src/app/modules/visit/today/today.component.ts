import { UpdateComponent } from './../public/update/update.component';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';
import { NzDrawerService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';
import { PreviewComponent } from '../../public/customer-preview/preview/preview.component';
import { ImportComponent } from '../public/import/import.component';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { GetList } from 'src/app/ng-relax/decorators/getList.decorator';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.less']
})
export class TodayComponent implements OnInit {

  @ViewChild('EaTable') table;
  jsonData: any = {
    activity: {},
    allworking: {},
    babysitter: {},
    born: {},
    carer: {},
    gift: {},
    multiplebirth: {},
    nannytime: {},
    near: {},
    problems: {},
    reason:{}
  };

  queryNode: QueryNode[] = [
    {
      label: '学员',
      key: 'keyWords',
      type: 'input',
      placeholder: '根据学号、姓名、手机号查询'
    },
    {
      label: '分配给',
      key: 'followerId',
      type: 'select',
      optionsUrl: '/teacher/getGrowthConsultant',
      params: { code: 1004 }
    },
    {
      label: '来源',
      key: 'memberFromId',
      type: 'select',
      optionsUrl: '/membermanage/returnVisit/getMemberFrom',
      optionKey: { label: 'fromName', value: 'id' }
    },
    {
      label: '客户状态',
      key: 'visitStatusId',
      type: 'select',
      optionsUrl: '/membermanage/returnVisit/getVisitStatus'
    },
      {
        label: '参与活动',
        key: 'activity',
        type: 'select',
        options: [],
        optionKey: { label: 'name', value: 'key' }
      },
      {
        label: '赠送礼品',
        key: 'gift',
        type: 'select',
        options: [],
        optionKey: { label: 'name', value: 'key' }
      },
      {
        label: '第几个孩子',
        key: 'multiplebirth',
        type: 'select',
        options: [],
        optionKey: { label: 'name', value: 'key' }
      },
      {
        label: '生产方式',
        key: 'born',
        type: 'select',
        options: [],
        optionKey: { label: 'name', value: 'key' }
      },
      {
        label: '平时陪护',
        key: 'carer',
        type: 'select',
        options: [],
        optionKey: { label: 'name', value: 'key' }
      },
      {
        label: '是否有保姆',
        key: 'babysitter',
        type: 'select',
        options: [],
        optionKey: { label: 'name', value: 'key' }
      },
      {
        label: '双职工',
        key: 'allworking',
        type: 'select',
        options: [],
        optionKey: { label: 'name', value: 'key' }
      },
      {
        label: '是否住附近',
        key: 'near',
        type: 'select',
        options: [],
        optionKey: { label: 'name', value: 'key' }
      },
      {
        label: '家长痛点',
        key: 'problems',
        type: 'select',
        options: [],
        optionKey: { label: 'name', value: 'key' }
      },
      {
        label: '客户阶段',
        key: 'followStageId',
        type: 'select',
        optionKey: { label: 'name', value: 'id' },
        optionsUrl: '/membermanage/returnVisit/getFollowStage'
      },
    {
      label: '创建时间',
      key: 'createTime',
      type: 'rangepicker',
      valueKey: ['startCreateTime', 'endCreateTime']
    },
    {
      label: '下次跟进',
      key: 'lastFollowTime',
      type: 'rangepicker',
      valueKey: ['startNextFollowTime', 'endNextFollowTime'],
      default: [new Date(),new Date()],
      isSubmit: true
    },
  ];

  paramsInit;
  stepList:any[] = [];
  @GetList('/membermanage/returnVisit/getActivities') activityList: any | [];
  @GetList('/student/getClassList') classList: any | [];
  tableNode = ['学员昵称', '学员姓名', '学员生日', '性别', '月龄', '家长电话', '入库时间', '下次跟进时间', '客户阶段', '家长痛点', '最近一次跟踪记录'];
  constructor(
    private drawer: NzDrawerService,
    private http: HttpService,
    private format: DatePipe
  ) { 
    typeof this.activityList === 'function' && this.activityList();
    typeof this.classList === 'function' && this.classList();
    this.paramsInit = {
      startNextFollowTime: this.format.transform(new Date(), 'yyyy-MM-dd'),
      endNextFollowTime: this.format.transform(new Date(), 'yyyy-MM-dd'),
    };
    
  }

  ngOnInit() {
    this.http.post('/attribute/getAllAttribute').then(res => {
      let data = res.data || this.jsonData;
      this.jsonData = JSON.parse(JSON.stringify(data));
      let dataArr = Object.keys(data);
      dataArr.map(item => {
        let itemArr = Object.keys(data[item]);
        data[item].list = [];
        itemArr.map(items => {
          data[item].list.push({
            name: data[item][items],
            key: Number(items)
          });
        })
      })
      const arrs = data;

      this.queryNode[4].options = arrs.activity.list;
      this.queryNode[5].options = arrs.gift.list;
      this.queryNode[6].options = arrs.multiplebirth.list;
      this.queryNode[7].options = arrs.born.list;
      this.queryNode[8].options = arrs.carer.list;
      this.queryNode[9].options = arrs.babysitter.list;
      this.queryNode[10].options = arrs.allworking.list;
      this.queryNode[11].options = arrs.near.list;
      this.queryNode[12].options = arrs.problems.list;
    });
  }

  @DrawerCreate({ content: PreviewComponent, width: 960, closable: false }) preview: ({ id: number, source: string, step: any }) => void;

  @DrawerCreate({ title: '新增客户', content: UpdateComponent }) addCustomer: () => void;

  @DrawerCreate({ title: '导入客户', content: ImportComponent }) import: () => void;

}
