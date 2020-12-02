import { BaseUrl } from './../../../environments/environment';
import { AuctionsService } from './../../services/auctions.service';
import { AuctionModel } from './../../models/auction-model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import Swal from 'sweetalert2';
import { combineAll } from 'rxjs/operators';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {
  public auction = new AuctionModel();
  public imageName: string;
  public newAuction: FormGroup;
  constructor(private http: HttpClient,
              private auctionService: AuctionsService,
              private myFormBuilder: FormBuilder,
              private accountService: AccountService) { }

  ngOnInit(): void {
    this.newAuction = this.myFormBuilder.group({
      nameControl: ['', Validators.required, Validators.minLength],
      priceControl: ['', Validators.required],
      descriptionControl: ['', Validators.required],
      startDateControl: ['', Validators.required],
      endDateControl: ['', Validators.required],
      bidPriceControl: ['', Validators.required],
      minOfferControl: ['', Validators.required],
      maxOfferControl: ['', ],
      imageInputControl: ['', Validators.required]
    });
  }


  // tslint:disable-next-line: typedef
  public async addAuction() {
    try{
      if (this.newAuction.invalid){
        return;
      }
      this.auction.name = this.newAuction.value.nameControl;
      this.auction.price = this.newAuction.value.priceControl;
      this.auction.description = this.newAuction.value.descriptionControl;
      this.auction.startDate = this.newAuction.value.startDateControl;
      this.auction.endDate = this.newAuction.value.endDateControl;
      this.auction.bidPrice = this.newAuction.value.bidPriceControl;
      this.auction.minOffer = this.newAuction.value.minOfferControl;
      this.auction.maxOffer = this.newAuction.value.maxOfferControl;
      this.auction.createdBy = this.accountService.getUserId();
      this.auction.imageFileName = this.imageName;
      this.auction.createdDate = new Date().toLocaleString();
      console.log(this.auction);
      // await this.auctionService.addAuctionToServer(this.auction);
      Swal.fire('You are logged in', '', 'success');
    }
    catch (err){
      alert(err.message);
    }
  }

  // tslint:disable-next-line: typedef
  onFileSelected(event) {
    const image = event.target.files[0];
    const imageName = image.name;
    const fd = new FormData();
    const extension = imageName.substr(imageName.lastIndexOf('.'));
    const imageNewName = uuid() + extension;
    this.imageName = imageNewName;
    fd.append('image', image, imageNewName);

    this.http.post(`${BaseUrl}api/upload-image`, fd)
      .subscribe(
        res => {
          console.log(res);
          // this.alertService.success('image uploaded!');
        },
        err => {
          console.log(err);
          // this.alertService.danger('format is not valid! try jpg/png format');
        }
      );
  }

}
