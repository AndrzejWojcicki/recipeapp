import { ShoppingList } from './../../common/shopping_list';
import { ShoppingListService } from './../../services/shoppingList.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';
import { TokenStorageService } from 'src/app/services/authentication/token-storage.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDialogComponent } from './add-dialog/add-dialog.component';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  currentUser: any;
  user: User = new User();
  shoppingList: ShoppingList[] = new Array();

  constructor(
    private token: TokenStorageService,
    // tslint:disable-next-line: variable-name
    private _shoppingService: ShoppingListService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getShoppingList();
  }

  // tslint:disable-next-line: typedef
  getShoppingList() {
    this._shoppingService.getShoppingList(this.currentUser.id).subscribe((data) => {
      this.shoppingList = data._embedded.shoppingList;
      this.shoppingList.sort((a: ShoppingList, b: ShoppingList) =>
        a.id > b.id ? 1 : -1
      );
    });
  }

  // tslint:disable-next-line: typedef
  quantityUp(shoppingListId: ShoppingList) {
    shoppingListId.quantity = shoppingListId.quantity + 1;
    const listPack = {
      // tslint:disable-next-line: quotemark object-literal-key-quotes
      productName: shoppingListId.productName,
      quantity: shoppingListId.quantity,
      additionalNote: shoppingListId.additionalNote,
      bought: shoppingListId.bought,
      // tslint:disable-next-line: quotemark object-literal-key-quotes
      author: { "user_id": this.currentUser.id }
    };
    this._shoppingService.updateShoppingList(shoppingListId.id, listPack).subscribe();
  }

  // tslint:disable-next-line: typedef
  quantityDown(shoppingListId: ShoppingList) {
    if (shoppingListId.quantity > 1) {
      shoppingListId.quantity = shoppingListId.quantity - 1;
      const listPack = {
        // tslint:disable-next-line: quotemark object-literal-key-quotes
        productName: shoppingListId.productName,
        quantity: shoppingListId.quantity,
        additionalNote: shoppingListId.additionalNote,
        bought: shoppingListId.bought,
        // tslint:disable-next-line: quotemark object-literal-key-quotes
        author: { "user_id": this.currentUser.id }
      };
      this._shoppingService.updateShoppingList(shoppingListId.id, listPack).subscribe();
    }
  }

  // tslint:disable-next-line: typedef
  check(shoppingListId: ShoppingList) {
    shoppingListId.bought = !shoppingListId.bought;
    const listPack = {
      // tslint:disable-next-line: quotemark object-literal-key-quotes
      productName: shoppingListId.productName,
      quantity: shoppingListId.quantity,
      additionalNote: shoppingListId.additionalNote,
      bought: shoppingListId.bought,
      // tslint:disable-next-line: quotemark object-literal-key-quotes
      author: { "user_id": this.currentUser.id }
    };
    this._shoppingService.updateShoppingList(shoppingListId.id, listPack).subscribe();
  }

  // tslint:disable-next-line: typedef
  delete(shoppingListId: ShoppingList) {
    this._shoppingService.deleteShoppingList(shoppingListId.id).subscribe();
    location.reload();
  }

  // tslint:disable-next-line: typedef
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(AddDialogComponent);
  }
}
