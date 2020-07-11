import stampit from '../../node_modules/stampit';
/*
== state == 
context
gainNode
oscillator

== methods == 
play() 
stop()
*/

const AudioPhoton = stampit({
  props:{
    context: null, // audioContext
    gainNode: null,
    oscillator: null,
    waveform: 'sine',
  },
  init({ context = this.context }){
    this.context = context;
    this.gainNode = this.context.createGain();
    this.oscillator = this.context.createOscillator();

    this.oscillator.type = this.waveform;

    this.oscillator.connect(this.gainNode);
  },
  methods:{
    play(){
      
      if (this.context.state == 'suspended'){
        this.context.resume();
        this.oscillator.start()
      }
      this.gainNode.connect(this.context.destination)
    },
    stop(){
      this.gainNode.disconnect(this.context.destination)
    }
  }
})

export default AudioPhoton;