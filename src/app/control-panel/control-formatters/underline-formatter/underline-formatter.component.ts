import { Component, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormatterService } from '../../../services/formatter/formatter.service';
import { FormattersInterface } from '../../formatters.interface';

@Component({
  selector: 'app-underline-formatter',
  templateUrl: './underline-formatter.component.html',
  styleUrls: ['./underline-formatter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnderlineFormatterComponent implements AfterViewInit, FormattersInterface, OnDestroy {

  isApplied = false;
  subscription: Subscription;

  constructor(
    private formatterService: FormatterService,
    private ref: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    this.subscription = this.formatterService.formatterDeselect.subscribe(
      () => {
        this.checkApplied();
        this.ref.detectChanges();
      }
    );
  }

  applyFormatter(): void {
    document.execCommand('underline');
  }

  checkApplied(): void {
    this.isApplied = document.queryCommandState('underline');
  }

  formatText(): void {
    this.applyFormatter();
    this.checkApplied();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
