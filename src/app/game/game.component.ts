import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  private size: number = parseInt(this.router.snapshot.paramMap.get('size'), 10);
  private matrix: string[][] = [];
  private exampleForCheck: string[][] = [];
  private sizeInPx: string = 400 / this.size + 'px';
  private fontSize: string;
  private idx = this.size - 1;  // index of empty element in matrix
  private idy = this.size - 1;  // index of empty element in matrix
  private isHelp = true;
  private countSteps = 0;
  private timer = 0;
  private isGame = false;
  private isSelect = false;     // flag for select popup
  private defaultForShuffle = [30, 150, 300, 400, 500, 700][this.size - 3];
  private timerId: any;
  private isWin = false;        // flag for win popup
  private indexes = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ];

  constructor(private router: ActivatedRoute) {
  }

  ngOnInit() {
    if (screen.width < 500) {
      this.sizeInPx = 300 / this.size + 'px';
    }
    this.fontSize = `${parseInt(this.sizeInPx, 10) * 0.66}px`;
    this.initMatrix();
  }


  initMatrix() {
    let count = 1;
    for (let i = 0; i < this.size; i++) {
      this.matrix[i] = new Array(this.size);
      this.exampleForCheck[i] = new Array(this.size);
      for (let j = 0; j < this.size; j++) {
        this.matrix[i][j] = count.toString();
        this.exampleForCheck[i][j] = (count++).toString();
      }
    }
    this.matrix[this.size - 1][this.size - 1] = '';
    this.exampleForCheck[this.size - 1][this.size - 1] = '';
  }

  step(i: number, j: number) {
    if ([Math.abs(i - this.idx), Math.abs(j - this.idy)].join('') === [1, 0].join('') ||
        [Math.abs(i - this.idx), Math.abs(j - this.idy)].join('') === [0, 1].join('')) {
      this.move(i, j);
      if (this.isGame) {
        this.countSteps++;
      }

      if (this.check() && this.isGame) {
        this.stop(true);
      }
    }
  }

  move(i: number, j: number) {
    [this.matrix[i][j], this.matrix[this.idx][this.idy]] = [this.matrix[this.idx][this.idy], this.matrix[i][j]];
    this.idx = i;
    this.idy = j;
  }

  shuffle(n: number) {
    this.reset();
    for (let k = 0; k < n;) {
      const randIdx = Math.floor(Math.random() * 4);
      if (this.idx + this.indexes[randIdx][0] >= 0 && this.idx + this.indexes[randIdx][0] < this.size &&
        this.idy + this.indexes[randIdx][1] >= 0 && this.idy + this.indexes[randIdx][1] < this.size) {
        this.move(this.indexes[randIdx][0] + this.idx, this.indexes[randIdx][1] + this.idy);
        if (!this.check()) {
          k++;
        }
      }
    }
    this.start();
  }

  showPopup() {
    this.isSelect = true;
  }

  start() {
    this.isSelect = false;
    this.timer = 0;
    this.countSteps = 0;
    this.isGame = true;
    const now = new Date().getTime();
    this.timerId = setInterval(() => {
      this.timer = new Date().getTime() - now;
    }, 1000);
  }

  stop(isWin = false) {
    if (isWin) {
      this.showWinPopup();
    }
    this.isGame = false;
    clearInterval(this.timerId);
  }

  check() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.matrix[i][j] !== this.exampleForCheck[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  reset() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.matrix[i][j] = this.exampleForCheck[i][j];
      }
    }
    this.stop();
    this.timerId = 0;
    this.idx = this.size - 1;
    this.idy = this.size - 1;
    this.timer = 0;
    this.countSteps = 0;
  }

  hidePopup() {
    this.isSelect = false;
    this.isWin = false;
    this.isHelp = false;
  }

  stopClick() {
    event.stopPropagation();
  }

  showWinPopup() {
    this.isWin = true;
  }

  help() {
    this.isHelp = true;
  }
}
