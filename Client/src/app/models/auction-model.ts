export class Auction {
    constructor(){
    }
    bidPrice: string;
    bidsCount: number;
    createdDate: Date;
    description: string;
    endDate: string;
    imageFileName: string;
    maxOffer: number;
    minOffer: number;
    name: string;
    price: string;
    startDate: string;
    status: boolean;
    totalBids: number;
    _id: string;
    youtubeId: string;
}
export class AuctionModel extends Auction {
    public constructor(
        public siteId?: string,
        public ruleId?: string,
        public winPrice?: string,
        public winnerYoutubeId?: string,
        public bidPattern?: string,

    ) { super(); }
    createdBy: string;
}

