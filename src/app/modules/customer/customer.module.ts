import { NgModule } from '@angular/core';
import { CommonModule , DatePipe } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { CustomerPreviewModule } from '../public/customer-preview/customer-preview.module';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListComponent
      }
    ]),
    CustomerPreviewModule,
    NgZorroAntdModule,
    NgRelaxModule
  ],
  entryComponents: [],
  providers: [ DatePipe ]
})
export class CustomerModule { }
