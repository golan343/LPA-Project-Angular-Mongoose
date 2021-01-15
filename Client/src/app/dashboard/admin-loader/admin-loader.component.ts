import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderState } from '../../models/LoaderState';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-admin-loader',
  templateUrl: './admin-loader.component.html',
  styleUrls: ['./admin-loader.component.css']
})
export class AdminLoaderComponent implements OnInit, OnDestroy {
  show: boolean;
  private subscription: Subscription;
  constructor(private loaderService: LoaderService) { }
  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
