import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-frame',
  templateUrl: './video-frame.component.html',
  styleUrls: ['./video-frame.component.css']
})
export class VideoFrameComponent implements OnInit {
  @Input()
  src: string;
  constructor() { }

  ngOnInit(): void {
  }

}
