import {Injectable} from '@angular/core';
import {Item} from "../models/Item";
import {Subject, Observable, BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class ItemService {
  todoList: Item[] = [
    {
      title: 'item 1',
      dueDate: new Date('4-15-2020'),
      description: 'description for item 1',
      priority: 'Low'
    },
    {
      title: 'item 2',
      dueDate: new Date('8-16-2023'),
      description: 'description for item 2',
      priority: 'Normal'
    },
    {
      title: 'item 3',
      dueDate: new Date('5-20-2023'),
      description: 'description for item 3',
      priority: 'High'
    }
  ];
  itemSubject = new BehaviorSubject<Item>({} as any);

  constructor() {
    localStorage.setItem('todoListArr', JSON.stringify(this.todoList));
  }


  getAllItem() {
    let arrData = JSON.parse(localStorage.getItem("todoListArr") || '{}');
    arrData.sort((a: any, b: any) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
    return arrData;
  }

  addItem(item: Item) {
    let stored = this.getAllItem();
    stored.push(item);
    localStorage.setItem('todoListArr', JSON.stringify(stored));
    this.itemSubject.next(item);
  }

  editItem(newItem: Item) {
    console.log("editItem", newItem)
    let stored = this.getAllItem();
    const objIndex = stored.findIndex((obj: Item) => obj.title === newItem.title);
    stored[objIndex] = newItem;
    localStorage.setItem('todoListArr', JSON.stringify(stored));
    this.itemSubject.next(newItem);
  }

  deleteItem(index: number) {
    let stored = this.getAllItem();
    stored.splice(index, 1);
    localStorage.setItem('todoListArr', JSON.stringify(stored));
  }
}
