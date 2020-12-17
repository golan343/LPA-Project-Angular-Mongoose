import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollPosition]'
})
export class ScrollPositionDirective {

  constructor(private el: ElementRef) {
    console.log(el);
  }


}
