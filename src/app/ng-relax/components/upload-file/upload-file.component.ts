import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';

declare const OSS;

@Component({
  selector: 'ea-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UploadFileComponent),
    multi: true
  }]
})
export class UploadFileComponent implements OnInit {


  private _aliOssClientImage;
  private _aliOssClientVideo;

  filesChange: any = () => { };

  @Input() maxLength = 1;

  allowuploadNo = 1;

  private _files
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

  constructor(
    private http: HttpService,
    private message: NzMessageService
  ) { 
    /* ----------------- 获取OSS上传凭证 ----------------- */
    this.http.get('http://oss.haochengzhang.com/oss/getOSSToken?type=1', {}, false).then(res => {
      if (res.result == 0) {
        let creds = res.data;
        this._aliOssClientImage = new OSS.Wrapper({
          region: 'oss-cn-beijing',
          accessKeyId: creds.accessKeyId,
          accessKeySecret: creds.accessKeySecret,
          stsToken: creds.securityToken,
          bucket: 'hcz-czg-image'
        });
        this._aliOssClientVideo = new OSS.Wrapper({
          region: 'oss-cn-beijing',
          accessKeyId: creds.accessKeyId,
          accessKeySecret: creds.accessKeySecret,
          stsToken: creds.securityToken,
          bucket: 'hcz-czg-video'
        });
      }
    });
  }

  ngOnInit() {
  }

  beforeUpload = (file: UploadFile): boolean => {
    this._validatorUploadFile(file).subscribe(res => { })
    return false;
  }
  deleteFile = () => {
    setTimeout(_ => {
      this.allowuploadNo = this.allowuploadNo == this.maxLength ? this.maxLength : this.allowuploadNo - 1;
    }, 0)
    return true;
  }

 
  private _validatorUploadFile(file: UploadFile): Observable<any> {
    return new Observable(observer => {
      let fileType = file.name.split('.')[file.name.split('.').length - 1].toLowerCase();
        let fileName = new Date().getTime() + `.${fileType}`;
        this[fileType != 'mp4' ? '_aliOssClientImage' : '_aliOssClientVideo'].multipartUpload(fileName, file, {}).then(res => {
          let imageSrc = res.url ? res.url : 'http://' + res.bucket + '.oss-cn-beijing.aliyuncs.com/' + res.name;
          let arr = this.files || [];
          arr.push({
            uid: file.uid,
            url: imageSrc,
            name: fileName,
            status: 'done'
          });
          this.files = arr;
          observer.next(true);
          observer.complete();
        }, err => {
          observer.next(null);
          observer.complete();
          this.message.error('图片上传失败，请重新尝试');
        })
      
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
