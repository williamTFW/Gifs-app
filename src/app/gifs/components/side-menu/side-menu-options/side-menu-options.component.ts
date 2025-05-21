import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifServices } from 'src/app/gifs/services/gifs.services';

interface IMenuOptions {
  icon: string;
  label: string;
  route: string;
  subLabel: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {
  gifsServices = inject(GifServices);

  menuOptions: IMenuOptions[] = [
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Search',
      route: '/dashboard/search',
      subLabel: 'Search Gifs',
    },
    {
      icon: 'fa-solid fa-fire',
      label: 'Trending',
      route: '/dashboard/trending',
      subLabel: 'Popular Gifs',
    },
  ];
}
