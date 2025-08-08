import { Routes } from '@angular/router';
import {MainContainer} from "./ui/main-container/main-container";

export const routes: Routes = [
  {
    path: '',
    component: MainContainer,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./ui/pages/home/home.routes').then((m) => m.homeRoutes),
      }
    ]
  },
];
