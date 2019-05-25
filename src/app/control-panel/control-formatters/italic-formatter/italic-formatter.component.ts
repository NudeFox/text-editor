import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-italic-formatter',
  templateUrl: './italic-formatter.component.html',
  styleUrls: ['./italic-formatter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItalicFormatterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
