




# Working to load in samples and replay them

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