import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { AccountService } from 'src/app/services/account.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  constructor(private account: AccountService, private admin:AdminService) { }
  @Input()
  user: UserModel;
  old: string;
  password: string;
  smsNotification: boolean;
  emailNotification: boolean;
  imgBase64:string;
  fileName:string;
  @ViewChild('inputFile') fileUpload:any;
  @ViewChild('imgCanvas') imgCanvas:any;
  ngOnInit(): void {
    this.user = this.account.getUser();
    
  }
  chooseSms($event) {
    console.log($event);
    this.smsNotification = $event;
  }
  chooseEmail($event) {
    console.log($event);
    this.emailNotification = $event;
  }
  fileUploadEvent($event){
    const files = $event.target.files as FileList;
    for(let i=0; i<files.length; i++){
      if(files[i].size> 3000000){
        this.admin.errorSubject.next("file size exceeded the range");
        break;
      }
      switch (files[i].type) {
        case "image/png":
        case "image/jpeg":
        case "image/gif":
          this.fileName = files[i].name;
          const reader = new FileReader();
          reader.readAsDataURL(files[i]);
          reader.onload = this.setUploadFile.bind(this);
          reader.onerror = (err)=>{
          console.log(err);
          this.admin.errorSubject.next(JSON.stringify(err));
        };
        break;
        default:
        this.admin.errorSubject.next("only image format to upload");
        }
    }
  }
  triggerUplaod(){
    this.fileUpload.nativeElement.click();
  }
  setUploadFile(data){
    console.log(data.currentTarget.result);
    this.imgBase64 = data.currentTarget.result;
    const context = this.imgCanvas.nativeElement.getContext('2d');
    const img = new Image();
    img.width = 100;
    img.height = 100;
    img.onload = (e)=>{
      context.drawImage(img,0,0,300,100);
    }
    img.src = this.imgBase64;
    console.log('original'+this.imgBase64.length);
    
  }
  saveUserImage(){
    if(this.imgBase64){
      debugger;
      const context = this.imgCanvas.nativeElement.getContext('2d');
      const shrinkedImgBase64 = this.imgCanvas.nativeElement.toDataURL("image/png");
      console.log('shrinked'+shrinkedImgBase64.length);
     
      if(shrinkedImgBase64){
        this.admin.saveUserImage(this.user._id,shrinkedImgBase64).subscribe(result=>{
          this.admin.errorSubject.next(result.msg);
        },err=>{
          console.log(err);
        })
      }
      
    }
  }
  saveChanges() {
    
  }

}
