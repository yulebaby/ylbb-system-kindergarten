import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.less']
})
export class PreviewComponent implements OnInit {

  @Input() id: number;

  @Input() source: string;

  @Input() indexId: number;

  @Input() step: number;
  
  memberInfo: any = { studentInfo: {}, parentAccountList: [], cardList: [] };

  loading: boolean = true;

  constructor(
    private http: HttpService
  ) { }
  
  ngOnInit() {
    this.http.post('/student/getNewStudent', { id: this.id }).then(res => {
      res.data.step = this.step;
      this.memberInfo = res.data;
      this.memberInfo.studentInfo.step = this.step;;
      this.source && (this.memberInfo.hideBtn = this.source);
      this.loading = false;
    });
  }

}
