import {Component, OnInit, VERSION} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  // version = VERSION;
  // mode = 'side';
  // opened = false;
  // layoutGap = '64';
  // fixedInViewport = true;

  public constructor(private bpo: BreakpointObserver, private router: Router) { }


  // public ngOnInit(): void {
  //   const breakpoints = Object.keys(Breakpoints).map(key => Breakpoints[key]);
  //   this.bpo.observe(breakpoints)
  //   .pipe(map(bst => bst.matches))
  //   .subscribe(matched => {
  //     console.log(matched);

  //     this.determineSidenavMode();
  //     this.determineLayoutGap();
  //   });
  // }

//   private determineSidenavMode(): void {
//     if (
//         this.isExtraSmallDevice() ||
//         this.isSmallDevice()
//     ) {
//         this.fixedInViewport = false;
//         this.mode = 'over';
//         this.opened = false;
//         return;
//     }

//     this.fixedInViewport = true;
//     this.mode = 'side';
// }

// private determineLayoutGap(): void {
//     if (this.isExtraSmallDevice() || this.isSmallDevice()) {
//         this.layoutGap = '0';
//         return;
//     }

//     this.layoutGap = '64';
// }

  public isExtraSmallDevice(): boolean {
    return this.bpo.isMatched(Breakpoints.XSmall);
  }

  public isSmallDevice(): boolean {
    return this.bpo.isMatched(Breakpoints.Small);
  }

  public moveToHome(): void {
    this.router.navigateByUrl('/home');
  }
}
