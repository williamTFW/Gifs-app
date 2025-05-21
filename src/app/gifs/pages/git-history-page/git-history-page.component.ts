import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifServices } from '../../services/gifs.services';
import { GifsListComponent } from '../../components/gifs-list/gifs-list.component';

@Component({
  selector: 'git-history-page',
  imports: [GifsListComponent],
  templateUrl: './git-history-page.component.html',
})
export default class GitHistoryPageComponent {
  gifService = inject(GifServices);

  /* query = inject(ActivatedRoute).params.subscribe((param) => {
    console.log({ param });
  }); */
  query = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['query']))
  );

  gifsByKeys = computed(() => {
    return this.gifService.getHistoryGifs(this.query());
  });
}
