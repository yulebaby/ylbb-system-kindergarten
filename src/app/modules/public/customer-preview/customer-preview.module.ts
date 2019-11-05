import { SelectCardComponent } from './select-card/select-card.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule , DatePipe } from '@angular/common';
import { UpdateComponent } from './update/update.component';
import { PreviewComponent } from './preview/preview.component';
import { InformationComponent } from './preview/information/information.component';
import { TrackComponent } from './preview/track/track.component';
import { TransactionComponent } from './preview/transaction/transaction.component';
import { AttendanceComponent } from './preview/attendance/attendance.component';
import { ServiceComponent } from './preview/service/service.component';
import { JournalComponent } from './preview/journal/journal.component';
import { HeaderComponent } from './preview/header/header.component';
import { PaymentComponent } from './payment/payment.component';
import { ClassComponent } from './class/class.component';
import { LeavingComponent } from './leaving/leaving.component';
import { DetailedComponent } from './payment/detailed/detailed.component';
import { AppointComponent } from './appoint/appoint.component';
import { DelayComponent } from './delay/delay.component';

@NgModule({
  declarations: [UpdateComponent, PreviewComponent, InformationComponent, TrackComponent, TransactionComponent, AttendanceComponent, ServiceComponent, JournalComponent, HeaderComponent, PaymentComponent, ClassComponent, LeavingComponent, DetailedComponent, AppointComponent, DelayComponent, SelectCardComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule
  ],
  entryComponents: [UpdateComponent, PreviewComponent, PaymentComponent, ClassComponent, LeavingComponent, DetailedComponent, AppointComponent, DelayComponent, SelectCardComponent],
  providers: [ DatePipe ]
})
export class CustomerPreviewModule { }
