import { AnnouncementComponent } from './announcement/announcement.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NoticeComponent } from './notice.component';
import { QuillModule } from 'ngx-quill';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: NoticeComponent
      }
    ]),
    NgZorroAntdModule,
    NgRelaxModule,

    QuillModule.forRoot(),
  ],
  declarations: [NoticeComponent, AnnouncementComponent],
  entryComponents: [AnnouncementComponent],
  providers: [ DatePipe ]
})
export class NoticeModule { }
