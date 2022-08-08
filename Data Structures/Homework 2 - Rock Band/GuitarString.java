/*
 * GuitarString.java
 *
 */

package assign3;
import java.lang.Math;

public class GuitarString extends InstString{
	
    public GuitarString(){};
   
 
    public GuitarString(double frequency) {	
    	
    int N = (int) (44100/frequency);
    ring = new RingBuffer(N);
    while(N>0) {
    ring.enqueue(0);
    N--;
    }
    
    }

    public GuitarString(double[] init) {
    	ring= new RingBuffer(init.length);
    	for(int i=0;i<init.length;i++) {
    		ring.enqueue(init[i]);
    	}
    	
    }
   
    public void pluck() {	
    	for(int i =0;i<ring.getSize();i++) {
    	ring.dequeue();
    	ring.enqueue(Math.random()-.5);
    	}
    }
   
    public void tic() {
    	double n;
    	n= ring.dequeue();
    	ring.enqueue(((n+ring.peek())/2)*.996);
    	time++;
    	
    }

}
