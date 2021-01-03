export class Pagination {
    constructor(sliceAmount?: number, length?: number) {
        this.sliceAmount = sliceAmount;
        this.listLength = length;
        this.phase = 1;
        this.start = 0;
        this.end = sliceAmount;
        if (this.sliceAmount) {
            this.maxPhase = Math.ceil(this.listLength / this.sliceAmount);
        }

    }
    sliceAmount: number;
    listLength: number;
    phase: number;
    maxPhase: number;
    start: number;
    end: number;
    next() {

        if (this.phase < this.maxPhase) {
            this.start = this.phase === this.maxPhase ? this.start : this.phase * this.sliceAmount;
            this.phase = this.phase !== this.maxPhase ? this.phase + 1 : this.phase;
            this.end = this.phase == this.maxPhase ? this.listLength : this.phase * this.sliceAmount;
            console.log('next', this.start, this.end, 'phase', this);
        }

    }
    prev() {
        if (this.phase === 1) {
            this.end = this.phase * this.sliceAmount;
            this.start = 0;
            return;
        }
        if (this.phase > 1) {
            this.end = this.phase * this.sliceAmount;
            this.phase--;
            this.start = this.phase * this.sliceAmount;
            console.log('prev', this.start, this.end, 'phase', this);
        }

    }
}
