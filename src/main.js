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

var bufferLoader = new BufferLoader({context, 'urlList':sampleList})
var bufferPlayer;

bufferLoader.loadAllOnList()
.then(()=>{
  console.log('all samples loaded');
  var bufferPlayer = new BufferPlayer({context, soundBuffers: bufferLoader.bufferList});

  document.querySelector('#play-rhythm').addEventListener('click',function(){
    bufferPlayer.play()
  })

  const setDrumLoop = ()=>{
    const kicks = [true,0,0,0,   0,0,0,0,    true,0,0,0,    0,0,0,0];
    const snares = [0,0,0,0,   true,0,0,0,    0,0,0,0,    true,0,true,0]
    const hihats = [true,0,true,0,   true,0,true,0,    true,0,true,0,    true,0,true,0]

    bufferPlayer.bufferTracks['kick'] = kicks
    bufferPlayer.bufferTracks['snare'] = snares
    bufferPlayer.bufferTracks['hihat'] = hihats

    return bufferPlayer;
  }

  setDrumLoop()

  window.audioToy = {
    context,
    sound,
    bufferLoader,
    bufferPlayer,
    setDrumLoop
  }
});





