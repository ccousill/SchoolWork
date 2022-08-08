/*
 * Instrument.java
 */
package assign3;

public abstract class Instrument {
    
    protected  InstString[] strings;
    
    
    public void playNote(int i){
    	strings[i].pluck();
    	
    }

    public double ringNotes(){
    	double sample = 0;
    	
    	for(int i=0;i<strings.length;i++) {
    		
    		sample= sample+strings[i].sample();
    		strings[i].tic();
    		
    	}
    	return sample;
    	
    	
    	
    }

}
