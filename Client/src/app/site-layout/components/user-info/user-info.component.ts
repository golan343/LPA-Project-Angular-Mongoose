import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AccountService } from './../../../services/account.service';
import { DialogService } from './../../../ui/dialog.service';
import { errorModel, UserModel, validationConstrains } from './../../../models/user-model';
import { DialogData } from 'src/app/ui/model/dialog-data';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent implements OnDestroy, OnInit {
  imgSubscriber = new Subscription();
  constructor(private account: AccountService, private dialog: DialogService, private cdr: ChangeDetectorRef) {
    this.user = this.account.getUser();
  }
  ngOnInit(): void {
 
      this.imgSubscriber = this.account.currentUserIconSubject.subscribe(base64StringImg => {
        if (base64StringImg) {
          this.cdr.detectChanges();
          this.imgBase64image = base64StringImg;
        }
      },
        err => {
          console.log(err);
          this.error.email = JSON.stringify(err);
        });
  }


  @Input()
  user: UserModel;
  old: string;
  password: string;
  smsNotification: boolean;
  emailNotification: boolean;
  imgBase64image: string;
  fileErrorMsg: string;
  fileName: string;
  error = new errorModel();
  @ViewChild('inputFile') fileUpload: any;
  @ViewChild('imgCanvas') imgCanvas: any;

  ngAfterViewInit(): void {
   
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
          sessionStorage.setItem('userImage', shrinkedImgBase64);
          this.account.currentUserIconSubject.next(shrinkedImgBase64);
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
  setFileUploadError($event) {
    this.fileErrorMsg = $event;
  }
  saveChanges() {
    const ValidationRequiArray = [new validationConstrains({ prop: 'firstName', content: this.user.firstName, isReqire: true, errorMsg: 'first Name is missing' })
      , new validationConstrains({ prop: 'lastName', content: this.user.lastName, isReqire: true, errorMsg: 'Last Name is missing' })
      , new validationConstrains({ prop: 'country', content: this.user.country, isReqire: true, errorMsg: 'country Name is missing' })
      , new validationConstrains({ prop: 'city', content: this.user.city, isReqire: true, errorMsg: 'city Name is missing' })
      , new validationConstrains({ prop: 'street', content: this.user.street, isReqire: true, errorMsg: 'street Name is missing' })];
    const vliatedArray = ValidationRequiArray.map(item => this.error.validate(item));
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
