import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-global-settings',
  templateUrl: './global-settings.component.html',
  styleUrls: ['./global-settings.component.css']
})
export class GlobalSettingsComponent implements OnInit {
  imgBase64: string;
  imageFromData:string;
  fileName: string;
  smsNotification: boolean;
  emailNotification: boolean;
  @ViewChild('inputFile') fileUpload: any;
  @ViewChild('imgCanvas') imgCanvas: any;
  constructor(private admin:AdminService) { }

  ngOnInit(): void {
  }
  fileUploadEvent($event) {
    const files = $event.target.files as FileList;
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 3000000) {
        this.admin.errorSubject.next('file size exceeded the range');
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
            this.admin.errorSubject.next(JSON.stringify(err));
          };
          break;
        default:
          this.admin.errorSubject.next('only image format to upload');
      }
    }
  }
  chooseSms($event) {
    this.smsNotification = $event;
  }
  chooseEmail($event) {
    this.emailNotification = $event;
  }
  triggerUplaod() {
    this.fileUpload.nativeElement.click();
  }
  setUploadFile(data) {
    console.log(data.currentTarget.result);
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
  
    
  }
}
