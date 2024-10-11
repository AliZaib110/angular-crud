import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  title = 'CRUD';
  @ViewChild('helloModal') helloEl?: ElementRef;
  modal?: bootstrap.Modal;
  selectedName: any;
  selectedDescription: any;
  selectedCategoryId: any;
  ItemsList = [
    {
      id: 1,
      name: 'Item 1',
      description: 'description A',
      category: 'Books',
    },
    {
      id: 2,
      name: 'Item 2',
      description: 'description B',
      category: ['Clothing'],
    },
    {
      id: 3,
      name: 'Item 3',
      description: 'description C',
      category: ['Electronics', 'Clothing'],
    },
    {
      id: 4,
      name: 'Item 4',
      description: 'description D',
      category: ['Books', 'Other'],
    },
  ];
  categoryList = [
    { id: 11, name: 'Electronics' },
    { id: 22, name: 'Clothing' },
    { id: 33, name: 'Books' },
    { id: 44, name: 'Other' },
  ];
  rId: number = 0;
  check: boolean = false;

  ngAfterViewInit() {
    this.modal = new bootstrap.Modal(this.helloEl?.nativeElement, {});
  }

  trigger(check: boolean) {
    debugger;
    if (check) {
      this.reSetValues();
    }
    this.modal?.toggle();
  }
  closeModal() {
    this.modal?.hide();
    this.reSetValues();
  }

  // upsert() {
  //   debugger;
  //   if (
  //     this.selectedName == '' &&
  //     this.selectedDescription == '' &&
  //     this.selectedCategoryId == ''
  //   ) {
  //     return;
  //   }
  //   console.log(this.rId, 'rid');
  //   let lastId = this.ItemsList?.length;
  //   const newItem: any = {
  //     id: this.rId ? this.rId : ++lastId,
  //     name: this.selectedName,
  //     description: this.selectedDescription,
  //     category: this.selectedCategoryId,
  //   };
  //   this.ItemsList.push(newItem);
  // }
  upsert() {
    debugger;
    if (
      this.selectedName === '' &&
      this.selectedDescription === '' &&
      this.selectedCategoryId === ''
    ) {
      return;
    }
    let itemIndex = this.ItemsList.findIndex((item) => item.id === this.rId);
    const newItem = {
      id: this.rId ? this.rId : this.ItemsList.length + 1,
      name: this.selectedName,
      description: this.selectedDescription,
      category: this.selectedCategoryId,
    };
    if (itemIndex !== -1) {
      this.ItemsList[itemIndex] = newItem;
    } else {
      this.ItemsList.push(newItem);
    }
  }

  reSetValues() {
    this.rId = 0;
    this.selectedName = '';
    this.selectedDescription = '';
    this.selectedCategoryId = '';
  }

  editRecord(id: number) {
    debugger;
    this.rId = id;
    let itemToEdit = this.ItemsList.find((item) => item.id === id);
    if (itemToEdit) {
      this.selectedName = itemToEdit.name;
      this.selectedDescription = itemToEdit.description;
      this.selectedCategoryId = itemToEdit.category;
      this.check = false;
    }
    this.trigger(this.check);
  }

  deleteRecord(id: number) {
    let index = this.ItemsList.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.ItemsList.splice(index, 1);
    }
  }
}
