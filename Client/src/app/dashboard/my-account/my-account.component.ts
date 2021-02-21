import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { AccountService } from 'src/app/services/account.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent implements OnInit {
  constructor(private account: AccountService, private admin: AdminService) {}
  @Input()
  user: UserModel;
  old: string;
  password: string;
  smsNotification: boolean;
  emailNotification: boolean;
  imgBase64: string;
  imageFromData:string;
  fileName: string;
  @ViewChild('inputFile') fileUpload: any;
  @ViewChild('imgCanvas') imgCanvas: any;
  ngOnInit(): void {
    const user = sessionStorage.getItem('user');
    this.user = user
      ? (JSON.parse(sessionStorage.getItem('user')) as UserModel)
      : (this.account.getUser() as UserModel);
    this.admin.getUserImage(this.user._id).subscribe((result) => {
      if(result.img){
        this.imageFromData = result.img;
        const context = this.imgCanvas.nativeElement.getContext('2d');
        const img = new Image();
        img.onload = (e) => {
          context.drawImage(img, 0, 0);
        };
        img.src = result.img;
      }else{
        this.admin.errorSubject.next('this user has no own pic');
      }
      
    });
  }
  ngAfterViewInit() {
   
  }
  async resetPass(){
    if(this.password && this.old && this.user){
      const result = await this.admin.resetPassword(this.user._id,this.old,this.password);
      if(result){
        this.admin.errorSubject.next(result.msg);
      }
    }

  }
  chooseSms($event) {
    this.smsNotification = $event;
  }
  chooseEmail($event) {
    this.emailNotification = $event;
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
        this.admin.saveUserImage(this.user._id, shrinkedImgBase64).subscribe(
          (result) => {
            this.imageFromData = shrinkedImgBase64;
            this.admin.errorSubject.next(result.msg);
          },
          (err) => {
            console.log(err);
            this.admin.errorSubject.next(err.msg);
          }
        );
      }
    }
  }
  saveChanges() {
    this.admin.editUser(this.user).subscribe(result=>{
      this.admin.errorSubject.next('The user has been updated successfuly!');
    },
    err=>{
      console.log(err);
      this.admin.errorSubject.next('The user was not change!'+JSON.stringify(err));
    }
    )
  }
}
