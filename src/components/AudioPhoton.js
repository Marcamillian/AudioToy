import {stampit} from 'stampit';

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
    this.gainNode.connect(this.context.destination);
  },
  methods:{
    play(){
      this.gainNode.gain.setValueAtTime(0.5, this.context.currentTime);
      this.oscillator.start()
    },
    stop(){
      this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.contex.currentTime+1);
      this.oscillator.stop(this.context.currentTime+1)
    }
  }
})

export default AudioPhoton;