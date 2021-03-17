import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { phoneCode } from '../model/phoneCode';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-phones-code',
  templateUrl: './phones-code.component.html',
  styleUrls: ['./phones-code.component.css']
})
export class PhonesCodeComponent implements OnInit, OnDestroy {
  codes:phoneCode[];
  codesInital:phoneCode[];
  initSubscribtion = new Subscription();
  @Output()
  popOptionUp = new EventEmitter();
  constructor(private infoData:UtilsService) { }
  ngOnDestroy(): void {
   if(this.initSubscribtion)
      this.initSubscribtion.unsubscribe();
  }

  ngOnInit(): void {
   this.initSubscribtion =  this.infoData.getPhonesCode().subscribe(codes=>{
      this.codes = codes;
    });
  }
  popUpOptionEvent($event){

  }

}
class LinkListNode{
  value:number;
  next:any;
  constructor(num:number, next:any){
    this.value = num;
    this.next = next;
  }
}
class LinkList{
  head: any;
  length: number;
  constructor(){
    this.head = null;
    this.length = 0;
  }
  insert(num:number){
    const newNode = new LinkListNode(num, this.head);
    this.head = newNode;
    this.length ++;
  }
  find(num:number){
    let first = this.head;
    while(first.data != num || first != null ){
      first = first.next;
    }
    return first;
  }
  getByIndex(index){
    if(index>=0 || index>=this.length) return null;
    let counter = 0;
    while(index<=counter){
    }
  }

}
