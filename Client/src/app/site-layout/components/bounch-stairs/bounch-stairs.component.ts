import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bounch-stairs',
  templateUrl: './bounch-stairs.component.html',
  styleUrls: ['./bounch-stairs.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class BounchStairsComponent implements OnInit {
  bidsRange = new Array<string>();
  notAllowed = new Array<string>();
  @Input()
  bidBounce: string;
  constructor() { }

  ngOnInit(): void {
    if (this.bidBounce) {
      let decimal = 1;
      let bidBounce = parseFloat(this.bidBounce);
      while (bidBounce / decimal < 1) { decimal /= 10; }
      for (let i = 1; i <= 4; i++) {
        let val = i * bidBounce;
        this.bidsRange.push(val.toFixed(2));
        this.notAllowed.push((bidBounce + (i * decimal)).toFixed(2));
      }
      this.notAllowed.push((bidBounce + 5 * decimal).toFixed(2));
    }

  }

}
