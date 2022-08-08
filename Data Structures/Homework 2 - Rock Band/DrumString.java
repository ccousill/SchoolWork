/*
 * DrumString.java
 *
 */

package assign3;
import java.lang.Math;


public class DrumString extends InstString{

   
    public DrumString(double frequency) {
    	
    	 int N = (int) (44100/frequency);
    	    ring = new RingBuffer(N);
    	    while(N>0) {
    	    ring.enqueue(0);
    	    N--;
    	    }   	
    	
    }

    public DrumString(double[] init) {
    	ring= new RingBuffer(init.length);
    	for(int i=0;i<init.length;i++) {
    		ring.enqueue(init[i]);
    	}
    }

    public void pluck() {
    	for(int i =0;i<ring.getSize();i++) {
        	ring.dequeue();
        	
        	if(Math.sin(i)>0) {
        	ring.enqueue(0);
        	
        	}
        	else {
        	ring.enqueue(-1);
        	
        	}
    	}
    }
  
    public void tic() {
    	
    	double s1,s2;
    	s1= ring.dequeue();
    	s2= ring.peek();
    	double p = Math.random();
    	time++;
    	if(p<0.2) {
    		ring.enqueue(s1);
    		return;
    	}
    	if(p<0.4) {
    		ring.enqueue(-s1);
    		return;
    	}
    	
    	if(p<0.7) {
    		ring.enqueue(0.5*(s1+s2));
    		return;
    	}
    	
    	if(p<1) {
    		ring.enqueue(-0.5*(s1+s2));
    		return;
    	}	
    	
    	
    }
}
