import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private elementRef: ElementRef, private router: Router) { }

  ngOnInit(): void {
    this.animate()
  }

  async animate() {
    
  }

  routeHelp(): void {
    this.router.navigate(['/help']);
  }

  playMiau(): void {
    let audio = document.createElement("audio");
    audio.src = 'assets/sound/catmeow.wav'
    audio.play()
    setTimeout(()=> {
      this.router.navigate(['/help']);
    }, 700)
  }

}
