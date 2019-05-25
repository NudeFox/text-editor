import { ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { TextService } from '../services/text/text.service';
import { FormatterService } from '../services/formatter/formatter.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent implements OnInit {
  text$: Promise<string>;

  constructor(
    private textService: TextService,
    private formatterService: FormatterService) {
  }

  ngOnInit() {
    this.text$ = this.textService.getMockText();
  }

  getSelectedText() {
    this.formatterService.formatterTrigger.next(window.getSelection());
  }
}
