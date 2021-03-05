import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-canvas',
  templateUrl: './image-canvas.component.html',
  styleUrls: ['./image-canvas.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageCanvasComponent implements AfterViewInit , OnChanges {
  @Input()
  imgBase64: string;
  @ViewChild('imgCanvas') imgCanvas: any;
  constructor() { }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if (this.imgBase64) {
      this.setImageOnCanvas();
    }
  }
  ngOnInit(): void {
   
  }
  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.imgBase64.currentValue) {
    //   this.setImageOnCanvas();
    // }
  }
  setImageOnCanvas() {
    const context = this.imgCanvas.nativeElement.getContext('2d');
    const img = new Image();
    img.onload = (e) => {
      context.drawImage(img, 40, 40);
    };
    img.src = this.imgBase64;
  }
}
