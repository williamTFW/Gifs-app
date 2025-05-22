import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { GifsListComponent } from '../../components/gifs-list/gifs-list.component';
import { GifServices } from '../../services/gifs.services';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.services';

@Component({
  selector: 'app-trending-page',
  /* imports: [GifsListComponent], */
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit {
  /* gifs = imageUrls; */
  gifService = inject(GifServices);
  scrollStateService = inject(ScrollStateService);
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('divGifGroup');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    console.log(scrollDiv);
    if (!scrollDiv) return;

    /* Obtener el valor del scroll actual, mientras se va haciendo scroll */
    const scrollTop = scrollDiv.scrollTop;
    /* Obtener el valor del scroll total, hasta donde nosotros podemos hacer scroll */
    const scrollHeight = scrollDiv.scrollHeight;
    /* Obtener el alto de la pantalal del usuario, depende del dispositivo que se utilice */
    const clientHeight = scrollDiv.clientHeight;

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;

    console.log({ scrollHeight, clientHeight, scrollTop, isAtBottom });

    this.scrollStateService.trendingScrollState.set(scrollTop);

    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
  }
}
