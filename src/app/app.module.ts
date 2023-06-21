import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import appRoutes from './routerConfig';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {ItemListComponent} from './components/item-list/item-list.component';
import {NewItemComponent} from './components/new-item/new-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    NewItemComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [FormsModule, ReactiveFormsModule]
})
export class AppModule {
}
