import { Component, OnInit  } from '@angular/core';
import { NzMessageService, NzDrawerRef , NzDrawerService } from 'ng-zorro-antd';
import { HttpService } from 'src/app/ng-relax/services/http.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.less']
})
export class ImportComponent implements OnInit {
  classList: any[] = [];
  editName: string;
  listOfData: any[] = [];

  constructor(
    private message: NzMessageService,
    private drawerRef: NzDrawerRef,
    private drawer: NzDrawerService,
    private http: HttpService,
  ) { }

  ngOnInit() {
      this.getData();
  }

  uploadResult: any[] = [];
  uploadInfo: string;

  uploadComplate(e) {
    if (e.type === 'start') {
      this.uploadResult = [];
    }
    if (e.type === 'success') {
      this.message.create(e.file.response.result == 1000 ? 'success' : 'warning', e.file.response.message);
      if (e.file.response.result == 1000) {
        this.message.success(e.file.response.message);
      } else {
        this.uploadResult = e.file.response.data.errorClues;
        this.uploadInfo = `本次上传结果（${e.file.response.message}）`;
      }
    }
  }
  getData(){
    this.http.post('/membermanage/returnVisit/getMemberFrom').then(res => {
      this.listOfData = res.data;
      console.log(this.listOfData);
    });
  }
  addClass(){
    let json = {
      fromName: '',
      edit: true
    };
    this.listOfData.unshift(json);
  }
  saveEdit(data){
    console.log(data);
    data.edit = false;
  }
  save() {
    this.drawerRef.close(true)
  }
  
}
