import { NgModule } from '@angular/core';
import { CommonModule , DatePipe } from '@angular/common';

import { TeacherComponent } from './teacher.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { CustomerPreviewModule } from '../../public/customer-preview/customer-preview.module';

@NgModule({
  declarations: [TeacherComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: TeacherComponent
    }]),
    CustomerPreviewModule,
  ],
  providers: [ DatePipe ]
})
export class TeacherModule { }
