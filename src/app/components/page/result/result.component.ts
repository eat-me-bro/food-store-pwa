import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GsapService } from 'src/app/services/gsap.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(private gsapService: GsapService, private router: Router) { }

  ngOnInit(): void {
    this.animate()
  }

  async animate() {
    this.playDing()
    await this.gsapService.fade('#food-store-results', false)    
  }

  playDing(): void {
    let audio = document.createElement("audio");
    audio.src = 'assets/sound/mario.wav'
    audio.play()
  }

  routeHome(): void {
    this.router.navigate(['/']);
  }

}
