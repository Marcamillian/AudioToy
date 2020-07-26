import stampit from '../../node_modules/stampit';

// centralised responsitory of the sound buffers to play
const BufferLoader = stampit({
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
      .then( function(arrayBuffer){
        return loader.context.decodeAudioData(arrayBuffer)
      })
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
      })

      return Promise.all(bufferPromises)
    }
  }
}) 

export default BufferLoader;
