import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { ConfigComponent } from './config.component';
import { RouterModule } from '@angular/router';

import { NgRelaxModule } from './../../../ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BmapComponent } from './bmap/bmap.component';


@NgModule({
  declarations: [ConfigComponent, BmapComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NgRelaxModule,
    RouterModule.forChild([
      {
        path: '',
        component: ConfigComponent
      }
    ]),
  ],
  entryComponents: [BmapComponent],
  providers: [ DatePipe ]
})
export class ConfigModule { }