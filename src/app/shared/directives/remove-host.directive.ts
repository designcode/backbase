import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appBankRemoveHost]'
})
export class RemoveHostDirective implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    const nativeElement: HTMLElement = this.el.nativeElement;
    const parentElement: HTMLElement = nativeElement.parentElement as HTMLElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
        parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);
  }

}
