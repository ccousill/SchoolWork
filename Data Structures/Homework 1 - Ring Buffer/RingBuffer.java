/*****************************************************************************
 *
 *  This is a template file for RingBuffer.java. It lists the constructors and
 *  methods you need, along with descriptions of what they're supposed to do.
 *  
 *  Note: it won't compile until you fill in the constructors and methods
 *        (or at least commment out the ones whose return type is non-void).
 *
 *****************************************************************************/
//Christopher Cousillas
//RingBuffer.java CS 284 hw 2
//3/15/19
//I pledge my honor that I have abided by the Stevens Honor System


public class RingBuffer {
    private int first;            // index of first item in buffer
    private int last;             // index of last item in buffer
    private int size;             // current number of items of buffer
    private double[] buffer;

    // create an empty buffer, with given max capacity
    public RingBuffer(int capacity) {
    	if(capacity <=0) {
    		throw new IllegalArgumentException("capacity out of bounds");
    	}
    	buffer = new double[capacity];
    }

    // return number of items currently in the buffer
    //size of buffer
    public int getSize() {
    	return size;
	     
    }

    // is the buffer empty (size equals zero)?
    // checks if the buffer is empty by size==0
    public boolean isEmpty() {
    	return size==0;
     
    }

    // is the buffer full (size equals array capacity)?
    //uses the buffer length of ring and compares it to size size>length?
    public boolean isFull() {
	int x;
	x=buffer.length;
    	return size>=x;
    }

    // add item x to the end
    // adds an item to the queue that increments the size by one and sets the 
    public void enqueue(double x) {
        if (isFull()) { throw new RuntimeException("Ring buffer"); }

	if(size<buffer.length){
	    size=size+1;
	}
        buffer[last]=x;
        last= (last+1) % buffer.length;
        
    }

    // delete and return item from the front
    //deletes first item and returns fist item in buffer;
    public double dequeue() {
        if (isEmpty()) { throw new RuntimeException("Ring buffer underflow"); }
        int x = buffer.length;
        double y = buffer[first];
        size=size-1;
        first = (first + 1) % x;
        return y;
       
    }

    // return (but do not delete) item from the front
    public double peek() {
        if (isEmpty()) { throw new RuntimeException("Ring buffer underflow"); }
        return buffer[first];
        
    }

    // a simple test of the constructor and methods in RingBuffer
    public static void main(String[] args) {
        int N = Integer.parseInt(args[0]);
        RingBuffer buffer = new RingBuffer(N);
        for (int i = 1; i <= N; i++) {
            buffer.enqueue(i);
        }
		double t = buffer.dequeue();
		buffer.enqueue(t);
		System.out.println("Size after wrap-around is " 
				   + buffer.getSize());
        while (buffer.getSize() >= 2) {
            double x = buffer.dequeue();
            double y = buffer.dequeue();
            buffer.enqueue(x + y);
        }
        System.out.println(buffer.peek());
    }
}



