import { BaseComponent } from './base.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../ng-relax/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'index',
        data: { title: '首页', noReuse: true },
        loadChildren: 'src/app/modules/index/index.module#IndexModule'
      },
      {
        path: 'password',
        data: { title: '修改密码', noReuse: true },
        loadChildren: 'src/app/modules/password/password.module#PasswordModule'
      },
      {
        path: 'teacher',
        data: { title: '老师管理' },
        canLoad: [AuthGuardService],
        loadChildren: 'src/app/modules/teacher/teacher.module#TeacherModule'
      },
      {
        path: 'class',
        data: { title: '班级管理' },
        canLoad: [AuthGuardService],
        loadChildren: 'src/app/modules/class/class.module#ClassModule'
      },
      {
        path: 'reserve',
        data: { title: '预约管理' },
        canLoad: [AuthGuardService],
        loadChildren: 'src/app/modules/reserve/reserve.module#ReserveModule'
      },
      {
        path: 'setting',
        data: { noReuse: true },
        children: [
          {
            path: 'list',
            data: { title: '事件设置' },
            canLoad: [AuthGuardService],
            loadChildren: 'src/app/modules/setting/list/list.module#ListModule'
          },
          {
            path: 'notice',
            data: { title: '公告设置' },
            canLoad: [AuthGuardService],
            loadChildren: 'src/app/modules/setting/notice/notice.module#NoticeModule'
          },
          {
            path: 'account',
            data: { title: '账号管理' },
            canLoad: [AuthGuardService],
            loadChildren: 'src/app/modules/setting/account/account.module#AccountModule'
          },
          {
            path: 'role',
            data: { title: '角色管理' },
            canLoad: [AuthGuardService],
            loadChildren: 'src/app/modules/setting/role/role.module#RoleModule'
          },
          {
            path: 'monitor',
            data: { title: '监控管理' },
            canLoad: [AuthGuardService],
            loadChildren: 'src/app/modules/setting/monitor/monitor.module#MonitorModule'
          },
          {
            path: 'config',
            data: { title: '基础设置' },
            canLoad: [AuthGuardService],
            loadChildren: 'src/app/modules/setting/config/config.module#ConfigModule'
          },
          {
            path: 'class',
            data: { title: '班级管理' },
            canLoad: [AuthGuardService],
            loadChildren: 'src/app/modules/class/class.module#ClassModule'
          },
          {
            path: 'teacher',
            data: { title: '老师管理' },
            canLoad: [AuthGuardService],
            loadChildren: 'src/app/modules/teacher/teacher.module#TeacherModule'
          }
        ]
      },
      {
        path: 'event',
        data: { noReuse: true },
        children: [
          {
            path: 'list',
            data: { title: '个人事件' },
            canLoad: [AuthGuardService],
            loadChildren: 'src/app/modules/event/list/list.module#ListModule'
          },
          {
            path: 'examine',
            data: { title: '审核事件' },
            canLoad: [AuthGuardService],
            loadChildren: 'src/app/modules/event/examine/examine.module#ExamineModule'
          },
        ]
      },
      {
        path: 'customer',
        data: { title: '学员管理' },
        canLoad: [AuthGuardService],
        loadChildren: 'src/app/modules/customer/customer.module#CustomerModule'
      },
      {
        path: 'commodity',
        data: { noReuse: true },
        children: [
          {
            path: 'card',
            data: { title: '卡项' },
            canLoad: [AuthGuardService],
            loadChildren: 'src/app/modules/commodity/card/card.module#CardModule'
          },
          {
            path: 'service',
            data: { title: '服务' },
            canLoad: [AuthGuardService],
            loadChildren: 'src/app/modules/commodity/service/service.module#ServiceModule'
          },
        ]
      },
      // {
      //   path: 'analysis',
      //   data: { title: '数据管理' },
      //   canLoad: [AuthGuardService],
      //   loadChildren: 'src/app/modules/analysis/analysis.module#AnalysisModule'
      // },
      {
        path: 'analysis',
        data: { noReuse: true },
        children: [
          {
            path: 'management',
            data: { title: '收入/退款分析' },
            canLoad: [AuthGuardService],
            loadChildren: 'src/app/modules/management/management.module#ManagementModule'          },
          {
            path: 'list',
            data: { title: '全部学位' },
            canLoad: [AuthGuardService],
            loadChildren: 'src/app/modules/analysis/all/all.module#AllModule'
          },
          {
            path: 'class',
            data: { title: '班级学位' },
            canLoad: [AuthGuardService],
            loadChildren: 'src/app/modules/analysis/class/class.module#ClassModule'
          },
          {
            path: 'teacher',
            data: { title: '老师服务' },
            canLoad: [AuthGuardService],
            loadChildren: 'src/app/modules/analysis/teacher/teacher.module#TeacherModule'
          },
        ]
      },
      {
        path: 'management',
        data: { title: '经营分析' },
        canLoad: [AuthGuardService],
        loadChildren: 'src/app/modules/management/management.module#ManagementModule'
      },      {
        path: 'visit',
        data: { noReuse: true },
        children: [
          {
            path: 'stay',
            data: { title: '待回访' },
            canLoad: [AuthGuardService],
            loadChildren: 'src/app/modules/visit/stay/stay.module#StayModule'
          },
          {
            path: 'already',
            data: { title: '已回访' },
            canLoad: [AuthGuardService],
            loadChildren: 'src/app/modules/visit/already/already.module#AlreadyModule'
          },
          {
            path: 'nointention',
            data: { title: '无意向' },
            canLoad: [AuthGuardService],
            loadChildren: 'src/app/modules/visit/nointention/nointention.module#NointentionModule'
          },
          {
            path: 'distribution',
            data: { title: '待分配' },
            canLoad: [AuthGuardService],
            loadChildren: 'src/app/modules/visit/distribution/distribution.module#DistributionModule'
          }
        ]
      },
      {
        path: 'education',
        data: { noReuse: true },
        children: [
          {
            path: 'curriculum',
            data: { title: '课程管理' },
            canLoad: [AuthGuardService],
            loadChildren: 'src/app/modules/education/curriculum/curriculum.module#CurriculumModule'
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
