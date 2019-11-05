import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';

import { IndexComponent } from './index.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { UpdateComponent } from './update/update.component';
import { ListComponent } from './list/list.component';
import { ReservePreviewComponent } from './reserve-preview/preview.component';
import { CustomerPreviewModule } from '../public/customer-preview/customer-preview.module';

@NgModule({
  declarations: [IndexComponent, UpdateComponent, ListComponent, ReservePreviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: IndexComponent
      }
    ]),
    NgRelaxModule,
    NgZorroAntdModule,
    CustomerPreviewModule
  ],
  entryComponents: [UpdateComponent, ListComponent],
  providers: [DatePipe]
})
export class IndexModule { }
