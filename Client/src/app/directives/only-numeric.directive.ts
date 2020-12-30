import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumeric]'
})
export class OnlyNumericDirective {

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])
  keyDown($event: KeyboardEvent) {
    console.log($event.key, $event.keyCode, $event.returnValue);
    let reg = /^[0-9.]/g;
    let key = $event.key;
    return reg.test(key) || /(Delete)|(Backspace)/gs.test(key);
  }


}
