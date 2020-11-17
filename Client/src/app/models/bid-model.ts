export class BidModel {
    public constructor(
        // tslint:disable-next-line: variable-name
        public _id?: string,
        public userId?: string,
        public auctionId?: string,
        public offer?: string,
        public date?: Date,
        ) { }
}
