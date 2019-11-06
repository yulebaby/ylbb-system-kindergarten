import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzDrawerRef , NzDrawerService , UploadFile } from 'ng-zorro-antd';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { ControlValid } from 'src/app/ng-relax/decorators/form/valid.decorator';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';
import { ImportComponent } from '../import/import.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.less']
})
export class UpdateComponent implements OnInit {

  @Input() id: number;
  
  formGroup: FormGroup;

  filesChange: any = () => { };

  @Input() maxLength = 1;

  allowuploadNo = 1;

  private _files
  teacherList: any[] = [];
  sourceList: any[] = [];
  constructor(
    private fb: FormBuilder = new FormBuilder(),
    private http: HttpService,
    private drawerRef: NzDrawerRef,
    private drawer: NzDrawerService,
  ) { 
    this.http.post('/teacher/getGrowthConsultant', { code: 1004 }).then(res => this.teacherList = res.data);
    this.http.post('/membermanage/returnVisit/getMemberFrom').then(res => this.sourceList = res.data);
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [this.id],
      studentName: [, [Validators.required]],
      mobilePhone: [, [Validators.required, Validators.pattern(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/)]],
      followerId: [, [Validators.required]],
      memberFromId: [, [Validators.required]]
    });
  }
  @Input()
  set files(pic) {
    if (typeof pic === 'string') {
      this._files = pic.split(',').map((item, idx) => {
        let uploadfile: any = {};
        uploadfile.uid = idx;
        uploadfile.url = item;
        uploadfile.name = item;
        uploadfile.status = 'done';
        return uploadfile;
      })
    } else if (typeof pic === 'object') {
      this._files = pic;
    } else if (typeof pic === 'number') {
      this._files = this.files;
    } else {
      this._files = [];
    }
    let filestring = []
    if (this._files.length) {
      this._files.map(res => {
        filestring.push(res.url);
      })
    }

    setTimeout(() => {
      this.allowuploadNo = filestring.length >= this.maxLength ? this.maxLength : filestring.length + 1;
    }, 500);
    this.filesChange(filestring.join(','));
  }
  get files() {
    return this._files;
  }

  @DrawerClose() close: () => void;

  @ControlValid() valid: (key, type?) => boolean;

  saveLoading: boolean;
  @DrawerSave('/membermanage/clue/saveClue') save: () => void;
  addCustomer(){
    this.drawer.create({
      nzWidth: 720,
      nzTitle: '配置课程类别',
      nzBodyStyle: { 'padding-bottom': '53px' },
      nzContent: ImportComponent,
    }).afterClose.subscribe(res => {
        // 刷新类别列表
    })
  }
  beforeUpload = (file: UploadFile): boolean => {
    this._validatorUploadFile(file).subscribe(res => { })
    return false;
  }
  private _validatorUploadFile(file: UploadFile): Observable<any> {
    return new Observable(observer => {
      let fileType = file.name.split('.')[file.name.split('.').length - 1].toLowerCase();
        let fileName = new Date().getTime() + `.${fileType}`;
        // this[fileType != 'mp4' ? '_aliOssClientImage' : '_aliOssClientVideo'].multipartUpload(fileName, file, {}).then(res => {
        //   let imageSrc = res.url ? res.url : 'http://' + res.bucket + '.oss-cn-beijing.aliyuncs.com/' + res.name;
        //   let arr = this.files || [];
        //   arr.push({
        //     uid: file.uid,
        //     url: imageSrc,
        //     name: fileName,
        //     status: 'done'
        //   });
        //   this.files = arr;
        //   observer.next(true);
        //   observer.complete();
        // }, err => {
        //   observer.next(null);
        //   observer.complete();
        //   alert('图片上传失败，请重新尝试');
        // })
        let json = JSON.stringify({
          'title': fileName,
          'tag': '',
          "desc":"描述"
        });
        let formData:any = new FormData();
        formData.append('file', file, file.name);
        
        this.http.post('http://v.polyv.net/uc/services/rest?method=uploadfile', { 
          writetoken:'eofKSp3rWfDReuv-8W1TO6HswE3y6sLQ',
          JSONRPC: json,
          Filedata: formData
         }).then(res => {
           console.log(res);
         });
      
    })
  }

    /* 实现 ControlValueAccessor 接口部分 */
    writeValue(val: any): void {
      if (val) {
        this.files = val;
      }
    }
    registerOnChange(fn: any): void {
      this.filesChange = fn;
    }
    registerOnTouched(fn: any): void {
    }

}
