import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodStore } from 'src/app/models/food-store';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  fsList: FoodStore[] | undefined
  resultTitle: string | undefined
  resultLink: string | undefined

  constructor(private elementRef: ElementRef, private router: Router) { }

  ngOnInit(): void {
    this.displayResult()
  }

  async displayResult() {

    // Read food stores from local storage
    let jsonData: any
    setTimeout(() => {
      jsonData = localStorage.getItem("fsList")
      localStorage.removeItem("fsList")

      if (jsonData) {
        localStorage.removeItem("fsList")
        
        let fsList: FoodStore[] = JSON.parse(jsonData)
        this.fsList = JSON.parse(jsonData)

        this.animateResult(true)
        
      } else {        
        this.animateResult(false)

      }

    }, 100)
        
  }

  async animateResult(_okay:boolean) {
    
    if (_okay) {
      this.resultTitle = 'Here you go...'
      this.resultLink = '<-- 🤔 no,no... again'
      this.playAudio('okay')
      
    } else {
      this.resultTitle = 'Nothing found'
      this.resultLink = '<-- 😑 try again'
      this.playAudio('fail')
    }

    //await this.gsapService.fade('#food-store-results', false)
    
  }

  playAudio(_audID: string): void {
    const audio = this.elementRef.nativeElement.querySelector(`#aud_${_audID}`);
    try {     
      audio.play() 
    } catch (error) { }
  }

  routeHome(): void {
    this.router.navigate(['/']);
  }

}
