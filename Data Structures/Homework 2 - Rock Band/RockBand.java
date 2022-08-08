/*
 * RockBand.java
 *

Christopher Cousillas
I pledge my honor that I have abided by the Stevens Honor System
4/9/19



 */


package assign3;
import cos126.StdDraw;
import cos126.StdAudio;
import java.io.IOException;
import java.util.ArrayList;

public class RockBand {


    
   
    public static void main(String[] args) {
    	/*
    	int N = Integer.parseInt(args[0]);
   	  double[] samples = {.2,.4,.5,.3,-.2,.4,.3,.0,-.1,-.3};
   	  GuitarString testString = new GuitarString(samples);
   	  for (int i =0; i<N;i++) {
   		  int t = testString.time();
   		  double sample = testString.sample();
   		  System.out.printf("%6d %8.4f\n",t,sample);
   		  testString.tic();
   		  
   		  
   	  }
    	*/

    	String guitarBassKeyboard ="`1234567890-=qwertyuiop[]\\asdfghjkl;'";
        String pianoKeyboard = "~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:\"";
        String drumKeyboard = "ZXCVBNM<>?zxcvbnm,.";
    	
    	
    	
    	Instrument guitar = new Guitar(37);
        Instrument bass = new Bass(37);
        Instrument piano =  new Piano(37);
        Instrument drum = new Drum(19);
        int i=1;
        while(true) {
        	
    		if(StdDraw.hasNextKeyTyped()) {
    			char key = StdDraw.nextKeyTyped();
    			
    	        char numb = '\n';
    			if(key==numb) {
    	    	
    				i++;
    	    	
    			}
    	    	
    			if((guitarBassKeyboard.indexOf(key)>=0) && (i%2==0)) {
    				bass.playNote(guitarBassKeyboard.indexOf(key));
    			}
    	    		
    			if((guitarBassKeyboard.indexOf(key)>=0) && (i%2==1)) {
    			
    				guitar.playNote(guitarBassKeyboard.indexOf(key));
    			}   	    		
    	    
    			if(pianoKeyboard.indexOf(key)>=0) {
    				piano.playNote(pianoKeyboard.indexOf(key));
    			}
    	    	
    			if(drumKeyboard.indexOf(key)>=0) {
    				drum.playNote(drumKeyboard.indexOf(key));
    			}
    	    	
    		}	
    		
    			
    		double sumOfAllInstrumentSamples= drum.ringNotes() + piano.ringNotes() + bass.ringNotes() + guitar.ringNotes();
          
    		
    		StdAudio.play(sumOfAllInstrumentSamples);
    			
    		}

    			
        }

    }
    
  


