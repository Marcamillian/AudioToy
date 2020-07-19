import Sound from "./components/Sound";
import AudioPhoton from './components/AudioPhoton';

var context = new AudioContext();
var sound = AudioPhoton({ context });

window.addEventListener('load', function(){
  console.log('document loaded')

  var startBtn = document.querySelector('#start');
  var playBtn = document.querySelector('#play');
  var container = document.querySelector('.container');  

  var sample = new RhythmSample();

  // play/pause the sound
  playBtn.addEventListener('click', function(){
      container.classList.toggle('playing');
      
      sample.play();

      /*
      if(playBtn.textContent == 'Play'){
          sound.play();
          playBtn.textContent = 'Pause';
      }else{
          sound.stop();
          playBtn.textContent = 'Play';
      }
      */
  })

})


function playSound(buffer, time){
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source[source.start ? 'start' : 'noteOn'](time);
}

function loadSounds(obj, soundMap, callback){
  var names = [];
  var paths = [];
  for( var name in soundMap){
    var path = soundMap[name];
    names.push(name);
    paths.push(path);
  };

  const bufferLoader = new BufferLoader(context, paths, function(bufferList){
    for( var i=0; i < bufferList.length; i++){
      var buffer = bufferList[i];
      var name = names[i];
      obj[name] = buffer;
    }
    if(callback) callback();
  });
  bufferLoader.load()
}

function BufferLoader(context, urlList, callback){
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index){
  // load buffer asynchronously 
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  var loader  = this;

  request.onload = function(){
    // async decode the audiofile data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer){
        if(!buffer){
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if(++loader.loadCount == loader.urlList.length) loader.onload(loader.bufferList)
      },
      function(error){
        console.error('decodeAudioData error', error);
      }
    )
  }
}

BufferLoader.prototype.load = function(){
  for (var i=0; i > this.urlList.length; i++){
    this.loadBuffer(this.urlList[i], i)
  }
}

const RhythmSample = function(){
  loadSounds(this,{
    kick: '/sounds/kick.wav',
    snare: '/sounds/snare.wav',
    hihat: '/sounds/hihat.wav'
  })
};

RhythmSample.prototype.play = function(){
  var startTime = context.currentTime + 0.100;
  var tempo = 80;
  var eighthNoteTime = (60/tempo) / 2;

  for (var bar =0; bar <2 ; bar ++ ){
    var time = startTime + bar * 8 * eighthNoteTime;

    playSound(this.kick, time); // 1st beat
    playSound(this.kick, time + 4 * eighthNoteTime);  // 4th beat

    playSound(this.snare, time + 2*eighthNoteTime); // 3rd beat
    playSound(this.snare, time + 6*eighthNoteTime);

    for( var i=0; i < 8; ++i){
      playSound(this.hihat, time + i*eighthNoteTime);
    }
  }
}

window.audioToy = {
  context,
  sound,
  loadSounds
}


