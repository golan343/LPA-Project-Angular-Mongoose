import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appPassword]'
})
export class PasswordDirective implements OnInit {

  constructor(private element: ElementRef<any>) {
    debugger;
  }
  ngOnInit(): void {

    this.element.nativeElement.addClass('eye');
  }

}
