import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import {  AuctionModel } from 'src/app/models/auction-model';
import { AdminService } from '../services/admin.service';
import {fileUtils} from './../../models/fileUtils';


@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.css']
})
export class AuctionsComponent implements OnInit {

  auctions:AuctionModel[];
  AllAuctions:AuctionModel[];
  selectedAuctions:AuctionModel[];
  search = '';
  aliveOrClose = true;
  editAuction:AuctionModel;
  showEditAuction: boolean;
  formData:FormData;
  fileUtil:fileUtils;
  addNewFlag:boolean;
  constructor(private admin: AdminService) { 
    this.editAuction = new AuctionModel();
    this.selectedAuctions = new Array<AuctionModel>();
    this.showEditAuction = false;
    this.fileUtil = new fileUtils();
    this.addNewFlag = false;
  }

  ngOnInit(): void {
    this.init();
   
  }
  init(){
    this.admin.getAllAuction().subscribe(Auctions=>{
      this.AllAuctions = Auctions.map(a=> new AuctionModel(a));
      this.auctions = this.AllAuctions.filter(item => { return !!item.status == this.aliveOrClose });;
    });
  }

  filterAliveOrClose($event) {
    this.aliveOrClose = $event;
    this.auctions = this.AllAuctions.filter(item=> item.status == this.aliveOrClose);
  }

  filterAuction($event:any){
    const val = $event.target.value.toLowerCase();
    this.auctions = this.AllAuctions.filter(item=>{
      return (new RegExp(val,'g').test(item.name.toLowerCase()) || new RegExp(val,'g').test(item.description.toLowerCase())) && item.status !== this.aliveOrClose;
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

  editItem(auction:AuctionModel){
    this.editAuction = auction;
    this.showEditAuction = true;
  }

  saveItem(){

    this.admin.updateAuction(this.editAuction).subscribe(res=>{
    
      this.admin.uploadImage(this.formData).subscribe(fileRes=>{
        this.admin.errorSubject.next(fileRes.msg);
      },fileErr=>{
        this.admin.errorSubject.next(fileErr.msg);
      });
    },err=>{
      this.admin.errorSubject.next(JSON.stringify(err));
    })
  }
  saveimg(){
    this.admin.uploadImage(this.formData).subscribe(fileRes=>{
      this.admin.errorSubject.next(fileRes.msg);
    },fileErr=>{
      this.admin.errorSubject.next(fileErr.msg);
    });
  }
  closeItem(){
    this.showEditAuction  = false;
    this.addNewFlag = false;
  }

  openNewAuction(){
    this.editAuction = new AuctionModel();
    this.addNewFlag = true;
  }

  setStatus($event){
    this.editAuction.status = !$event;
  }

  fileUploadEvent($event) {
    const files = $event.target.files as FileList;
    this.formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 3000000) {
        this.admin.errorSubject.next('file size exceeded the range');
        break;
      }
      switch (files[i].type) {
        case 'image/png':
        case 'image/jpeg':
        case 'image/gif':
          this.editAuction.previousImage = this.editAuction.imageFileName;
          this.editAuction.imageFileName = files[i].name+"."+this.fileUtil.getFileType(files[i].type);
          this.formData.append('file',files[i],this.editAuction.imageFileName);
          break;
        default:
          this.admin.errorSubject.next('only image format to upload');
      }
    }
  }

  selectItem(item:AuctionModel){
    item.selected = !item.selected;
    if(item.selected){
      this.selectedAuctions.push(item);
    }else{
      this.selectedAuctions = this.selectedAuctions.filter(select=>select._id!==item._id);
    }
    console.log(this.selectedAuctions);
  }

  deleteSelected(){
    if(this.selectedAuctions.length>0){
     const listOfRequests = this.selectedAuctions.map(item=>{ 
        return this.admin.deleteAuction(item._id);
      });
      forkJoin(listOfRequests).subscribe(res=>{
        console.log(res);
        this.admin.errorSubject.next(JSON.stringify(res));
        this.init();
        this.closeItem();
      },
      err=>{
        this.admin.errorSubject.next(JSON.stringify(err));
      }
      )
    }else{
      this.admin.errorSubject.next('No auction was selected');
    }
  }

  saveNewAuction(){
    if(this.editAuction.name && this.editAuction.endDate){
      
      this.admin.addNewAuction(this.editAuction).subscribe(res=>{
        console.log(res);
        this.admin.errorSubject.next(JSON.stringify(res));
        if(this.editAuction.imageFileName){
          this.saveimg();
        }
        
        this.init();
        this.closeItem();
      },
      err=>{
        this.admin.errorSubject.next(JSON.stringify(err));
      }
      )
    }
  }

  sendtoArcaiv(){
    if(this.selectedAuctions.length>0){
      const listOfRequests = this.selectedAuctions.map(item=>{ 
         return this.admin.AuctiontoArcaiv(item._id);
       });
       forkJoin(listOfRequests).subscribe(res=>{
         console.log(res);
         this.admin.errorSubject.next(JSON.stringify(res));
         this.init();
         this.closeItem();
       },
       err=>{
         this.admin.errorSubject.next(JSON.stringify(err));
       }
       )
     }else{
       this.admin.errorSubject.next('No auction was selected');
     }
  }
}
