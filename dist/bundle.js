(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}((function () { 'use strict';

	function createCommonjsModule(fn, basedir, module) {
		return module = {
		  path: basedir,
		  exports: {},
		  require: function (path, base) {
	      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
	    }
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var stampit_min = createCommonjsModule(function (module) {
	!function(){var f,p="roperties",c="ropertyDescriptors",t="static",a="onfiguration",s="p"+p,l="deepP"+p,y="p"+c,d=t+"P"+p,m=t+"DeepP"+p,v=t+"P"+c,h="c"+a,P="deepC"+a,_="deepProps",b="deepStatics",g="deepConf",O="initializers",w="methods",A="composers",D="compose",r="object",S="length",n=Object,j=Array.isArray,x=n.defineProperties,C=n.defineProperty,N=n.getOwnPropertyDescriptor,e=n.getOwnPropertySymbols,z=Array.prototype,o=z.concat,E=z.slice;function I(t){return n.getOwnPropertyNames(t).concat(e?e(t):[])}function i(t,r){return E.call(arguments,2).reduce(t,r)}var R=i.bind(0,function t(r,n){if(n)for(var e,o=I(n),i=0;i<o.length;i+=1)e=N(n,o[i]),C(r,o[i],e);return r});function V(t){return "function"==typeof t}function k(t){return t&&typeof t==r||V(t)}function q(t){return t&&typeof t==r&&t.__proto__==n.prototype}var B=i.bind(0,function t(r,n){if(n===f)return r;if(j(n))return (j(r)?r:[]).concat(n);if(!q(n))return n;for(var e,o,i=I(n),u=0;u<i[S];)e=i[u++],(o=N(n,e)).hasOwnProperty("value")?o.value!==f&&(r[e]=t(q(r[e])||j(n[e])?r[e]:{},n[e])):C(r,e,o);return r});function F(){return (p=o.apply([],arguments).filter(function(t,r,n){return V(t)&&n.indexOf(t)===r}))[S]?p:f}function u(t){return p=function t(){return function t(r){var n,e,o=t[D]||{},i={__proto__:o[w]},u=o[O],p=E.apply(arguments),c=o[l];if(c&&B(i,c),(c=o[s])&&R(i,c),(c=o[y])&&x(i,c),!u||!u[S])return i;for(r===f&&(r={}),o=0;o<u[S];)V(n=u[o++])&&(i=(e=n.call(i,r,{instance:i,stamp:t,args:p}))===f?i:e);return i}}(),(c=t[m])&&B(p,c),(c=t[d])&&R(p,c),(c=t[v])&&x(p,c),c=V(p[D])?p[D]:H,R(p[D]=function(){return c.apply(this,arguments)},t),p}function G(n,e){function t(t,r){k(e[t])&&(k(n[t])||(n[t]={}),(r||R)(n[t],e[t]));}function r(t){(p=F(n[t],e[t]))&&(n[t]=p);}return e&&k(e=e[D]||e)&&(t(w),t(s),t(l,B),t(y),t(d),t(m,B),t(v),t(h),t(P,B),r(O),r(A)),n}function H(){return u(o.apply([this],arguments).reduce(G,{}))}function J(t){return V(t)&&V(t[D])}var K={};function L(t,r){return function(){return (a={})[t]=r.apply(f,o.apply([{}],arguments)),((p=this)&&p[D]||c).call(p,a)}}K[w]=L(w,R),K[s]=K.props=L(s,R),K[O]=K.init=L(O,F),K[A]=L(A,F),K[l]=K[_]=L(l,B),K[d]=K.statics=L(d,R),K[m]=K[b]=L(m,B),K[h]=K.conf=L(h,R),K[P]=K[g]=L(P,B),K[y]=L(y,R),K[v]=L(v,R),c=K[D]=R(function t(){for(var r,n,e=0,o=[],i=arguments,u=this;e<i[S];)k(r=i[e++])&&o.push(J(r)?r:((a={})[w]=(n=r)[w]||f,c=n.props,a[s]=k((p=n[s])||c)?R({},c,p):f,a[O]=F(n.init,n[O]),a[A]=F(n[A]),c=n[_],a[l]=k((p=n[l])||c)?B({},c,p):f,a[y]=n[y],c=n.statics,a[d]=k((p=n[d])||c)?R({},c,p):f,c=n[b],a[m]=k((p=n[m])||c)?B({},c,p):f,p=n[v],a[v]=k((c=n.name&&{name:{value:n.name}})||p)?R({},p,c):f,c=n.conf,a[h]=k((p=n[h])||c)?R({},c,p):f,c=n[g],a[P]=k((p=n[P])||c)?B({},c,p):f,a));if(r=H.apply(u||z,o),u&&o.unshift(u),j(i=r[D][A]))for(e=0;e<i[S];)r=J(u=i[e++]({stamp:r,composables:o}))?u:r;return r},K),K["create"]=function(){return this.apply(f,arguments)},(a={})[d]=K,z=H(a),c[D]=c.bind(),c.version="4.3.1",module.exports=c;}();
	});

	/*
	== state == 
	context
	gainNode
	oscillator

	== methods == 
	play() 
	stop()
	*/

	const AudioPhoton = stampit_min({
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
	        this.oscillator.start();
	      }
	      this.gainNode.connect(this.context.destination);
	    },
	    stop(){
	      this.gainNode.disconnect(this.context.destination);
	    }
	  }
	});

	// centralised responsitory of the sound buffers to play
	const BufferLoader = stampit_min({
	  props:{
	    context: null,
	    urlList: {},
	    onload: null,
	    bufferList: {},
	    loadCount: 0
	  },
	  init({context = this.context, urlList, callback}){
	    this.context = context;
	    this.urlList = urlList;
	    this.onload = callback;
	  },
	  methods:{
	    loadBuffer(key, url){
	      var loader = this;

	      return fetch(url)
	      // pick off the arrayBuffer response
	      .then( function(response){ return response.arrayBuffer() })
	      // decode the data
	      .then( loader.decodeAudioData )
	      // store the data on the loader
	      .then( function(buffer){
	        if(!buffer) throw new Error(`error decoding file data from: ${url}`)
	        loader.bufferList[key] = buffer;
	      })
	    },
	    loadAllOnList(){
	      var loader = this;

	      var bufferPromises = Object.entries(this.urlList).map( function([key, url]){
	        return loader.loadBuffer(key, url);
	      });

	      return Promise.all(bufferPromises)
	    }
	  }
	});

	var context = new AudioContext();
	var sound = AudioPhoton({ context });

	window.addEventListener('load', function(){
	  console.log('document loaded');

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
	      }else {
	          sound.stop();
	          playBtn.textContent = 'Play';
	      }
	      
	  });

	});

	var sampleList = {
	  'hihat':'/sounds/hihat.wav',
	  'kick':'/sounds/kick.wav',
	  'snare':'/sounds/snare.wav'
	};

	var buffers = new BufferLoader({context, 'urlList':sampleList});

	buffers.loadAllOnList()
	.then(()=>{
	  console.log('all samples loaded');
	});


	window.audioToy = {
	  context,
	  sound,
	  buffers,
	};

})));
