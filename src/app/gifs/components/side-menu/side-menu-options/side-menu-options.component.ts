import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
