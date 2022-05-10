import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodStore } from 'src/app/models/food-store';
import { FoodStoreService } from 'src/app/services/food-store.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  squidStyle: string = ''

  constructor(
    private elementRef: ElementRef, 
    private router: Router,
    private fss: FoodStoreService) { }

  ngOnInit(): void {
    // Clear session storage
    localStorage.removeItem('fsList')

  }

  async doSearch() {
    console.log("GO, Go, go...");

    this.playAudio('sparkle')

    //startRequest
    await this.startRequest()
  }
  
  async startRequest() {

    const squid = this.elementRef.nativeElement.querySelector('#squid');
    const squidSlogan = this.elementRef.nativeElement.querySelector('#squid_slogan');
   
    try {

      this.squidStyle = 'animate__flip';

      squidSlogan.className = "animate__animated animate__fadeIn"
      squidSlogan.innerText = "location check..."
      
      let fsData: FoodStore = await this.getGeoLocation()

      // Get all food stores
      this.fss.getFoodStores(fsData).subscribe(data => {

        squidSlogan.className = "animate__animated animate__fadeIn"
        squidSlogan.innerText = "searching..."
        
        let fsList: FoodStore[] = data;

        // Set food stores into local storage
        localStorage.setItem('fsList', JSON.stringify(fsList));
              
        // Display results
        console.log(fsList);

        squidSlogan.className = "animate__animated animate__fadeOut";
        squid.className = squidSlogan.className;

        console.log("DONE");
        this.router.navigate(['/result']);

      })

    } catch (error) {
      this.playAudio('fail')
      squidSlogan.className = "animate__animated animate__fadeIn"
      squidSlogan.innerText = "please enable GPS..."
      this.squidStyle = "animate__pulse animate__infinite"
    }
    
    
  }

  async getGeoLocation(): Promise<FoodStore> {
    console.log("RETRIVE GEOLOCATION...");
    let fsData: FoodStore = {
      long: undefined,
      lat: undefined,
      id: undefined,
      foodStore: undefined,
      favorite: undefined,
      lastVisite: undefined,
      placeId: undefined,
      mapsUrl: undefined
    }
    // Check GeoLocation Approvel
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(res => {
          fsData.long = res.coords.longitude
          fsData.lat = res.coords.latitude
          console.log("DONE...");
          resolve(fsData)  
        }, err => {
          reject("No GSP Data")
        }, { enableHighAccuracy: true })
      } else {
        reject("No GSP Data")
      }
    })
  }

  playAudio(wav_file: string): void {
    let audio = document.createElement("audio");
    audio.src = `assets/sound/${wav_file}.wav`
    audio.play()
  }

}
