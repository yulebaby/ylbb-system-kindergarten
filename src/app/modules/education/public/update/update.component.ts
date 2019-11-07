import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzDrawerRef , NzDrawerService , UploadFile } from 'ng-zorro-antd';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator';
import { ControlValid } from 'src/app/ng-relax/decorators/form/valid.decorator';
import { DrawerCreate } from 'src/app/ng-relax/decorators/drawer/create.decorator';
import { ImportComponent } from '../import/import.component';
import { Observable } from 'rxjs';
import   PlvVideoUpload  from '@polyv/vod-upload-js-sdk'
import { Md5 } from "ts-md5";
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.less']
})
export class UpdateComponent implements OnInit {

  @Input() info;
  
  formGroup: FormGroup;
  isLoadingfile: boolean  = false;
  filesChange: any = () => { };

  @Input() maxLength = 1;

  allowuploadNo = 1;

  private _files
  listCourseType: any[] = [];
  sourceList: any[] = [];
  constructor(
    private fb: FormBuilder = new FormBuilder(),
    private http: HttpService,
    private drawerRef: NzDrawerRef,
    private drawer: NzDrawerService
      ) { 
    this.http.post('/course/listCourseType', { code: 1004 }).then(res => this.listCourseType = res.data.list);
    this.http.post('/membermanage/returnVisit/getMemberFrom').then(res => this.sourceList = res.data);
    
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [],
      name: [, [Validators.required]],
      typeId: [, [Validators.required]],
      startMonth: [, [Validators.required]],
      endMonth: [, [Validators.required]],
      duration: [, [Validators.required]],
      goal: [, [Validators.required]],
      gain: [, [Validators.required]],
      realia: [],
      status: [0],
      lesson	: [],
      cover: [, [Validators.required]],
      vedio: [],
    });
    this.formGroup.patchValue(this.info);
    let arr = [];
    arr.push({
      uid: '1',
      url: this.info.vedio,
      name: this.info.vedio,
      status: 'done'
    });
    this.files = arr;
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
  // @DrawerSave('/membermanage/clue/saveClue') save: () => void;
  saves(){
    if (this.formGroup.invalid) {
      Object.values(this.formGroup.controls).map((control: FormControl) => { control.markAsDirty(); control.updateValueAndValidity() });
    } else {
      this.saveLoading = true;
      Object.keys(this.formGroup.value).map(res => {
        if (this.formGroup.value[res] instanceof Date) {
          this.formGroup.value[res] = formatTime(this.formGroup.value[res]);
        }
      });
      let params = JSON.parse(JSON.stringify(this.formGroup.value));
      let urls = this.info.id ? '/course/updateCourse' : '/course/saveCourse';
      this.http.post(urls, {
        paramJson: JSON.stringify(params)
      }, true).then(res => {
        this.saveLoading = false;
        this.drawerRef.close(true);
      }).catch(err => this.saveLoading = false);
    }
    const formatTime = date => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return [year, month, day].map(formatNumber).join('-');
    }
  }

  addCustomer(){
    this.drawer.create({
      nzWidth: 720,
      nzTitle: '配置课程类别',
      nzBodyStyle: { 'padding-bottom': '53px' },
      nzContent: ImportComponent,
    }).afterClose.subscribe(res => {
      this.http.post('/course/listCourseType', { code: 1004 }).then(res => this.listCourseType = res.data.list);
    })
  }
  beforeUpload = (file: UploadFile): boolean => {
    this._validatorUploadFile(file);
    return false;
  }
  private _validatorUploadFile(file: UploadFile): Observable<any> {
    return new Observable(observer => {
      let fileType = file.name.split('.')[file.name.split('.').length - 1].toLowerCase();
        let fileName = new Date().getTime() + `.${fileType}`;
       let that = this;
        let ts:any =new Date();
        ts =  Date.parse(ts);
        var hash = Md5.hashStr(ts + 'eofKSp3rWfDReuv-8W1TO6HswE3y6sLQ');
        var sign = Md5.hashStr('6a1c747a3c' + ts);
        const videoUpload = new PlvVideoUpload();
        videoUpload.updateUserData({
          userid: 'ee54a08653' , // Polyv云点播账号的ID
          ptime: ts, // 时间戳，注意：系统时间不正确会导致校验失败
          sign: sign , // 是根据将secretkey和ts按照顺序拼凑起来的字符串进行MD5计算得到的值
          hash: hash , // 是根据将ts和writeToken按照顺序拼凑起来的字符串进行MD5计算得到的值
        });
        let fileSetting = { // 文件上传相关信息设置
          title: fileName,  // 标题
          desc: fileName,  // 描述
          cataid: 1,  // 上传分类目录ID
          tag: '',  // 标签
          luping: 0,  // 是否开启视频课件优化处理，对于上传录屏类视频清晰度有所优化：0为不开启，1为开启
          keepsource: 0  // 是否源文件播放（不对视频进行编码）：0为编码，1为不编码
        };
        this.isLoadingfile = true;
        var uploadManager = videoUpload.addFile(
          file, // file 为待上传的文件对象
          { 
            FileSucceed: function(uploadInfo) { // 文件上传成功回调
                setTimeout(res=>{
                  that.http.post('http://v.polyv.net/uc/services/rest', { 
                    method: 'getById',
                    readtoken: 'LzaUM91L2D-MksriDduWo-4B4athz6op',
                    vid: uploadInfo.fileData.vid
                  }).then(res => {
                    that.isLoadingfile = false;
                    that.formGroup.patchValue({ vedio: res.data[0].mp4 })
                    let arr = [];
                    arr.push({
                      uid: '1',
                      url: res.data[0].mp4,
                      name: res.data[0].mp4,
                      status: 'done'
                    });
                    that.files = arr;
                  });
                },3000);
            }
          },
          fileSetting
        );
        videoUpload.startAll();
      
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

    encodeUTF8(s) {
      var i, r = [], c, x;
      for (i = 0; i < s.length; i++)
        if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
        else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
        else {
          if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
            c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
              r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
          else r.push(0xE0 + (c >> 12 & 0xF));
          r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
        };
      return r;
    }
    
    // 字符串加密成 hex 字符串
    sha1(s) {
      var data = new Uint8Array(this.encodeUTF8(s))
      var i, j, t;
      var l = ((data.length + 8) >>> 6 << 4) + 16, s:any = new Uint8Array(l << 2);
      s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
      for (t = new DataView(s.buffer), i = 0; i < l; i++)s[i] = t.getUint32(i << 2);
      s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
      s[l - 1] = data.length << 3;
      var w = [], f = [
        function () { return m[1] & m[2] | ~m[1] & m[3]; },
        function () { return m[1] ^ m[2] ^ m[3]; },
        function () { return m[1] & m[2] | m[1] & m[3] | m[2] & m[3]; },
        function () { return m[1] ^ m[2] ^ m[3]; }
      ], rol = function (n, c) { return n << c | n >>> (32 - c); },
        k = [1518500249, 1859775393, -1894007588, -899497514],
        m = [1732584193, -271733879, null, null, -1009589776];
      m[2] = ~m[0], m[3] = ~m[1];
      for (i = 0; i < s.length; i += 16) {
        var o = m.slice(0);
        for (j = 0; j < 80; j++)
          w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
            t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
            m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
        for (j = 0; j < 5; j++)m[j] = m[j] + o[j] | 0;
      };
      t = new DataView(new Uint32Array(m).buffer);
      for (let i = 0; i < 5; i++)m[i] = t.getUint32(i << 2);
    
      var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
        return (e < 16 ? "0" : "") + e.toString(16);
      }).join("");
      return hex;
    }


}
const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month, day].map(formatNumber).join('-');
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
