import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AccountService } from './../../../services/account.service';
import { DialogService } from './../../../ui/dialog.service';
import { errorModel, UserImageRespone, UserModel, validationConstrains } from './../../../models/user-model';
import { DialogData } from 'src/app/ui/model/dialog-data';
import { ResourceLoader } from '@angular/compiler';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, AfterViewInit {
  imgObserver$:Observable<UserImageRespone>;
  constructor(private account: AccountService, private dialog: DialogService) { }

  @Input()
  user: UserModel;
  old: string;
  password: string;
  smsNotification: boolean;
  emailNotification: boolean;
  imgBase64: string;
  imageFromData: string;
  fileName: string;
  error = new errorModel();
  @ViewChild('inputFile') fileUpload: any;
  @ViewChild('imgCanvas') imgCanvas: any;
  ngOnInit(): void {
    
    const user = sessionStorage.getItem('user');
    if(user){
      this.user = (JSON.parse(sessionStorage.getItem('user')) as UserModel);
      this.imgObserver$ = this.account.getUserIcon(this.user._id);
    }
  }
  ngAfterViewInit(): void {
    this.imgObserver$.subscribe(result=>{
      if (result.base64StringImg) {
          this.setImageOnCanvas(result.base64StringImg);
      }
    },
    err=>{
      this.error.email = JSON.stringify(err);
    });
  }  
  setImageOnCanvas(base64:string){
    const context = this.imgCanvas.nativeElement.getContext('2d');
    const img = new Image();
    img.onload = (e) => {
      context.drawImage(img, 0, 0);
    };
    img.src = base64;
  }
  async resetPass() {
    if (this.password && this.old && this.user) {
      const result = await this.account.changePassword(this.user._id, this.old, this.password);
      if (result) {
        const dialog = new DialogData();
        dialog.title = ''
        this.dialog.subjectType.next(dialog);
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
        // this.admin.errorSubject.next('file size exceeded the range');
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
          };
          break;
        default:
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
        this.account.saveUserImage(this.user._id, shrinkedImgBase64).subscribe(
          (result) => {
            this.imageFromData = shrinkedImgBase64;
            debugger;
            sessionStorage.setItem('userImage',shrinkedImgBase64);
            this.account.getUserIcon(this.user._id);
            console.log(result);
           // this.admin.errorSubject.next(result.msg);
          },
          (err) => {
            console.log(err);
            //this.admin.errorSubject.next(err.msg);
          }
        );
      }
    }
  }
  saveChanges() {
    const ValidationRequiArray = [new validationConstrains({ prop: 'firstName', content: this.user.firstName, isReqire: true, errorMsg: 'first Name is missing' })
      , new validationConstrains({ prop: 'lastName', content: this.user.lastName, isReqire: true, errorMsg: 'Last Name is missing' })
      , new validationConstrains({ prop: 'country', content: this.user.country, isReqire: true, errorMsg: 'country Name is missing' })
      , new validationConstrains({ prop: 'city', content: this.user.city, isReqire: true, errorMsg: 'city Name is missing' })
      , new validationConstrains({ prop: 'street', content: this.user.street, isReqire: true, errorMsg: 'street Name is missing' })];
      const vliatedArray = ValidationRequiArray.map(item=>this.error.validate(item));
      console.log(vliatedArray);
      return;
    this.account.editUser(this.user).subscribe(result => {
      // this.admin.errorSubject.next('The user has been updated successfuly!');
    },
      err => {
        console.log(err);

        // this.admin.errorSubject.next('The user was not change!' + JSON.stringify(err));
      }
    )
  }


}
