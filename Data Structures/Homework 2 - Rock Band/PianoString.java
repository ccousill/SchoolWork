/*
 * PianoString.java
 *
 */

package assign3;
import java.lang.Math;

public class PianoString extends InstString {
	 int N;
    public PianoString(double frequency) {

    	 N = (int) (44100/frequency);
    	    ring = new RingBuffer(N);
    	    while(N>0) {
    	    ring.enqueue(0);
    	    N--;
    	    }
    	   N = (int) (44100/frequency);
    	
    }

    public PianoString(double[] init) {
    	
    	ring= new RingBuffer(init.length);
    	for(int i=0;i<init.length;i++) {
    		ring.enqueue(init[i]);
    	}
    	
    }
   
    public void pluck() {
    	for(int i =0;i<N;i++) {
        	ring.dequeue();
        	if(i<(7/(double) 16)*N || i>(9/(double)16)*N) {
        		ring.enqueue(0);
        	}
        	else {
        	ring.enqueue((.25*Math.sin(8*Math.PI*((i/(double)N)-7/(double)16))));
        	}
    	}
    }
   
    public void tic() {	
    	double n;
    	n= ring.dequeue();
    	ring.enqueue((( n+ring.peek())/2.0)*.996);
    	time++;
    }

}
