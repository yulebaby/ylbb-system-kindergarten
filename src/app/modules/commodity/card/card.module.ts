import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CardComponent } from './card.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UpdateComponent } from './update/update.component';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';

@NgModule({
  declarations: [CardComponent, UpdateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: CardComponent
    }]),
    NgRelaxModule,
    NgZorroAntdModule,
    QuillModule.forRoot(),
  ],
  entryComponents: [UpdateComponent],
  providers: [ DatePipe ]

})
export class CardModule { }
