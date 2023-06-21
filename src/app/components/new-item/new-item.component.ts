import {Component, Input, OnInit, Output} from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validator, FormBuilder, Validators} from '@angular/forms';
import {ItemService} from '../../services/item.service';
import {Item} from "../../models/Item";
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {
  @Input() mode? = 'add';
  @Input() initItemInfo?: Item;
  // @Output() eventReloadData: EventEmitter<any>;
  rfItem!: FormGroup;
  todayDate = new Date().toISOString().slice(0, 10);

  constructor(private fb: FormBuilder, public ItemService: ItemService) {
    this.rfItem = this.fb.group({
      title: this.fb.control('', [Validators.required]),
      description: this.fb.control('',),
      dueDate: this.fb.control('',),
      priority: this.fb.control('',),
    })
  }

  ngOnInit(): void {
    console.log('mode + Item info ', this.mode, this.initItemInfo)
    this.rfItem.patchValue({
      title: this.initItemInfo?.title,
      description: this.initItemInfo?.description,
      dueDate: this.initItemInfo?.dueDate ? this.initItemInfo?.dueDate.toString().slice(0, 10) : '',
      priority: this.initItemInfo?.priority,
    })
  }

  onSubmit() {
    if (this.rfItem.status == "INVALID") {
      alert("Title is required.");
    } else {
      const newObj = {...this.rfItem.value, dueDate: new Date(this.rfItem.value.dueDate)};
      this.ItemService.addItem(newObj);
    }
  }

  editItem() {
    if (this.initItemInfo != undefined) {
      this.ItemService.editItem(this.rfItem.value);
      // this.eventReloadData.emit()
    }
  }

}
