// Christopher Cousillas
// 4/24/19
// cs284
// I pledge my honor that I have abided by the Stevens Honor System


package homework4;


import java.util.Random;

import java.util.Scanner;

import homework4.BinaryTree.Node;

/**
 * A class to represent a treap, that is, a BST with node placement
 * randomized by probabilistic heap-like priorities
 * @author CS284 team
 */
public class Treap<E extends Comparable<E>> extends BinarySearchTree<E> {
    protected static class Node<E> {
		public E data; // key for the search
		public int priority; // random heap priority
		public Node<E> left;
		public Node<E> right;

	/** Creates a new node with the given data and priority. The
	 *  pointers to child nodes are null. Throw exceptions if data
	 *  is null. 
	 */
		public Node(E data, int priority) {
			
			if(data==null) {
				throw new NullPointerException("null");
			}
			this.data=data;
			this.priority=priority;
		
			this.left=null;
			this.right=null;
		
		
		
		
	    // YOUR    CODE    HERE

	}
	
	
		public Node<E> rotateRight() {
		    Node<E> result = this.left;  //copy q
		    this.left=result.right;
		    result.right=this;
		    return result;	    
		}
		
		public Node<E> rotateLeft() {		
		    Node<E> result = this.right;
		    this.right=result.left;
		    result.left=this;
		    return result;
		}

		
    }
    
    

    private Random priorityGenerator;
    private Node<E> root;

    /** Create an empty treap. Initialize {@code priorityGenerator}
     * using {@code new Random()}. See {@url
     * http://docs.oracle.com/javase/8/docs/api/java/util/Random.html}
     * for more information regarding Java's pseudo-random number
     * generator. 
     */
    public Treap() {
    	this.root =null;
    	this.priorityGenerator = new Random();

    }


    /** Create an empty treap and initializes {@code
     * priorityGenerator} using {@code new Random(seed)}
     */
    public Treap(long seed) {
    	this.root = null;
	    this.priorityGenerator = new Random(seed);
    }

    public boolean add(E key) {
	
    	root=add(root,key,priorityGenerator.nextInt());
    	return addReturn;
    
    	
    }
    
    public boolean add(E key, int priority) {
    	
    	root=add(root,key,priority);
    
    	return addReturn;
    }

    private Node<E> add(Node<E> localroot, E key, int priority) {
    	
    	
    	if(localroot==null) {
    		addReturn = true;
    	    localroot =  new Node<E>(key,priority);
    	   
    		return localroot;
    		
    	}
    		
    
    	
    	else if(key.compareTo(localroot.data)==0) {
    		addReturn = false;
    		return localroot;
    	}
    	
    	if(localroot.data.compareTo(key) > 0) {
    		
    		localroot.left = add(localroot.left, key,priority);
    		
    		if(localroot.left.priority<localroot.priority) {
				
  	    		localroot = localroot.rotateRight();
  	    	
  	    	 }
 
    	}
	    	
	    else if(localroot.data.compareTo(key)<0){
	    	
	    
	    	localroot.right = add(localroot.right, key,priority);
	    	 
	    	if(localroot.right.priority<localroot.priority) {
    				
	    		localroot= localroot.rotateLeft();
	   	    	
	   	    	 }
	    	
	    
	    }
    	
     	return localroot; 	
    }
   
    
    private Node<E> delete(Node<E> localroot, E key){
    	if (localroot == null) {
    	    deleteReturn = null;
    	    return null;
    	}
    
    	if (localroot.data.compareTo(key) > 0){
    		localroot.left = delete(localroot.left, key);
    	}
    	
    	else if (localroot.data.compareTo(key) < 0) {
    		localroot.right = delete(localroot.right, key);
    	}
    	
    	else if(localroot.data.compareTo(key)==0){
    		
    	    if (localroot.left == null && localroot.right == null) {
    	    	return null;
    	    }
    	    
    	    else if (localroot.left == null) {
    	    	System.out.println("rotating left");
    	    	localroot = localroot.rotateLeft();
    	    	localroot.left = delete(localroot.left,key);
    	    }
    	    else if (localroot.right == null) {
    	    	System.out.println("rotating right");
    	    	localroot = localroot.rotateRight();
    	    	localroot.right = delete(localroot.right, key);
    		
    	    }else{
    	    	
    		if (localroot.left.priority < localroot.right.priority) {
    			System.out.println("rotating 2 right");
    		    localroot = localroot.rotateRight();
    		    localroot.right = delete(localroot.right, key);
    		    
    		}else{
    			System.out.println("rotating 2 left");
    		    localroot = localroot.rotateLeft();
    		    localroot.left= delete(localroot.left, key);
    		}
    	    }
    	    
    	}
    	return localroot;
        }
    
    
   
    
  public E delete(E key) {
	 
	 root =  delete(root,key);
	 return deleteReturn;
    			
  }
  
    private E find(Node<E> root, E key) {
    	Node<E> localroot = root;
    	if(localroot==null) {
    		return null;
    	}
    	if(key.compareTo(localroot.data)==0) {
    		return localroot.data;
    	}
    	
    	
		if(key.compareTo(localroot.data)>0) {
			localroot=localroot.right;
			return find(localroot,key);
		} else {
			localroot=localroot.left;
			return find(localroot,key);
			
		}
    		
    
    	
    	
    	
    }

    public E find(E key) {
    	return find(root,key);
    	
    }
    
    @Override
    public String toString() {
    StringBuilder sb = new StringBuilder();
    toString(root,0,sb);
    return sb.toString();
    	
    			
}
    
    private void toString(Node<E> rootnode, int depth, StringBuilder sb) {
    	
    	for (int i = 0; i < depth; i++) {
            sb.append("  ");
        }
        if (rootnode== null) {
            sb.append("null\n");
        } else {

            sb.append("(key=");
            sb.append(rootnode.data);
            sb.append(", priority=");
            sb.append(rootnode.priority);
            sb.append(")\n");
            toString(rootnode.left, depth + 1, sb);
            toString(rootnode.right, depth + 1, sb);
        }
        
    }
    
    
	
    }
