import { NgModule } from '@angular/core';
import { CommonModule , DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceComponent } from './service.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { QuillModule } from 'ngx-quill';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [ServiceComponent, UpdateComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    RouterModule.forChild([
      {
        path: '',
        component: ServiceComponent
      }
    ]),
    NgRelaxModule,
    QuillModule.forRoot()
  ],
  entryComponents: [UpdateComponent],
  providers: [ DatePipe ]
})
export class ServiceModule { }
