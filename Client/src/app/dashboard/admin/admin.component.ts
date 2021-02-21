import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AdminService } from './../services/admin.service';
import { UploadService } from './../services/upload.service';
import { userItem } from './../model/user-item';
import { forkJoin, Subscription } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions, RowNode } from 'ag-grid-community';
import { DialogData } from 'src/app/ui/model/dialog-data';
import { DialogService } from 'src/app/ui/dialog.service';
import { tap } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user-model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, AfterViewInit, OnDestroy {
  lastloged: string;
  gridOptions: GridOptions;
  user = new UserModel();
  show = false;
  showCalendar = false;
  @ViewChild('inputFile') fileUpload: any;
  @ViewChild('imgCanvas') canvasWrap: ElementRef;
  roles:any;
  defaultColDef = {
    resizable: true
  };
  columnDefs = [
    {
      field: 'firstName', sortable: true, filter: true, editable: true, checkboxSelection: true
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
    { field: 'loginDate', sortable: true, filter: true, editable: false },
    { field: 'registrationDate', sortable: true, filter: true, editable: false },
    { field: 'createdBy', sortable: true, filter: true, editable: false },
    { field: 'winingOffers', sortable: true, filter: true, editable: false },
    { field: 'loosingOffers', sortable: true, filter: true, editable: false },
  ];
  userSubscriber = new Subscription();
  rowData: userItem[];
  users: userItem[];
  @ViewChild('agGrid') agGrid: AgGridAngular;
  constructor(private admins: AdminService, private dialogLocalsService: DialogService, public fileUploasService: UploadService) { }
  ngOnDestroy(): void {
    this.userSubscriber.unsubscribe();
  }
  ngAfterViewInit(): void {
    if (this.agGrid)
      this.agGrid.api.addEventListener('rowClicked', this.cellClickedHandler.bind(this));
    this.agGrid.api.onFilterChanged()
    this.gridOptions = <GridOptions>{
      defaultColDef: {
        editable: true,
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 100,
      },
      suppressRowClickSelection: true,
      groupSelectsChildren: true,
      debug: true,
      rowSelection: 'multiple',
      rowGroupPanelShow: 'always',
      pivotPanelShow: 'always',
      enableRangeSelection: true,
      pagination: true,
    };
  }
  triggerUplaod() {
    this.fileUpload.nativeElement.click();
  }
  ngOnInit(): void {
    this.lastloged = '';

    this.init();
    this.admins.getAllRoles().subscribe(roles => {
      this.roles = roles;
    });
  }
  init() {
    this.userSubscriber = this.admins.getAllUsers().pipe(tap(users => {
      this.users = users;
      this.rowData = users;
      this.user = users[0] as UserModel;
    })).subscribe(users => {
      this.admins.errorSubject.next('');
    }, err => {
      this.admins.errorSubject.next('error' + JSON.stringify(err));
    });
  }
  setInput($event) {
    if ($event) {
      const start = $event.start as Date;
      const end = $event.end as Date;
      this.lastloged = start.toLocaleDateString() + '-' + end.toLocaleDateString();
      this.rowData = this.users.filter(user => {
        let d = new Date(user.loginDate).getTime();
        return d && d > start.getTime() && d < end.getTime();
      });
    } else {
      this.lastloged = '';
      this.rowData = [...this.users];
    }
    setTimeout(() => {
      this.showCalendar = false;
    }, 2000);

  }

  showCalendarEvent() {
    this.showCalendar = true;
  }

  cellClickedHandler($event) {
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
        this.init();
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

  close() {
    this.show = false;
  }

  editUser() {
    const selectedNodes: RowNode[] = this.agGrid.api.getSelectedNodes();

    if (selectedNodes.length > 0) {
      this.show = true;
      this.user = selectedNodes[0].data as UserModel;
      this.fileUploasService.canvas = this.canvasWrap.nativeElement;
      this.fileUploasService.clear();
      if (this.user.img) {
        
        this.fileUploasService.setImageOnCanvas(this.user.img);
      }
    } else {
      this.admins.errorSubject.next('no user were selected');
    }
  }

  filterUser($event: any) {
    const val = $event.target.value;
    if (val) {
      console.log(val);
      this.rowData = this.users.filter(user => {
        return new RegExp(val.toLowerCase(), 'g').test(user.firstName.toLowerCase()) || new RegExp(val.toLowerCase(), 'g').test(user.lastName.toLowerCase());
      });
    } else {
      this.rowData = [...this.users];
    }

  }

  UsersToCsv() {

    const keys = ['firstName', 'lastName', 'country', 'city', 'phone', 'street', 'email'];
    let csv = keys.join(',') + '\n';
    this.rowData.forEach(item => {

      keys.forEach(keyItem => {
        csv += item[keyItem] + ',';
      });
      csv = csv.substr(0, csv.length - 1) + '\n';

    });
    console.log(csv);
    let base64EncodeAuctions = btoa(csv);
    console.log(base64EncodeAuctions);
    base64EncodeAuctions = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + base64EncodeAuctions;
    window.open(base64EncodeAuctions);


  }

  saveChanges() {
    const userMaped: UserModel = this.user as UserModel;
    const requests = [];
   
    requests.push(this.admins.editUser(userMaped));
    if (this.fileUploasService.imageFromData) {
      requests.push(this.admins.saveUserImage(this.user._id, this.fileUploasService.imgBase64));
    }
    forkJoin(requests).subscribe(result => {
      this.admins.errorSubject.next('The user has been updated successfuly!');
      this.close();
      this.init();
    },
      err => {
        console.log(err);
        this.admins.errorSubject.next('The user was not change!' + JSON.stringify(err));
      }
    )
  }

}
