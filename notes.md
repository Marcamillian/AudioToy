

# Creating the interface for defining when the beats are happening

## 09/08/2020
- I set up an express server and am capturing the POST data
- Grouping creations into beat names but want them grouped into beats->beatName->beatArray
- using this link to do this - https://mattstauffer.com/blog/a-little-trick-for-grouping-fields-in-an-html-form/
 
## 08/08/2020
- Using Web Components to build a tracker element
- Trying to check that form is properly form....ed so that the POST request has array of beats



# Working to play the samples back


## 08/08/2020
Got samples playing back - 

## 26/07/2020

Using the same tutorial from previous to play the sounds
- Samples now playing

# Working to load in samples

## 26/07/2020

Basis for the loading of samples - https://webaudioapi.com/samples/rhythm/

3 files
- shared.js ( reused componets )
  - reused components to
    - load sound into buffer objects
    - create buffer objects
- rhythm-sample.js ( implements loadSounds into an object, specifics of play s )
  - defines soundsd to load,
  - play function plays sounds at the right times
- index.html
  - script block that
    - creates RhythmSample
    - calls play on buttonclick


Adjusted to use fetch() and Promises in the loading of samples

## Before

Using this book to see how to do a simple drum pattern (https://webaudioapi.com/book/Web_Audio_API_Boris_Smus.pdf) page 15 - Sheduling Precise Rhythms