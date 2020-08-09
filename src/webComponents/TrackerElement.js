import BufferPlayer from './../components/BufferPlayer';

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

    // apply the attributes from the connected 
    
    // add a row for each track that is attached to the element (in attribute?)
    let tracks = {
      'kick': 16,
      'snare': 16
    }

    trackerTable.appendChild( this.genTrackerHeader(16))

    Object.entries(tracks).forEach( ([rowName, beatCount], index)=>{
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

    // extract the attrubutes from the container

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
  
}

TrackerElement.prototype.getData = function(){
  let form = this.shadowRoot.querySelector('form')

  var formData = new FormData(form);

  console.log(...formData)

  let formDataArray = new Array(...formData);

  return formDataArray;
}