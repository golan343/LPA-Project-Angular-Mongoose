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
  }


  // tslint:disable-next-line: typedef
  public async addAuction() {
    try{
      if (this.newAuction.invalid){
        return;
      }
      this.auction.createdBy = this.accountService.getUserId();
      this.auction.imageFileName = this.imageName;
      this.auction.createdDate = new Date();
      console.log(this.auction);
      // await this.auctionService.addAuctionToServer(this.auction);
      Swal.fire('auction added!', '', 'success');
    }
    catch (err){
      alert(err.message);
    }
  }

  // tslint:disable-next-line: typedef
  async onFileSelected(event) {
    const image = event.target.files[0];
    const imageName = image.name;
    const fd = new FormData();
    const extension = imageName.substr(imageName.lastIndexOf('.'));
    const imageNewName = uuid() + extension;
    this.imageName = imageNewName;
    fd.append('image', image, imageNewName);

    await this.http.post(`${BaseUrl}api/upload-image`, fd)
      .subscribe(
        res => {
          console.log(res);
          Swal.fire('uploaded image!', '', 'success');
        },
        err => {
          console.log(err);
        }
      );
  }

}
