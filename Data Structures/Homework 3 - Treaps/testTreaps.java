package homework4;

import static org.junit.Assert.*;

import org.junit.Test;

public class testTreaps {

	@Test
	public void test() {
		Treap<Integer> testTree = new Treap<Integer>();
    
    	testTree.add(4,81);
    	testTree.add(2,69);
    	testTree.add(6,30);
    	testTree.add(1,16);
    	testTree.add(3,88);
    	testTree.add(5,17);
    	testTree.add(7,74);
		
		assertEquals(""
				+ "(key=1, priority=16)\n" + 
				"  null\n" + 
				"  (key=5, priority=17)\n" + 
				"    (key=2, priority=69)\n" + 
				"      null\n" + 
				"      (key=4, priority=81)\n" + 
				"        (key=3, priority=88)\n" + 
				"          null\n" + 
				"          null\n" + 
				"        null\n" + 
				"    (key=6, priority=30)\n" + 
				"      null\n" + 
				"      (key=7, priority=74)\n" + 
				"        null\n" + 
				"        null\n" + 
				"",testTree.toString());


	    }
		
		
	
	}


