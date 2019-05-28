import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { TextService } from '../services/text/text.service';
import { FormatterService } from '../services/formatter/formatter.service';
import { SynonymService } from '../services/text/synonym.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent implements OnInit {
  text$: Promise<string>;
  synonyms: string[];
  showPopup = false;
  topPosition: string;
  leftPosition: string;

  constructor(
    private textService: TextService,
    private formatterService: FormatterService,
    private synonymService: SynonymService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.text$ = this.textService.getMockText();
  }

  checkPopup() {
    this.showPopup = !this.showPopup;
  }

  getSynonyms() {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    if (selectedText !== '') {
      this.synonymService.getSynonyms(selectedText)
        .subscribe((res) => {
          this.synonyms = res;
          const bound = selection.getRangeAt(0).getBoundingClientRect();
          this.leftPosition = bound.left + 'px';
          this.topPosition = bound.bottom + 2 + 'px';
          this.checkPopup();
          this.ref.detectChanges();
        });
    }
  }

  changeSelected(synonym: string) {
    document.execCommand('insertText', false, synonym);
  }

  deselected() {
    this.formatterService.formatterDeselect.next();
    this.checkPopup();
  }
}
