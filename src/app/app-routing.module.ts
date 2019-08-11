import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {GameComponent} from './game/game.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent
  },
  {
    path: 'game/:size',
    component: GameComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
