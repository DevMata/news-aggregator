/* eslint-disable @typescript-eslint/camelcase */
import { NewYorkTimeNew } from '../../interfaces/NewYorkTime.interface';
import { New } from '../../interfaces/New.interface';
import { getNewYorkAuthor } from './regex.helper';

export function SerializeNewYorkNew(newYorkNew: NewYorkTimeNew): New {
  const {
    web_url,
    headline: { main },
    pub_date,
    byline: { original },
  } = newYorkNew;

  return {
    url: web_url,
    publishedAt: pub_date,
    source: 'New York Time',
    title: main,
    author: getNewYorkAuthor(original),
  };
}
