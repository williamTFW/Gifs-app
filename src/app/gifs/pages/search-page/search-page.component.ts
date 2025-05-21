import { Component, inject, signal } from '@angular/core';
import { GifServices } from '../../services/gifs.services';
import { Gif } from '../../interfaces/gif.interface';
import { GifsListComponent } from '../../components/gifs-list/gifs-list.component';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  imports: [GifsListComponent],
})
export default class SearchPageComponent {
  giftServ = inject(GifServices);
  gifs = signal<Gif[]>([]);
  onSearch(query: string) {
    console.log(query);
    this.giftServ.searchGifs(query).subscribe((res) => {
      console.log(res);
      this.gifs.set(res);
    });
  }
}
