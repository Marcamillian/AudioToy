import Sound from "./components/Sound";
import AudioPhoton from './components/AudioPhoton';

window.addEventListener('load', ()=>{
  console.log('document loaded')

  var startBtn = document.querySelector('#start');
  var playBtn = document.querySelector('#play');
  var container = document.querySelector('.container');

  var sound = AudioPhoton({context: new AudioContext() });

  // play/pause the sound
  playBtn.addEventListener('click', function(){
      container.classList.toggle('playing');

      if(playBtn.textContent == 'Play'){
          sound.play();
          playBtn.textContent = 'Pause';
      }else{
          sound.stop();
          playBtn.textContent = 'Play';
      }
  })

})
