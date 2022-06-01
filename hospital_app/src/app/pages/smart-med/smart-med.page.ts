import { Component, OnInit } from '@angular/core';
import { Health, HealthData } from '@ionic-native/health/ngx';
import { Platform, NavController} from '@ionic/angular';
// import { GooglefitService } from '../services/googlefit.service';

@Component({
  selector: 'app-smart-med',
  templateUrl: './smart-med.page.html',
  styleUrls: ['./smart-med.page.scss'],
})
export class SmartMedPage implements OnInit {
  platformReady: Boolean = false;
  stepsArray = [];
  stepsAgregated = [];
  hasData= false;
  // steps = 'no data';

  constructor(private platform: Platform,
              private health: Health,
              private navC: NavController) { 
                
              //  if(this.platform.ready())
              //  this.health.isAvailable()
              //  .then((available:boolean) => {
              //    console.log(available);
              //    this.health.requestAuthorization([
              //     'distance' , 'nutrition', //permisiuni de citire/scriere 
              //     {
              //       read: ['steps'],
              //       write: ['height', 'weight']
              //     } 
              //    ])
              //    .then(res => console.log(res))
              //    .catch(e => console.log(e));
              //  })
              //  .catch(e => console.log(e));
                //--------------------------
              //  this.health.query({
              //    startDate: new Date(new Date().getTime() -3*24*60*60*1000), 
              //    endDate: new Date(),
              //    dataType: 'steps'
              //  }).then((value: HealthData) => {
              //    console.info('inainte de conversie')
              //    console.info('inainte de loop')
              //    for (let val in value) {
              //      console.info("Health Data data " + JSON.stringify(value[val].value))
              //     console.info( "Health Data data " + JSON.stringify(value[val]))
              //    }
              //  }).catch
               
              
              }

  ngOnInit() {
    this.checkPlatformReady();
  }

  async checkPlatformReady(){
    const ready = !!await this.platform.ready();
    if (ready) {
      this.health.isAvailable().then(bool => {
        console.log("is available" + bool);
        if (bool) {
          this.platformReady = true;
          this.health.requestAuthorization([
            'distance', 'nutrition',  //perm. de citire si scriere'
            {
              read: ['steps','height', 'weight', 'heart_rate'],       //read only perm
              write: ['height', 'weight']               //write only perm
            
            }
            
          ])
          .then(res => console.log("response " + res))
          .catch(e => console.log("error "+e));
        }
      })
      .catch(e => console.log("error"+ e));
    }}

    getSteps(){
      this.health.query({
        startDate: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000), // cu 10 zile in urma
        endDate: new Date(), // data curenta
        dataType: 'steps',
        limit: 1000
      }).then(data =>{
        console.log(data);
        data.forEach(item => {
          this.stepsArray.push({date: item.startDate.toISOString(), count: item.value})
        });
        if(this.stepsArray.length){
          this.hasData = true
        }
      }).catch(e => {
        console.log("error "+ e);
      })
    }

    getAggregatedSteps(){
      this.health.queryAggregated({
        startDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // ten days ago
        endDate: new Date(), // now
        dataType: 'steps',
        bucket: 'week'
      }).then(data=>{
        console.log(data);
        data.forEach(item => {
            this.stepsAgregated.push({start: item.startDate, end: item.endDate, count: item.value})
        });
      }).catch(e => {
        console.log("error "+ e);
      })
    }
  }


  // this.health.isAvailable().then((available:boolean) => {
  //   console.log(avaible);
  //   this.health.requestAuthorization([
  //     'distance', 'pulse', 
  //     {
  //       read: ['steps'],
  //       write: ['height' , 'weight']
  //     }
  //   ])
  //   .then(res => console.log(res))
  //   .catch(e => console.log(e));
  // })
  // .catch(e => console.log(e));

// }


