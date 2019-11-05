import { NgModule } from '@angular/core';
import { CommonModule , DatePipe } from '@angular/common';

import { ReserveComponent } from './list/list.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CustomerPreviewModule } from '../public/customer-preview/customer-preview.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReserveComponent
      }
    ]),
    NgZorroAntdModule,
    NgRelaxModule,
    CustomerPreviewModule
  ],
  declarations: [ReserveComponent],
  entryComponents: [ReserveComponent],
  providers: [ DatePipe ]
})

export class ReserveModule { }
