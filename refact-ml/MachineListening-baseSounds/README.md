# Music and AI Final Project
## Machine Listening and Response Generation
For my music and AI final project, I aim to create a machine listening that takes in information from microphone input and returns a melodic response. 

## Code References
Two repos in particular I have drawn upon so far for basic set up.
### Microphone Input
- For microphone input, I based my implementation and took code from this website: https://editor.p5js.org/ml5/sketches/H8iUid_ADl. This was a fun implementation of pitch and midi note detection based on p5js pitch detection and ml5 using the crepe method where the details for this can be found: https://github.com/ml5js/ml5-library. There are many tutorials online that use this library for instrument tuning such as this one: https://www.youtube.com/watch?v=PCf0fjR1tUk. If I am not mistaken, this implementation is based off of tensorflow.js and it is decently accurate. 
- The tone recognition is a neural network called CREPE which stands for 'Convolutional Representation for Pitch Estimation' which can be read more about at this github: https://github.com/marl/crepe

### Connecting Web to Sonic pi
- For sending messages to sonic pi from the web based on a local server, I based my implementation and took code from a youtube creator who implemented a drum beat generator on a web application. His video describing his implementation is here: https://www.youtube.com/watch?v=9GHz_-xZPQs&t=45s. The github repo, under the name MrBombMusic can be found here: https://github.com/mrbombmusic/sonic-pi-drum-rnn-gui. From this repo, I learned how to send messages from a web based application to sonic pi. 
- for the browser to connect to sonic pi, one will need to download this repo: https://github.com/genekogan/p5js-osc from the github user Genekogan. OSC stands for open sound control. This is a p5js implementation based off of the osc-web application as described in the readme of this repo. 

### Sonic Pi references
- For some random note generation, I found this cool implementation for random numbers based on Time from this website: https://in-thread.sonic-pi.net/t/randomizing-the-random-seed-with-computer-clock-timer/5560. It is cited in the code function as well. 
- For some scale functionality, I referenced some of these functions outlined in this github: https://github.com/sonic-pi-net/sonic-pi/blob/dev/etc/doc/tutorial/08.3-Scales.md. Wherever referenced, cited in the sonic pi files accordingly. 

## How to run the code
- clone this repo
-- $ git clone https://github.com/emilie-coder/MusicAIFinal.git
- clone the p5js-osc repo
-- $ git clone https://github.com/genekogan/p5js-osc
-- $ cd p5js-osc/
-- $ npm install
- Then you have to start the node
-- node bridge.js
- This will run in terminal and will not print anything until something is connected.
- Open sonic pi and paste in the ruby file into one of the documents
- Then in the music and ai repo, you will need to have vs code and use a live server renderer on index.html. 
- The node bridge should print 'connection' and in sonic pi, there should be some connection messages as well. Everything we send from the web gui should print out in sonic pi if all goes right. 
## Sound Inspiration:
The goal for this music creation is to create a dream scape that allows for live audio input and a generative response based on the input.
Some of the musical inspirations I have taken from if anyone is interested include:
- https://youtu.be/gyye6OHUEhU
- https://youtu.be/AUqQom58_Hs
- https://youtu.be/h8QjGO0g_zM

These are very ambient soundscapes with high verb and a particular sound of space. 

## Checkpoints through the project
The information to build applications lie this are spread out thin. I had to do some scraping but seem to have found some methods that work.

### Checkpoint 1
The first checkpoint was to get a microphone working and tone recognition. This was mentioned in the code inspiration and the implementation was taken directly from the https://editor.p5js.org/ml5/sketches/H8iUid_ADl website, which I highly reccomend checking out. It is a fun implementation of pitch recognition which draws circles and colors them based on the pitch and strength of the note detected. From this, I was able to implement a recording function that lists out an estimation of the midi notes detected. I save them in a list, and made some buttons to start and pause the recording of the microphone. 

### Checkpoint 2
The second checkpoint was to send this list created from p5js to sonic pi to play. There were some interesting issues with the list as well that I am still attempting to resolve such as the number of samples the pitch detector is being called and anticipate having to switch over to the MMLL repo which is also based off of p5js and is a Musical Machine Listening library found here: https://github.com/sicklincoln/MMLL which is from Nick Collins. So far though, this checkpoint works and it sends the estimated pitches to sonic pi successfully.

### Checkpoint 3
Currently working on this part. The goals for checkpoint 3 is to refine the microphone input by either applying a filter with javascript or obtaining a better microphone. This checkpoint also includes the goal to have the base track and to play the input over the base track. 

The main problems encountered are:
- output of the tone recognition is messy (patched with some arbitrary simple code to prevent multiple repeating notes added)
- no beat recognition (currently solving)

### Checkpoint 3.5 
For the base generation, I transcibed parts of this song https://www.youtube.com/watch?v=JHPSE0GrDqI which is Nissan - song in E flat major for piano, and slowed it down to create the underlying music

### Checkpoint 4
Create a generative response from the refined input.

### Checkpoint 5
Create a back and forth system, perhaps timed.

### Checkpoint 6
Refine user interface

### Checkpoint 7
Stretch goals:
- provide optional and adjustable parameters to users via the GUI web interface that change the algorithm

## Generative Algorithm
For the generative algorithm, we take in the beat and sound output from the microphone. ALgorithm TBD

