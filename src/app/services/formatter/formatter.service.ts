import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {
  formatterDeselect = new Subject<any>();

  constructor() { }
}
