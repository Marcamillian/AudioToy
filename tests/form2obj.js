
const test = require('tape')

let input1 = [
 ["tracks[kick]", "2"],
 ["tracks[kick]", "6"],
 ["tracks[kick]", "8"],
 ["tracks[snare]", "2"],
 ["tracks[snare]", "6"],
 ["tracks[snare]", "9"]
]

let output1 = {
  tracks:{
    kick: [2,6,8],
    snare: [2,6,9]
  }
}

let input2 = [
   ["tracks[what][kick]", "2"],
   ["tracks[what][kick]", "6"],
   ["tracks[what][kick]", "8"],
   ["tracks[what][snare]", "2"],
   ["tracks[what][snare]", "6"],
   ["tracks[what][snare]", "9"]
  ]
  
  let output2 = {
    tracks:{
      what:{
        kick: [2,6,8],
        snare: [2,6,9]
      }
    }
  }


const formToObject = ( inputArray )=>{
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



  return output;
}

const thing = formToObject(input2)


test('Check test proces', (t)=>{
  t.ok(true, "testing this")
  t.end()
})
