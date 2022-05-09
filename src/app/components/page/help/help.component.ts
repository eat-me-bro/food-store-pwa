import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor(private router: Router, private elementRef: ElementRef, ) { }

  ngOnInit(): void {
    this.animate()
  }

  async animate() {
    const helpBox = this.elementRef.nativeElement.querySelector('#helpBox');
    helpBox.className = "animate__animated animate__fadeIn"
    //await this.gsapService.fade('#helpBox', false)
  }

  routeHome(): void {
    this.router.navigate(['/']);
  }


}
