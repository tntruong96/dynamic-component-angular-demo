import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-content-one',
  templateUrl: './dynamic-content-one.component.html',
  styleUrls: ['./dynamic-content-one.component.scss'],
})
export class DynamicContentOneComponent implements OnInit {
  @Input('name') myName: string;
  constructor() {}

  ngOnInit(): void {}
}
