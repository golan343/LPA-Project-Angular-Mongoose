import { Component, OnInit } from '@angular/core';
import { Auction } from 'src/app/models/auction-model';
import { AdminService } from '../services/admin.service';
import {fileUtils} from './../../models/fileUtils';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.css']
})
export class AuctionsComponent implements OnInit {

  auctions:Auction[];
  AllAuctions:Auction[];
  search = '';
  aliveOrClose = false;
  editAuction:Auction;
  showEditAuction: boolean;
  formData:FormData;
  fileUtil:fileUtils;
  constructor(private admin: AdminService) { 
    this.editAuction = new Auction();
    this.showEditAuction = false;
    this.fileUtil = new fileUtils();
  }

  ngOnInit(): void {
     this.admin.getAllAuction().subscribe(Auctions=>{
       this.AllAuctions = Auctions;
       this.auctions = Auctions.filter(item => { return item.status !== this.aliveOrClose });;
     });
   
  }
  filterAliveOrClose($event) {
    this.aliveOrClose = $event;
    this.auctions = this.AllAuctions.filter(item=>item.status !== this.aliveOrClose);
  }
  filterAuction($event:any){
    console.log($event.target.value);
    const val = $event.target.value;
    this.auctions = this.AllAuctions.filter(item=>{
      return (new RegExp(val,'g').test(item.name) || new RegExp(val,'g').test(item.description)) && item.status !== this.aliveOrClose;
    })
  }
  auctionsToCsv(){
    const keys = ['name','startDate','endDate','price','description','minOffer','bidPrice','totalBids', 'bidCount'];
    let csv = keys.join(',')+'\n';
    this.auctions.forEach((item)=>{
      keys.forEach(keyItem=>{
        csv += item[keyItem]+',';
      });
      csv = csv.substr(0,csv.length-1)+'\n';
      });
    let base64EncodeAuctions = btoa(csv);
    console.log(base64EncodeAuctions);
    base64EncodeAuctions = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,'+base64EncodeAuctions;
    window.open(base64EncodeAuctions);
  }
  editItem(auction:Auction){
    this.editAuction = auction;
    this.showEditAuction = true;
  }
  saveItem(){
    this.admin.updateAuction(this.editAuction).subscribe(res=>{
    
      this.admin.uploadImage(this.formData).subscribe(fileRes=>{
        this.admin.errorSubject.next(res.msg);
        console.log(fileRes);
      },fileErr=>{
        this.admin.errorSubject.next(fileErr.msg);
      });
    },err=>{
      this.admin.errorSubject.next(JSON.stringify(err));
    })
  }
  closeItem(auction:Auction){
    this.showEditAuction  = false;
  }
  openNewAuction(){
    this.editAuction = new Auction();
    this.showEditAuction = true;
  }
  setStatus($event){
    this.editAuction.status = $event;
  }
  fileUploadEvent($event) {
    const files = $event.target.files as FileList;
    this.formData = new FormData();
    debugger;
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 3000000) {
        this.admin.errorSubject.next('file size exceeded the range');
        break;
      }
      switch (files[i].type) {
        case 'image/png':
        case 'image/jpeg':
        case 'image/gif':
          this.editAuction.imageFileName = files[i].name+"."+this.fileUtil.getFileType(files[i].type);
          this.formData.append('file',files[i],this.editAuction.imageFileName);
          break;
        default:
          this.admin.errorSubject.next('only image format to upload');
      }
    }
  }
}
