import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule , DatePipe } from '@angular/common';
import { ManagementComponent } from './management.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';

@NgModule({
  declarations: [ManagementComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([
      {
        path: '',
        component: ManagementComponent
      }
    ])
  ],
  providers: [ DatePipe ]
})
export class ManagementModule { }
