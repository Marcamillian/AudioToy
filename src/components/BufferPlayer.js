import stampit from '../../node_modules/stampit';

// feed it buffers and it can play them

const BufferPlayer = stampit({
  props:{
    context: null,
    tempo: 80,
    buffers:{}
  },
  init({context = this.context, soundBuffers= {}}){
    this.context = context;
    this.buffers = soundBuffers;
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
      var eighthNoteTime = ( 60 / this.tempo) /2;

      for (var bar=0; bar < 2 ; bar++){
        var time = startTime + bar*8 *eighthNoteTime;

        // beats 1 & 5
        this.playSoundAt(this.buffers.kick, time);
        this.playSoundAt(this.buffers.kick, time + 4*eighthNoteTime);

        // beats 3 & 7
        this.playSoundAt(this.buffers.snare, time + 2*eighthNoteTime);
        this.playSoundAt(this.buffers.snare, time + 6*eighthNoteTime);

        // every beat 
        for( var i=0; i < 8; ++i ){
          this.playSoundAt(this.buffers.hihat, time + i*eighthNoteTime);
        }

      }
    }
  }

})

export default BufferPlayer;