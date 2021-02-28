import { Component, Input, OnInit, Output, ViewChild, EventEmitter, AfterViewInit, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-profile-image-setting',
  templateUrl: './profile-image-setting.component.html',
  styleUrls: ['./profile-image-setting.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProfileImageSettingComponent implements OnInit, OnChanges {

  constructor() { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.imgBase64.currentValue){
        this.btntext = "Change Icon";
        this.setImageOnCanvas();
      } else {
        this.btntext = "Add New";
    }
  }
  btntext: string;
  @Input()
  imgBase64: string;
  @Output()
  setImageEvent = new EventEmitter<string>()
  @Output()
  ErrorEvent = new EventEmitter<string>()
  fileName: string;
  @ViewChild('inputFile') fileUpload: any;
  @ViewChild('imgCanvas') imgCanvas: any;
  ngOnInit(): void {
    if(this.imgBase64){
      
      this.btntext = "Change Icon";
      this.setImageOnCanvas();
    } else {
      this.btntext = "Add New";
  }
  }
  setImageOnCanvas() {
    const context = this.imgCanvas.nativeElement.getContext('2d');
    const img = new Image();
    img.onload = (e) => {
      context.drawImage(img, 0, 0);
    };
    img.src = this.imgBase64;
  }
  fileUploadEvent($event) {
    const files = $event.target.files as FileList;
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 3000000) {
        this.ErrorEvent.emit("The File is too Large (over 3M)");
        break;
      }
      switch (files[i].type) {
        case 'image/png':
        case 'image/jpeg':
        case 'image/gif':
          this.fileName = files[i].name;
          const reader = new FileReader();
          reader.readAsDataURL(files[i]);
          reader.onload = this.setUploadFile.bind(this);
          reader.onerror = (err) => {
            console.log(err);
            // this.admin.errorSubject.next(JSON.stringify(err));
            this.ErrorEvent.emit("Erorr loading the File "+JSON.stringify(err));
          };
          break;
        default:
          this.ErrorEvent.emit('only image formats arw allowed to upload ' )
        // this.admin.errorSubject.next('only image format to upload');
      }
    }
  }
  triggerUplaod() {
    this.fileUpload.nativeElement.click();
  }
  setUploadFile(data) {
    this.imgBase64 = data.currentTarget.result;
    const context = this.imgCanvas.nativeElement.getContext('2d');
    context.clearRect(0, 0, this.imgCanvas.nativeElement.width, this.imgCanvas.nativeElement.height);
    const img = new Image();
    img.width = 100;
    img.height = 100;
    img.onload = (e) => {
      context.drawImage(img, 0, 0, 200, 100);
    };
    img.src = this.imgBase64;
    console.log('original' + this.imgBase64.length);
  }
  saveUserImage() {
    if (this.imgBase64) {
      // const context = this.imgCanvas.nativeElement.getContext('2d');
      const shrinkedImgBase64 = this.imgCanvas.nativeElement.toDataURL(
        'image/png'
      );
      if (shrinkedImgBase64) {
        this.setImageEvent.next(shrinkedImgBase64);
      }
    }
  }

}
