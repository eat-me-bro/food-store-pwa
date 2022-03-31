import { Component, ElementRef, OnInit } from '@angular/core';
import { GsapService } from 'src/app/services/gsap.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private gsapService: GsapService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.animate()
  }
  
  animate(): void {
    const playBtn = this.elementRef.nativeElement.querySelector('#playBtn');
    const pauseBtn = this.elementRef.nativeElement.querySelector('#pauseBtn');
    const anim = this.gsapService.rotateItem(playBtn, pauseBtn)
  }


}
