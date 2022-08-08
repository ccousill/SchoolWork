/*
 * Bass.java
 */
package assign3;

public class Bass extends Instrument{


    public Bass(int numNotes){
    	
    	strings = new GuitarString[numNotes];
    	
    	for(int i = 0; i<numNotes;i++) {
    	
    		strings[i]= new GuitarString(440.0*(Math.pow(2, ((i-48)/12.0))));
    		
    	
    	
    	
    }
    }		    
}
