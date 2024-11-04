# FinalCoding_XiaoyangYu_xiyu0131
 A repo for individual work in final project. This is on **audio** branch.  
   

# **Instruction**: 
Click on the screen to play the music. When the music is being played, clicking on the screen will restart the music. The lines will be flashing with certain frequency of the music.  
When the window is resized, the shapes will be automatically resized.  
And when the page is refreshed, the color of the shapes will change randomly.  
  
# **Details of individual approach**:  
1. I chose audio to drive the code.  
2. The opacity of the middle layer, the rectangle, is animated. This is unique from other members' code, because of several reasons. Firstly, the color of the base layer, the lines, is changed into white, to create contrast with background. Secondly, the background color and middle layer color are changed into black, to be merged together. Thirdly, when the music controls the opacity of middle layer, the hidden base layer, the lines will be flashing, which is different from the original design.  
  
**Inspiration**:  
I used the music, Never Fade Away, from the game Cyberpunk 2077's soundtrack. The animation is also inspired by the game's style, the high contrasting colors, the flashing lines simulating the lights in a high-tech future city. Here are several images from the game.
![Cyberpunk 2077](https://exputer.com/wp-content/uploads/2023/06/Cyberpunk-2077.jpg)
![Cyberpunk 2077](https://us.v-cdn.net/6036147/uploads/6MBL528YFKSR/how-phantom-liberty-will-change-cyberpunk-2077-281-29.jpg)  
  
**Technical discussion**:   
In this code, i used a technique learn outside the class, which is fft.getEnergy(). This method can analyze specific frequency range in the audio file. I store the analyzing results in a variable, and use this variable to visualize the audio by animating the shapes with it. Also, i used map() to map the sound frequency with the opacity of the middle layer, so that it will be flashing. Here are the link to the sources of the fft.getEnergy() technique.  
[fft.getEnergy()](https://editor.p5js.org/creativecoding/sketches/rGgiKussB)
[Use getEnergy to change opacity](https://editor.p5js.org/SiriPothuri/sketches/hnGXi3Rn6)

