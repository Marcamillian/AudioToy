import Sound from "./components/Sound";
import AudioPhoton from './components/AudioPhoton';
import BufferLoader from './components/BufferLoader';

var context = new AudioContext();
var sound = AudioPhoton({ context });

window.addEventListener('load', function(){
  console.log('document loaded')

  var startBtn = document.querySelector('#start');
  var playBtn = document.querySelector('#play');
  var container = document.querySelector('.container');  

  //var sample = new RhythmSample();

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

var sampleList = {
  'hihat':'/sounds/hihat.wav',
  'kick':'/sounds/kick.wav',
  'snare':'/sounds/snare.wav'
};
var bufferLoaded = ()=>{ console.log('done a thing')};

var buffers = new BufferLoader({context, 'urlList':sampleList})

buffers.loadAllOnList()
.then(()=>{
  console.log('all samples loaded')
});


window.audioToy = {
  context,
  sound,
  buffers,
}


