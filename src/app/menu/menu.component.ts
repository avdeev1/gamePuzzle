import { Component, OnInit } from '@angular/core';
import {ISize} from '../models/model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

}
