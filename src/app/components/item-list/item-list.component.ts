import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ItemService} from "../../services/item.service";
import {Item} from "../../models/Item";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  dataArr: Item[] = [];
  detailItemArr: boolean[] = Array(this.dataArr.length).fill(false);
  bulkItemArr: number[] = [];

  ngOnInit(): void {
    this.ItemService.itemSubject.subscribe((data: any) => {
      this.dataArr = this.ItemService.getAllItem();
    })
  }

  constructor(public ItemService: ItemService) {

  }

  ngOnDestroy() {
    this.ItemService.itemSubject.unsubscribe()
  }

  checkItem(index: any) {
    if (this.bulkItemArr.includes(index)) {
      this.bulkItemArr = this.bulkItemArr.filter((item) => item !== index);
    } else {
      this.bulkItemArr.push(index);
    }
    console.log("checked ", this.bulkItemArr)
  }

  detailItem(item: any, index: number) {
    this.detailItemArr[index] = !this.detailItemArr[index];
  }

  reloadData() {
    this.dataArr = this.ItemService.getAllItem();
  }

  removeItem(index: number) {
    this.ItemService.deleteItem(index);
    this.reloadData()
  }

  removeBulkItem() {
    let arrItem = this.ItemService.getAllItem();
    this.bulkItemArr.sort();
    while (this.bulkItemArr.length) {
      arrItem.splice(<number>this.bulkItemArr.pop(), 1);
    }
    localStorage.setItem('todoListArr', JSON.stringify(arrItem));
    this.reloadData();
  }

  handleAfterEditItem(event: any){
    this.detailItemArr = [];
  }
}
