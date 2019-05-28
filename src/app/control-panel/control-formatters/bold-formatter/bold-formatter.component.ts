import { Component, ChangeDetectionStrategy, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormattersInterface } from '../../formatters.interface';
import { FormatterService } from '../../../services/formatter/formatter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bold-formatter',
  templateUrl: './bold-formatter.component.html',
  styleUrls: ['./bold-formatter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoldFormatterComponent implements AfterViewInit, FormattersInterface, OnDestroy {
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
    document.execCommand('bold');
  }

  checkApplied(): void {
    this.isApplied = document.queryCommandState('bold');
  }

  formatText(): void {
    this.applyFormatter();
    this.checkApplied();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
