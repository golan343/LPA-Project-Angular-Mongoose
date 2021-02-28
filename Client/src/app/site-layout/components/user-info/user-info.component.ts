import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AccountService } from './../../../services/account.service';
import { DialogService } from './../../../ui/dialog.service';
import { errorModel,  UserImageRespone,  UserModel, validationConstrains } from './../../../models/user-model';
import { DialogData } from 'src/app/ui/model/dialog-data';
import {  Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent implements   OnDestroy, AfterViewInit  {
  imgSubscriber = new Subscription();
  constructor(private account: AccountService, private dialog: DialogService) {
    this.user = this.account.getUser();
   }

  
  @Input()
  user: UserModel;
  old: string;
  password: string;
  smsNotification: boolean;
  emailNotification: boolean;
  //UserImage$:Observable<UserImageRespone>;
  imgBase64image: string;
  filrErrorMsg: string;
  fileName: string;
  error = new errorModel();
  @ViewChild('inputFile') fileUpload: any;
  @ViewChild('imgCanvas') imgCanvas: any;
  
   
  ngAfterViewInit(): void {
    if(this.user){
      this.imgSubscriber = this.account.getUserIcon(this.user._id).subscribe(result=>{
        console.log(result);
        if (result.base64StringImg) {
           // this.imageFromData = result.base64StringImg;
            this.imgBase64image = result.base64StringImg;
        }
      },
      err=>{
        this.error.email = JSON.stringify(err);
      });
    }
  }
  ngOnDestroy(): void {
    this.imgSubscriber.unsubscribe();
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
  saveUserImage($event) {

    
      if ($event) {
        const shrinkedImgBase64 = $event;

        this.account.saveUserImage(this.user._id, shrinkedImgBase64).subscribe(
          (result) => {
            // this.imageFromData = shrinkedImgBase64;
            // debugger;
            sessionStorage.setItem('userImage',shrinkedImgBase64);
            
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
  setFileUploadError($event){
    console.log($event);
    this.filrErrorMsg = $event;
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
