import { AfterViewInit, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { AdminService } from './../services/admin.service';
import { userItem } from './../model/user-item';
import { forkJoin, noop, Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { RowNode } from 'ag-grid-community';
import { DialogData } from 'src/app/ui/model/dialog-data';
import { DialogService } from 'src/app/ui/dialog.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, AfterViewInit {

  defaultColDef = {
    resizable: true
  };
  columnDefs = [
    { field: '_id', sortable: true, filter: true, checkboxSelection: true },
    {
      field: 'firstName', sortable: true, filter: true, icons: {
        sortAscending: '<i class="fa fa-sort-alpha-up"/>',
        sortDescending: '<i class="fa fa-sort-alpha-down"/>',
      }, editable: true
    },
    {
      field: 'lastName', sortable: true, filter: true, icons: {
        sortAscending: '<i class="fa fa-sort-alpha-up"/>',
        sortDescending: '<i class="fa fa-sort-alpha-down"/>',
      }, editable: true
    },
    { field: 'country', sortable: true, filter: true, editable: true },
    { field: 'city', sortable: true, filter: true, editable: true },
    { field: 'phone', sortable: true, filter: true, editable: true },
    { field: 'birthDate', sortable: true, filter: true, editable: true },
    { field: 'street', sortable: true, filter: true, editable: true },
    { field: 'email', sortable: true, filter: true, editable: true },
    { field: 'roleId', sortable: true, filter: true, editable: true },
  ];
  rowData: Observable<userItem[]>;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  constructor(private admins: AdminService, private dialogLocalsService: DialogService) { }
  ngAfterViewInit(): void {
    this.agGrid.api.addEventListener('rowClicked', this.cellClickedHandler.bind(this));

  }

  ngOnInit(): void {
    this.init();

  }
  init() {
    this.rowData = this.admins.getAllUsers();
  }
  cellClickedHandler($event) {
    console.log($event);
    this.admins.errorSubject.next('');
  }
  deleteUsers() {
    const selectedNodes: RowNode[] = this.agGrid.api.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const httpCals = [];
      selectedNodes.forEach(n => {
        const id = (n.data as userItem)._id;
        httpCals.push(this.admins.deleteUser(id))
      });
      forkJoin(httpCals).subscribe(res => {
        // if (res.deletedCount > 0) {
        this.init();
        // }
      });

    } else {
      this.admins.errorSubject.next('no user were selected');
    }
  }
  addNewUser() {
    const dialog = new DialogData("Register");
    dialog.wide = true;
    this.dialogLocalsService.method = () => {
      this.init();
      dialog.show = false;
    }
    this.dialogLocalsService.subjectType.next(dialog);
  }
  editUser() {
    const selectedNodes: RowNode[] = this.agGrid.api.getSelectedNodes();

    if (selectedNodes.length > 0) {
      const httpCals = [];
      selectedNodes.forEach(n => {
        const user = (n.data as userItem);
        httpCals.push(this.admins.editUser(user))
      });
      forkJoin(httpCals).subscribe(res => {
        // if (res.deletedCount > 0) {
        this.init();
        // }
      });

    } else {
      this.admins.errorSubject.next('no user were selected');
    }
  }
}
