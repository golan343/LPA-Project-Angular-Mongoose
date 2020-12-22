import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuctionModel } from 'src/app/models/auction-model';
import { environment } from 'src/environments/environment';
import { AuctionsService } from '../../services/auctions.service';

import { DialogService } from '../../ui/dialog.service';

@Component({
  selector: 'app-auction-item',
  templateUrl: './auction-item.component.html',
  styleUrls: ['./auction-item.component.css']
})
export class AuctionItemComponent implements OnInit {
  @Input()
  auction: AuctionModel;
  @Input()
  numberOfBids: number;
  @Input()
  numberOfproposal: number;
  constructor(private router: Router,

    private auctionService: AuctionsService,
    private dialogLocalsService: DialogService) { }

  ngOnInit(): void {

  }

  showAuction(_id: string): void {
    this.router.navigateByUrl('/auctions/' + _id);
  }

}
