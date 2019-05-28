import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Synonym } from '../../models/synonym.model';

@Injectable({
  providedIn: 'root'
})
export class SynonymService {

  constructor(private http: HttpClient) { }

  getSynonyms(word: string) {
    return this.http.get<Synonym[]>(
      'https://api.datamuse.com/words',
      {
        params: {
          ml: word,
          max: '5'
        }
      }
    ).pipe(
      map(res => res.map(synonym => synonym.word))
    );
  }
}
