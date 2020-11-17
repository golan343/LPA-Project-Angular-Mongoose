import { BidModel } from './../models/bid-model';
import { AuctionModel } from './../models/auction-model';

export class AppState {

    public auctions: AuctionModel[];
    public bids: BidModel[];

    public constructor() {
        this.auctions = [];
        this.bids = [];
    }

}

