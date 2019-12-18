import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';

const NYT_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';
const NYT_FILTERS = '&sort=newest&fl=_id,pub_date,snippet,web_url,headline';
const GUARDIAN_URL = 'https://content.guardianapis.com/search';

@Injectable()
export class NewsService {
  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

  nytSearch(searchTerm: string): Observable<AxiosResponse<object[]>> {
    try {
      const NYT_KEY = this.configService.get<string>('NYT_KEY');

      return this.httpService
        .get(`${NYT_URL}q=${searchTerm}&api-key=${NYT_KEY}${NYT_FILTERS}`)
        .pipe(map(res => res.data.response.docs));
    } catch (error) {
      console.error(error);
    }
  }

  guardianSearch(searchTerm: string): Observable<AxiosResponse<object[]>> {
    try {
      const GUARDIAN_KEY = this.configService.get<string>('GUARDIAN_KEY');

      return this.httpService
        .get(`${GUARDIAN_URL}?api-key=${GUARDIAN_KEY}&q=${searchTerm}`)
        .pipe(map(res => res.data.response.results));
    } catch (error) {
      console.error(error);
    }
  }
}
