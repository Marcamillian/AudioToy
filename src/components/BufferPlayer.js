import stampit from '../../node_modules/stampit';

// feed it buffers and it can play them

const BufferPlayer = stampit({
  props:{
    context: null,
    tempo: 80,
    buffers:{},
    bufferTracks:{}
  },
  init({context = this.context, soundBuffers= {}}){
    this.context = context;
    this.buffers = soundBuffers;
    // create a track for each buffer loaded
    Object.keys(soundBuffers).forEach((key)=>{
      this.bufferTracks[key] = new Array(16);
    })
  },
  methods:{
    playSoundAt(buffer, time){
      var source = this.context.createBufferSource();
      source.buffer = buffer;
      source.connect(this.context.destination);
      source[source ? 'start' : 'noteOn'](time)
    },
    play(){
      var startTime = this.context.currentTime + 0.100;
      var sixteenthNoteTime = ( 60 / this.tempo) /4;

      Object.entries(this.bufferTracks).forEach(([key, beats])=>{
         beats.forEach( (playNote, index) =>{
            if(playNote == true){
              this.playSoundAt(this.buffers[key], startTime + index*sixteenthNoteTime)
            }
         })
      })
    },
  }

})

export default BufferPlayer;