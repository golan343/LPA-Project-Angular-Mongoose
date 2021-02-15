import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnChanges {
  monthName: string;
  year: number;
  month: number;
  DaysInAweek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(item=>item.substr(0,2));
  monthes = ["January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October", "November", "December"];
  daysOftheMonth: Array<Day>;
  start: Date;
  end: Date;
  @Input()
  public show:boolean;
  @Output()
  triggerdategap = new EventEmitter<{start:Date,end:Date}>(null);
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
    this.show = false;
    const date = new Date();
    this.month = date.getMonth();
    this.year = date.getFullYear();
    this.daysOftheMonth = new Array<Day>()
    this.init();
  }
  init() {
    this.daysOftheMonth = new Array<Day>();
    let dayInMonth = 1,
      cubeCounter = 1;
    this.monthName = this.monthes[this.month];
    while (dayInMonth <= 31) {
      let d = new Date(this.year, this.month, dayInMonth);
      if (dayInMonth === 1) {
        let dayinTheweek = d.getDay();
        while (cubeCounter <= dayinTheweek) {
          let dOb = {
            day: '',
            today: false
          } as Day;
          this.daysOftheMonth.push(dOb);
          cubeCounter++;
        }
      } else {
        cubeCounter++;
      }

      if (this.month !== d.getMonth()) {
        break;
      }

      let today = new Date();
      let dOb = {
        key: cubeCounter,
        d,
        day: d.getDate() + '',
        today:
          today.getMonth() === d.getMonth() &&
          today.getDate() === d.getDate() &&
          today.getFullYear() === d.getFullYear(),
      } as Day;
      if (this.start && this.end) {
        if (d.getTime() >= this.start.getTime() && d.getTime() <= this.end.getTime()) {
          dOb.selected = true;
        }
      }

      this.daysOftheMonth.push(dOb);
      dayInMonth++;
    }
  }
  nextMonth() {
    if (this.month === 11) {
      this.month = 0;
    } else {
      this.month += 1;
    }
    this.init();
  }
  prevMonth() {
    if (this.month === 0) {
      this.month = 11;
    } else {
      this.month -= 1;
    }
    this.init();
  }
  nextYear() {
    this.year += 1;
    this.init();
  }
  prevYear() {
    this.year -= 1;
    this.init();
  }
  clear(){
    this.start = null;
    this.end = null;
    this.daysOftheMonth.forEach(item => {
      item.selected = false;
    });
    this.triggerdategap.next(null);
  }
  selectDay(day: Day) {
    if (!this.start) {
      day.selected = !day.selected;
      this.start = day.selected ? day.d : null;
      return;
    } else if (this.start.getTime() > day.d.getTime()) {
      this.end = null;
      this.daysOftheMonth.forEach(item => {
        item.selected = day !== item ? false : true;
      });
      this.start = day.d;
      return;
    }
    if (this.start.getTime() < day.d.getTime() && !this.end) {
      day.selected = !day.selected;
      this.end = day.selected ? day.d : null;
      this.daysOftheMonth.forEach(item => {
        if (item.d) {
          if (item.d.getTime() >= this.start.getTime() && item.d.getTime() <= this.end.getTime()) {
            item.selected = true;
          }
        }
      });
      
    }
    if (this.end.getTime() < day.d.getTime()) {
      day.selected = !day.selected;
      this.end = day.selected ? day.d : null;
      this.daysOftheMonth.forEach(item => {
        if (item.d) {
          if (item.d.getTime() >= this.start.getTime() && item.d.getTime() <= this.end.getTime()) {
            item.selected = true;
          }
        }

      });
    }
    if(this.end){
      this.triggerdategap.next({start:this.start,end:this.end});
    }
  }


}

export class Day {
  key: number;
  d: Date;
  day: string;
  today: boolean;
  selected: boolean;
}