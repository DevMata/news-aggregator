import { Controller, Get, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  findAll(@Query('q') q: string): Observable<AxiosResponse<object[]>> {
    try {
      return this.newsService.guardianSearch(q);
    } catch (error) {
      console.error(error);
    }
  }
}
