import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FileComponent } from './file/file.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { TextService } from './services/text/text.service';
import { FooterComponent } from './footer/footer.component';
import { BoldFormatterComponent } from './control-panel/control-formatters/bold-formatter/bold-formatter.component';
import { ItalicFormatterComponent } from './control-panel/control-formatters/italic-formatter/italic-formatter.component';
import { UnderlineFormatterComponent } from './control-panel/control-formatters/underline-formatter/underline-formatter.component';

@NgModule({
  declarations: [
    AppComponent,
    FileComponent,
    ControlPanelComponent,
    HeaderComponent,
    FooterComponent,
    BoldFormatterComponent,
    ItalicFormatterComponent,
    UnderlineFormatterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    TextService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
