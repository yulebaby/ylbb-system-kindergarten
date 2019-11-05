import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';

import { ListComponent } from './list/list.component';
import { UpdateComponent } from './list/update/update.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { PreviewComponent } from './list/preview/preview.component';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListComponent
      }
    ]),
    NgZorroAntdModule,
    NgRelaxModule
  ],
  declarations: [ListComponent, UpdateComponent, PreviewComponent],
  entryComponents: [UpdateComponent, PreviewComponent],
  providers: [DatePipe]
})
export class ClassModule { }
