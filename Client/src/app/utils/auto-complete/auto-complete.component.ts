import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { autoComplete } from '../autoComplete';
import { UtilsService } from './../utils.service';
import { County } from './../autoComplete'
@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoCompleteComponent implements OnInit, OnChanges, OnDestroy {
  autoCopm$: Observable<autoComplete>;
  autoComplete: autoComplete;
  copiedList: Array<County>;
  @Output()
  hasbeenSelected = new EventEmitter<string>();
  @Input()
  value: string;
  current: County;
  constructor(private utilTool: UtilsService, private cdref: ChangeDetectorRef) { }
  ngOnDestroy(): void {
    window.removeEventListener('keyup', this.keydownEventListener);
  }

  @HostListener('window:keyup', ['$event'])
  keydownEventListener($event) {
    let el = document.querySelector('.current') as HTMLElement;
    // 
    if (el) {
      let topPos = el.offsetTop;
      el.scrollIntoView(true);
    }

    switch ($event.keyCode) {
      //up
      case 38: {
        this.autoComplete.goingUp();
        break;
      }
      //down
      case 40: {
        this.autoComplete.goingDown();
        break;
      }
      case 13: {
        this.select(this.autoComplete.current);
      }
    }
  }
  ngOnInit(): void {
    if (!this.autoComplete) {
      this.autoCopm$ = this.utilTool.getCountries();
      this.autoCopm$.subscribe(auto => {
        this.autoComplete = auto;
      },
        error => {
          console.log(error);
        });
    }

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      if (changes.value.currentValue && !this.autoComplete) {
        this.autoComplete.filterdListEvent(changes.value.currentValue);
        this.cdref.detectChanges();
        this.autoComplete.open();
      }
    }

  }
  select(item: County) {
    this.hasbeenSelected.next(item.name);
    this.autoComplete.close();
  }

}
