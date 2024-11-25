import { Directive, ElementRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appStatusHighlight]',
  standalone: true,
})
export class StatusHighlightDirective {
  @Input() appStatusHighlight!: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    switch (this.appStatusHighlight) {
      case 'To Do':
        this.el.nativeElement.style.color = 'red';
        this.el.nativeElement.borderColor = 'red';
        break;
      case 'In Progress':
        this.el.nativeElement.style.color = 'yellow';
        this.el.nativeElement.borderColor = 'yellow';
        break;
      case 'Done':
        this.el.nativeElement.style.color = 'green';
        this.el.nativeElement.borderColor = 'green';
        break;
    }
  }
}
