import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dynamic-content-two',
  templateUrl: './dynamic-content-two.component.html',
  styleUrls: ['./dynamic-content-two.component.scss'],
})
export class DynamicContentTwoComponent implements OnInit {
  @Input('id') id: string;
  @Output('change') change = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  testOutput() {
    this.change.emit(Math.random().toString());
  }
}
