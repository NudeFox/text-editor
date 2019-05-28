import { Component, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormatterService } from '../../../services/formatter/formatter.service';
import { FormattersInterface } from '../../formatters.interface';

@Component({
  selector: 'app-italic-formatter',
  templateUrl: './italic-formatter.component.html',
  styleUrls: ['./italic-formatter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItalicFormatterComponent implements AfterViewInit, FormattersInterface, OnDestroy {

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
    document.execCommand('italic');
  }

  checkApplied(): void {
    this.isApplied = document.queryCommandState('italic');
  }

  formatText(): void {
    this.applyFormatter();
    this.checkApplied();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
