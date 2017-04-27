import { Directive ,ElementRef, Input  } from '@angular/core';

@Directive({
  selector: '[BulletFocus]'
})
export class BulletFocusDirective {
	//Directive to have the element focus after construction
   constructor(private el: ElementRef) {
       
    }

    ngOnInit() {
    
      this.el.nativeElement.focus();
  }
}
