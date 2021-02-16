import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  fileName:string;
  imgBase64:string;
  canvas:HTMLCanvasElement;
  imageFromData = false;
  constructor() { }
  fileUploadEvent($event) {
    const files = $event.target.files as FileList;
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 3000000) {
        return 'file size exceeded the range';
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
          };
          break;
        default:
          return 'only image format to upload';
      }
    }
  }
  setUploadFile(data:any) {
    debugger;
    this.imgBase64 = data.currentTarget.result;
    const context = this.canvas.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const img = new Image();
    img.width = 100;
    img.height = 100;
    img.onload = (e) => {
      context.drawImage(img, 0, 0, 200, 100);
    };
    img.src = this.imgBase64;
    this.imageFromData = true;

  }
  saveUserImage(id:string) {
    if (this.imgBase64) {
      return this.canvas.toDataURL(
        'image/png'
      );
  }
  
  }
  setImageOnCanvas(src:string){
   // this.canvas = document.createElement('canvas');
    const context = this.canvas.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const img = new Image();
    img.onload = (e) => {
      context.drawImage(img, 0, 0);
    };
    img.src = src;
  }
  clear(){
    const context = this.canvas.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.fileName = '';
    this.imgBase64 = '';
    this.imageFromData = false;    
  }
}
