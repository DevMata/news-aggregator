import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, merge } from 'rxjs';
import { map, reduce } from 'rxjs/operators';

import { SerializeNewYorkNew, SerializeGuardianNew } from './helpers/serialize.helper';
import { New } from './interfaces/New.interface';

const NYT_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';
const NYT_FILTERS = '&sort=relevance&fl=_id,pub_date,snippet,web_url,headline,byline';
const GUARDIAN_URL = 'https://content.guardianapis.com/search';
const GUARDIAN_FILTERS = '&show-tags=contributor';

@Injectable()
export class NewsService {
  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

  newYorkTimeSearch(searchTerm: string): Observable<New[]> {
    try {
      const NYT_KEY = this.configService.get<string>('NYT_KEY');

      return this.httpService
        .get(`${NYT_URL}q=${searchTerm}&api-key=${NYT_KEY}${NYT_FILTERS}`)
        .pipe(map(res => res.data.response.docs.map(SerializeNewYorkNew)));
    } catch (error) {
      console.error(error);
    }
  }

  guardianSearch(searchTerm: string): Observable<New[]> {
    try {
      const GUARDIAN_KEY = this.configService.get<string>('GUARDIAN_KEY');

      return this.httpService
        .get(`${GUARDIAN_URL}?api-key=${GUARDIAN_KEY}&q=${searchTerm}${GUARDIAN_FILTERS}`)
        .pipe(map(res => res.data.response.results.map(SerializeGuardianNew)));
    } catch (error) {
      console.error(error);
    }
  }

  bothSearch(searchTerm: string): Observable<New[]> {
    const nytSearch = this.newYorkTimeSearch(searchTerm);
    const guardianSearch = this.guardianSearch(searchTerm);

    return merge(nytSearch, guardianSearch).pipe(reduce((acc, value) => [...acc, ...value]));
  }
}
