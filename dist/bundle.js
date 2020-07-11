'use strict';

class Sound{
  constructor(context){
      this.context = context;
  }

  init(){
      this.oscillator = this.context.createOscillator();
      this.gainNode = this.context.createGain();

      this.oscillator.connect(this.gainNode);
      this.gainNode.connect(this.context.destination);
  }

  play(value){
      this.init();

      this.gainNode.gain.setValueAtTime(0.5, this.context.currentTime);
      this.oscillator.start();
  }

  stop(){
      this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime +1);
      this.oscillator.stop(this.context.currentTime +1);
  }
}

window.addEventListener('load', ()=>{
  console.log('document loaded');

  var context = new AudioContext();
  var sound = new Sound(context);

  sound.init();
  var wave = 'sine';

  var buttons = document.querySelectorAll('.waveform');
  var playBtn = document.querySelector('#play');
  var container = document.querySelector('.container');

  // select the type of waveform
  buttons.forEach(function(button){
      button.addEventListener('click', function(){
          cleanClass('active');
          wave = button.dataset.wave;
          sound.oscillator.type = wave;
          button.classList.add('active');
      });
  });

  // play/pause the sound
  playBtn.addEventListener('click', function(){
      container.classList.toggle('playing');

      if(playBtn.textContent == 'Play'){
          sound.play();
          sound.oscillator.type = wave;
          playBtn.textContent = 'Pause';
      }else {
          sound.stop();
          playBtn.textContent = 'Play';
      }
  });

  function cleanClass(rclass){
      buttons.forEach(function(button){
          button.classList.remove(rclass);
      });
  }
});
