import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';


@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {

  moreSoundLists = ['alarm','alarm2','alarm3','alarm4','alarm5','Ambulance_Siren_Distant','Ambulance_Siren_Distant1','Ambulance_Siren_Distant2','ambulance0','ambulance1','ambulance2','ambulance3','Dosimeter_Alarm','Dosimeter_Alarm1','Dosimeter_Alarm2','Dosimeter_Alarm3','Emergency_Siren_Close_Long','Emergency_Siren_Short_Burst','Police_Siren']

  selectItem = false;
  selectItemName = '';
  currentPlaySound = '';
  constructor( private nativeAudio: NativeAudio , private plt : Platform ){}


  onClick(item){

    
    if(this.selectItemName == item ){
      this.selectItemName = ''
      this.stopSound(this.currentPlaySound);
      this.selectItem = false
    }else{   
      this.selectItem = !this.selectItem;
      this.selectItemName = item;
      this.stopSound(this.currentPlaySound)
      this.playSound(this.selectItemName)
      this.currentPlaySound = this.selectItemName;
    }

    console.log(this.selectItemName)
    console.log(this.selectItem)
  
  }

  playSound(sound){

    this.plt.ready().then((readySource) => {
      this.nativeAudio.preloadSimple(sound, `assets/sound/more/${sound}.mp3`);
    },error =>{
      console.log('Platform not ready :.'+ error)
    })

    this.nativeAudio.play(sound, () => console.log('uniqueId1 is done playing'));

  }

  stopSound(sound){
    this.plt.ready().then((readySource) => {
      this.nativeAudio.preloadSimple(sound, `assets/sound/more/${sound}.mp3`);
    },error =>{
      console.log('Platform not ready :.'+ error)
    })

    this.nativeAudio.stop(sound).then();
  }

  stopAll(){
    this.plt.ready().then((readySource) => {
      this.nativeAudio.preloadSimple(this.currentPlaySound, `/assets/sound/more/${this.currentPlaySound}.mp3`);
    },error =>{
      console.log('Platform not ready :.'+ error)
    })
    this.nativeAudio.stop(this.currentPlaySound).then();
  }

  ionViewWillLeave(){
    if(this.currentPlaySound != ''){
      this.stopAll();
    }
  }

}
