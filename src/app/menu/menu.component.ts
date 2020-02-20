import { Component, OnInit } from '@angular/core';
import {ISize, getTrueLang} from '../models/';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private dict = getTrueLang;
  private lang = this.router.url.split('/').pop() || 'ru';

  sizes: ISize[] = [
    {
      size: '3x3',
      id: 3
    }, {
      size: '4x4',
      id: 4
    }, {
      size: '5x5',
      id: 5
    }, {
      size: '6x6',
      id: 6
    }, {
      size: '7x7',
      id: 7
    }, {
      size: '8x8',
      id: 8
    }];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  changeLang(lang) {
    this.lang = lang;
    if (lang === 'en') {
      this.router.navigateByUrl('/en');
    } else {
      this.router.navigateByUrl('');
    }
  }

  getRouterLink(id: number) {
    if (this.lang === 'en') {
      return `/game/en/${id}`;
    }
    return `/game/${id}`;
  }
}
