import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodStore } from 'src/app/models/food-store';
import { HttpClient  } from '@angular/common/http';
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
    private http: HttpClient,
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
      
      let fsData: FoodStore = this.createFsDataStack()

      try {
        // Try to get geolocation over Web API
        fsData = await this.getGeoLocation()  
      } catch (error) {
        console.log("GEO LOCATION WEB API FAILED. TRY OVER IP4...");
        // Try to get geolocation over IP4
        fsData = await this.getGeoLocationIP4()        
      }     

      // Get all food stores
      await this.fss.getFoodStores(fsData).subscribe(data => {

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

      switch (error) {
        case "NO GPS": squidSlogan.innerText = "please enable GPS..."; break;
        case "IP4 NOT FOUND": squidSlogan.innerText = "no ip4 found..."; break;      
        default: squidSlogan.innerText = ""; break;          
      }

      squidSlogan.className = "animate__animated animate__fadeIn"      
      this.squidStyle = "animate__pulse animate__infinite"
      console.log(error);
    }
        
  }

  async getGeoLocationIP4(): Promise<FoodStore> {
    console.log("RETRIVE GEOLOCATION OVER IP4...");
    let fsData: FoodStore = this.createFsDataStack()

    return new Promise(async (resolve, reject) => {      
      try {
        this.http.get("https://api.ipify.org/?format=json").subscribe( (res: any) => {
          fsData.userip4 = res.ip 
          console.log("USERIP4 : ", fsData.userip4);
          this.fss.getLocationOverIP(fsData).subscribe(data => { resolve(data) }) 
        })
      } catch (error) {
        reject("IP4 NOT FOUND")
      }
    })
  }

  async getGeoLocation(): Promise<FoodStore> {
    console.log("RETRIVE GEOLOCATION...");
    let fsData: FoodStore = this.createFsDataStack()
    // Check GeoLocation Approvel
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(res => {
          fsData.long = res.coords.longitude
          fsData.lat = res.coords.latitude
          console.log("DONE...");
          resolve(fsData)  
        }, err => {
          reject("NO GPS")
        }, { enableHighAccuracy: true })
      } else {
        reject("NO GPS")
      }
    })
  }

  createFsDataStack(): FoodStore {
    return {
      userip4: undefined,
      long: undefined,
      lat: undefined,
      id: undefined,
      foodStore: undefined,
      favorite: undefined,
      lastVisite: undefined,
      placeId: undefined,
      mapsUrl: undefined
    }
  }

  playAudio(wav_file: string): void {
    let audio = document.createElement("audio");
    audio.src = `assets/sound/${wav_file}.wav`
    audio.play()
  }

}
