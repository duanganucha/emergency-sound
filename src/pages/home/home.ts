import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  listItems = ['police', 'ambulance', 'fire', 'alarm']

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
      this.nativeAudio.preloadSimple(sound, `assets/sound/${sound}.mp3`);
    },error =>{
      console.log('Platform not ready :.'+ error)
    })

    this.nativeAudio.play(sound, () => console.log('uniqueId1 is done playing'));

  }

  stopSound(sound){
    this.plt.ready().then((readySource) => {
      this.nativeAudio.preloadSimple(sound, `assets/sound/${sound}.mp3`);
    },error =>{
      console.log('Platform not ready :.'+ error)
    })

    this.nativeAudio.stop(sound).then();
  }

  stopAll(currentPlaySound){
    this.plt.ready().then((readySource) => {
      this.nativeAudio.preloadSimple(currentPlaySound, `/assets/sound/${currentPlaySound}.mp3`);
    },error =>{
      console.log('Platform not ready :.'+ error)
    })
    this.nativeAudio.stop(currentPlaySound).then();

  }

  ionViewWillLeave(){
    if(this.currentPlaySound != ''){
      this.stopAll(this.currentPlaySound);
    }
  }

}
