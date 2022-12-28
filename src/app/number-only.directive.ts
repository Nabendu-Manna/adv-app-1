import { Directive, HostListener,  ElementRef } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {

  constructor() { }

  @HostListener('keypress', ['$event'])
  onKeypress(e: Event | undefined) {
    let event = e || window.event;
    if (event) {
      console.log(event);
      return this.isNumberKey(event);
    }
    return false;
  }

  isNumberKey(event: any) {
    let charCode = event.which ? event.which : event.keyCode;
    console.log(event.key);
    let key = parseInt(event.key);

    if (key >= 0 && key <=9) {
      return true;
    }

    return false;
  }

}
