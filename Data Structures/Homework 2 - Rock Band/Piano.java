/*
 * Piano.java
 */

package assign3;


public class Piano extends Instrument{

    private static InstString[][] pStrings; //2D array of strings
    
    public Piano(int numNotes){
     
    	pStrings = new PianoString[numNotes][3];
    	
    	for(int i = 0; i<numNotes;i++) {
    		pStrings[i][0]= new PianoString(440.0*(Math.pow(2, ((i-24)/12.0))));
    		pStrings[i][1]= new PianoString((440.0*(Math.pow(2, ((i-24)/12.0))))+.45);
    		pStrings[i][2]= new PianoString((440.0*(Math.pow(2, ((i-24)/12.0))))-.45);
    		
    	}
    	
    	
    }
    public void playNote(int index){
    	pStrings[index][0].pluck();
    	pStrings[index][1].pluck();
    	pStrings[index][2].pluck();
    }
    
    public double ringNotes(){
          double sample = 0;
    	
    	for(int i=0;i<pStrings.length;i++) {
    		sample= sample
    				+pStrings[i][0].sample()
    				+pStrings[i][1].sample() 
    				+pStrings[i][2].sample();
    		
    		pStrings[i][0].tic();
    		pStrings[i][1].tic();
    		pStrings[i][2].tic();
    	}
    	
    	return sample;
    
    }
    }
			    


