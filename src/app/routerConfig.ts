import { Routes} from "@angular/router";
import { ItemListComponent} from "./components/item-list/item-list.component";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/list-item',
    pathMatch: "full"
  },
  {
    path: 'list-item',
    component: ItemListComponent
  }
];
export default appRoutes;
