import Sound from "./components/Sound";
import AudioPhoton from './components/AudioPhoton';
import BufferLoader from './components/BufferLoader';
import BufferPlayer from './components/BufferPlayer';

var context = new AudioContext();
var sound = AudioPhoton({ context });

window.addEventListener('load', function(){
  console.log('document loaded')

  var startBtn = document.querySelector('#start');
  var playBtn = document.querySelector('#play');
  var playRhythmBtn = document.querySelector('#play-rhythm');
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

  playRhythmBtn.addEventListener('click',function(){
    bufferPlayer.play()
  })

})

var sampleList = {
  'hihat':'/sounds/hihat.wav',
  'kick':'/sounds/kick.wav',
  'snare':'/sounds/snare.wav'
};

var bufferLoader = new BufferLoader({context, 'urlList':sampleList})

bufferLoader.loadAllOnList()
.then(()=>{
  console.log('all samples loaded')
});

var bufferPlayer = new BufferPlayer({context, soundBuffers: bufferLoader.bufferList})


window.audioToy = {
  context,
  sound,
  bufferLoader,
  bufferPlayer
}


