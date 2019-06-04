import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexComponent } from './index.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { UpdateComponent } from './update/update.component';
import { ListComponent } from './list/list.component';
import { PreviewComponent } from './preview/preview.component';

@NgModule({
  declarations: [IndexComponent, UpdateComponent, ListComponent, PreviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: IndexComponent
      }
    ]),
    NgRelaxModule,
    NgZorroAntdModule
  ],
  entryComponents: [UpdateComponent, ListComponent]
})
export class IndexModule { }
