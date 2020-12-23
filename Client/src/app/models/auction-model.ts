export class Auction {
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
}
export class AuctionModel extends Auction {
    public constructor(
        public siteId?: string,
        public ruleId?: string,
        public winPrice?: string,
        public youtubeId?: string,
        public bidPattern?: string,

    ) { super(); }
    createdBy: string;
}

