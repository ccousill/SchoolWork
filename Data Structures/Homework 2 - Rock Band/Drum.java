/*
 * Drum.java
 */
package assign3;

public class Drum extends Instrument{

    public Drum(int numNotes){
    	
    		
        	strings = new DrumString[numNotes];
        	
        	for(int i = 0; i<numNotes;i++) {
        	
        		strings[i]= new DrumString(440.0*(Math.pow(2, ((i-24)/12.0))));
        		
        	
        	
        	
        }	
    }		    
}
