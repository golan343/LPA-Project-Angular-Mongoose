import { BaseUrl } from './../../../environments/environment';
import { AuctionsService } from './../../services/auctions.service';
import { AuctionModel } from './../../models/auction-model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {
  public auction = new AuctionModel();
  public imageName: string;

  constructor(private http: HttpClient, private auctionService: AuctionsService) { }

  ngOnInit(): void {
  }


  // tslint:disable-next-line: typedef
  public async addAuction() {
    try{
      this.auction.imageFileName = this.imageName;
      this.auction.createdDate = new Date().toLocaleString();
      await this.auctionService.addAuctionToServer(this.auction);
      alert('done');
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
