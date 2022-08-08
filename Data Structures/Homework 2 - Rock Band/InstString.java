/*
 * InstString.java
 *
 */
//assign 3 cos 126 compile everything here
//javac cos126/*.java
//javac assign3/*.java




package assign3;

public abstract class InstString{
	RingBuffer ring;
	int time=0;
    /* To be implemented by subclasses*/
    public abstract void pluck();
    public abstract void tic();

    public double sample(){
        return ring.peek();
    }
    public int time(){
    	return time;
    }

}
