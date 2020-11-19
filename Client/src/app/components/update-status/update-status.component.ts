import { ConfirmDialogModel, ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuctionModel } from 'src/app/models/auction-model';
import { AuctionsService } from 'src/app/services/auctions.service';
import Swal from 'sweetalert2';
import { keyValuesToMap } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { BlockScrollStrategy } from '@angular/cdk/overlay';


@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.css']
})
export class UpdateStatusComponent implements OnInit {
  public regForm: FormGroup;
  public personalDetails: FormGroup;
  public auction = new AuctionModel();
  public result: boolean;


  constructor(public auctionService: AuctionsService,
              public dialogRef: MatDialogRef<UpdateStatusComponent>,
              public dialog: MatDialog,
              private myFormBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) data) {
                this.auction = data;
              }

  ngOnInit(): void {
    this.regForm = this.myFormBuilder.group({
      statusControl: ['', Validators.required],

    });
  }

  public async updateAuction(): Promise<any> {
    const message = 'Are you sure?';
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(async dialogResult => {
      console.log(dialogResult);
      this.result = dialogResult;
      if (this.result === true) {
        this.auction.status = this.regForm.value.statusControl;
        await this.auctionService.updateAuction(this.auction);
        Swal.fire('Status changed', '', 'success');
        this.dialogRef.close();
      }
      this.dialogRef.close();
    });

  }
  public close(): void {
    this.dialogRef.close();
  }
}
