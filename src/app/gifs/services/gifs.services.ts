import { environment } from '@envioroments/environment';
import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { map, tap } from 'rxjs';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { Gif } from '../interfaces/gif.interface';

const GIF_KEY = 'gifs';

function loadFromLocalStorage() {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage);
  console.log(gifs);
  return gifs;
}

@Injectable({ providedIn: 'root' })
export class GifServices {
  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));
  constructor() {
    this.loadTrendingGifs();
  }
  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem('gifs', historyString);
  });

  loadTrendingGifs() {
    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/trending`, {
        params: {
          api_key: environment.apiKeyGifs,
          limit: 20,
        },
      })
      .subscribe((res) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(res.data);
        console.log(gifs);
        this.trendingGifs.set(gifs);
        this.trendingGifsLoading.set(false);
      });
  }

  searchGifs(query: string) {
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/search`, {
        params: {
          api_key: environment.apiKeyGifs,
          limit: 20,
          q: query,
        },
      })
      .pipe(
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: items,
          }));
        })
      );
    /* .subscribe((res) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(res.data);
        console.log({ search: gifs });
      }); */
  }

  getHistoryGifs(query: string): Gif[] {
    console.log(this.searchHistory());
    console.log(this.searchHistory()[query]);
    return this.searchHistory()[query] ?? [];
  }
}
