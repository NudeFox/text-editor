import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {
  formatterTrigger = new Subject<Selection>();

  constructor() { }
}
