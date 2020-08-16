import BufferPlayer from './../components/BufferPlayer';
import BufferLoader from './../components/BufferLoader';

const template  = document.createElement('template')
template.innerHTML = `
  <form class="tracker-form" action="/track" method="post">
    <table class="tracker-container">
    </table>
    <input type="submit">
  </form>
`

export default class TrackerElement extends HTMLElement{

  constructor(){
    super()
  }

  render(){
    let trackerTable = this.shadowRoot.querySelector('.tracker-container');

    let sampleNames = Object.keys(JSON.parse(this.dataset.tracks))
    let beatCount = parseInt(this.dataset.beatcount);

    trackerTable.appendChild( this.genTrackerHeader(beatCount))

    sampleNames.forEach( (rowName, index)=>{
      trackerTable.appendChild( this.genTrackerRow(index, rowName, beatCount) )
    })

  }

  connectedCallback(){
    let shadowRoot = this.attachShadow({mode:'open'})

    // clone the template
    let instance = template.content.cloneNode(true)
    shadowRoot.appendChild(instance)

    // styling on the container
    this.style.display = 'block'

    let sampleList = JSON.parse(this.dataset.tracks)
    // extract the attrubutes from the container
      // get track names and url list
      // get context for sounds
    let context = new AudioContext()
    let bufferLoader = new BufferLoader({'context':new AudioContext(), 'urlList':sampleList})
    
    bufferLoader.loadAllOnList()
    .then( ()=>{
      this.bufferPlayer = new BufferPlayer({ context, soundBuffers: bufferLoader.bufferList});

    })  

    this.render()
  }

  genTrackerRow(index, trackName, ticks){

    // create a row
    let newRow = document.createElement('tr')

    // create the label for the element
    let rowLabel = document.createElement('td');
    rowLabel.textContent = trackName;

    newRow.appendChild(rowLabel)

    // fill with appropriate checkboxes (16 for 16 beats)
    for (var i=0; i < ticks; i++ ){
      let beatContainer = document.createElement('td')

      let beatCheckbox = document.createElement('input')
      beatCheckbox.setAttribute('type','checkbox')
      beatCheckbox.setAttribute('name', `tracks[${trackName}]`)
      beatCheckbox.setAttribute('value', i);
      
      beatContainer.appendChild(beatCheckbox)
      newRow.appendChild(beatContainer)
    }

    return newRow;
  }

  genTrackerHeader(ticks){
    let newHeader = document.createElement('tr');

    let beatName = document.createElement('th')
    beatName.innerText = 'Sample Name'
    newHeader.appendChild(beatName)

    for( var i=1; i<= ticks; i++){
      let beatNumber = document.createElement('th')
      beatNumber.innerText = i
      newHeader.appendChild(beatNumber)
    }

    return newHeader;
  }

  formDataToObject = ( inputArray )=>{
    let output = {
      root:{},
      target: null,
      lastIndex: null,
      previousKey: null,
    };
    
    let formArray = inputArray.map( ([name, value])=>{
      let separatedName = name.replace(/]/g,'').split('[');
      return separatedName.concat(value)
    })
  
    // for each input row
    formArray.forEach(function( inputArray, rowIndex ){
        this.lastIndex = Math.max(inputArray.length-1, 0)
  
        // for each input in row
        inputArray.forEach( function(inputValue, entryIndex) {
  
          if(this.target == null) this.target = this.root;
  
          if( entryIndex == this.lastIndex ){
              // set the last as an index
              if( Array.isArray( this.target )){
                this.target.push( inputValue )
              }else{
                throw new Error('should have been an array')
              }
              // clear up for next row
              this.target = null
              this.lastIndex = null
              this.previousKey = null
          }else{
  
            // add the object key 
            if( !(inputValue in this.target)){
              if( this.lastIndex == entryIndex + 1){
                this.target[ inputValue ] = []
              }else{
                this.target[inputValue] ={}
              }
            }
            this.target = this.target[inputValue]
            this.previousKey = inputValue;
          }
        
        },output)
    }, output)
  
    return output.root;
  }

  playLoop =()=>{
    // get the track data 
    // 
  }
  
}

TrackerElement.prototype.getData = function(){
  let form = this.shadowRoot.querySelector('form')

  let formData = new FormData(form);
  let formDataArray = new Array(...formData);

  let trackObject = this.formDataToObject(formDataArray);

  return trackObject;
}