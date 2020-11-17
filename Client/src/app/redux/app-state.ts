import { AuctionModel } from './../models/auction-model';

export class AppState {

    public auctions: AuctionModel[];

    public constructor() {
        this.auctions = [];
    }

}

