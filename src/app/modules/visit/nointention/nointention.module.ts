import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgRelaxModule } from './../../../ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule , DatePipe } from '@angular/common';
import { NointentionComponent } from './nointention.component';
import { CustomerPreviewModule } from '../../public/customer-preview/customer-preview.module';

@NgModule({
  declarations: [NointentionComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([{
      path: '',
      component: NointentionComponent
    }]),
    CustomerPreviewModule,
  ],
  providers: [ DatePipe ]
})
export class NointentionModule { }
