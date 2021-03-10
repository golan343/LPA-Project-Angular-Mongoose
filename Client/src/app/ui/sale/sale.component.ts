import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  @Input()
  details:any;
  @Output()
  closeEvent = new EventEmitter();
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  directToAuction(id){
    this.closeEvent.next();
    this.router.navigate(['/auction/'+this.details._id])
  }
}
