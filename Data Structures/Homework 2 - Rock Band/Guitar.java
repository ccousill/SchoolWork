/*
 * Guitar.java
 */
package assign3;

public class Guitar extends Instrument{


    public Guitar(int numNotes){
    	strings = new GuitarString[numNotes];
    	
    	for(int i = 0; i<numNotes;i++) {
    	
    		strings[i]= new GuitarString(440.0*(Math.pow(2, ((i-24)/12.0))));
    		
    	}
    	
    	
    }		    
}
