import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule , DatePipe } from '@angular/common';

import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { MonitorComponent } from './monitor.component';
import { UpdateComponent } from './update/update.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([
      {
        path: '',
        component: MonitorComponent
      },
    ])
  ],
  declarations: [MonitorComponent, UpdateComponent],
  entryComponents: [UpdateComponent],
  providers: [ DatePipe ]
})
export class MonitorModule { }
