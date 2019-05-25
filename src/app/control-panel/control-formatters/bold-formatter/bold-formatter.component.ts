import { Component, ChangeDetectionStrategy, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
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
  selection: Selection;
  subscription: Subscription;

  constructor(
    private formatterService: FormatterService,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit() {
    this.subscription = this.formatterService.formatterTrigger.subscribe(
      (selection: Selection) => {
        this.selection = selection;
      }
    );
  }

  applyFormatter(): void {
    this.isApplied = true;
    const selectedRange = this.selection.getRangeAt(0);
    const selectedText = selectedRange.extractContents();
    const updatedNode = this.renderer.createElement('b');
    this.renderer.appendChild(updatedNode, selectedText);
    selectedRange.insertNode(updatedNode);
  }

  removeFormatter(): void {
    this.isApplied = false;
    const range = this.selection.getRangeAt(0).cloneRange();
    let node = range.startContainer;
    while (node.nodeType !== 1) {
      node = node.parentNode;
    }
    console.dir(node);
    const textNode = this.renderer.createText(node.textContent);
    node.remove();
    range.insertNode(textNode);
  }

  formatText(): void {
    if (this.selection !== undefined) {
      // check if the selection node is wrapped in bold tag
      const range = this.selection.getRangeAt(0).cloneRange();
      let node = range.startContainer;
      while (node.nodeType !== 1) {
        node = node.parentNode;
      }
      node.nodeName === 'B' ? this.removeFormatter() : this.applyFormatter();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
