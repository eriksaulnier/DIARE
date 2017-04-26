import { Directive ,ElementRef, Input  } from '@angular/core';

@Directive({
  selector: '[BulletFocus]'
})
export class BulletFocusDirective {
	
   constructor(private el: ElementRef) {
       
    }

    ngOnInit() {
    
      this.el.nativeElement.focus();
  }
}
