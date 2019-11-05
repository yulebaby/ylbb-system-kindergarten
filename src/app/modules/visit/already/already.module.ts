import { NgModule } from '@angular/core';
import { CommonModule , DatePipe } from '@angular/common';
import { AlreadyComponent } from './already.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { VisitModule } from '../visit.module';
import { RouterModule } from '@angular/router';
import { CustomerPreviewModule } from '../../public/customer-preview/customer-preview.module';

@NgModule({
  declarations: [AlreadyComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    VisitModule,
    RouterModule.forChild([{
      path: '',
      component: AlreadyComponent
    }]),
    CustomerPreviewModule,
  ],
  providers: [ DatePipe ]
})
export class AlreadyModule { }
