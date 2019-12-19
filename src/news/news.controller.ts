import { Controller, Get, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { Observable } from 'rxjs';
import { New } from './interfaces/New.interface';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  findAll(@Query('q') q: string): Observable<New[]> {
    return this.newsService.bothSearch(q);
  }
}
