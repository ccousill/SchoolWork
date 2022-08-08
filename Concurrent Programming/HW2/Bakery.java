import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.*;

public class Bakery implements Runnable {
    private static final int TOTAL_CUSTOMERS = 200;
    private static final int ALLOWED_CUSTOMERS = 50;
    private static final int FULL_BREAD = 20;
    private Map<BreadType, Integer> availableBread;
    public Map<BreadType, Semaphore> breadFromShelf;
    private ExecutorService executor;
    private float sales = 0;
    public int customersThatEntered = 0;

    //Semaphores used for each allowed customer in the store and cashier.
    Semaphore enter = new Semaphore(ALLOWED_CUSTOMERS);
    Semaphore toCashier = new Semaphore(4);
    Semaphore toSales = new Semaphore(1);
    Semaphore mutex = new Semaphore(1);


    /**
     * Remove a loaf from the available breads and restock if necessary
     */
    public void takeBread(BreadType bread) {
        int breadLeft = availableBread.get(bread);
        if (breadLeft > 0) {
            availableBread.put(bread, breadLeft - 1);
        } else {
            System.out.println("No " + bread.toString() + " bread left! Restocking...");
            // restock by preventing access to the bread stand for some time
            try {
                Thread.sleep(1000);
            } catch (InterruptedException ie) {
                ie.printStackTrace();
            }
            availableBread.put(bread, FULL_BREAD - 1);
        }
    }

    /**
     * Add to the total sales
     */
    public void addSales(float value) {
        sales += value;
    }

    /**
     * Run all customers in a fixed thread pool
     */
    public void run() {
        availableBread = new ConcurrentHashMap<BreadType, Integer>();
        availableBread.put(BreadType.RYE, FULL_BREAD);
        availableBread.put(BreadType.SOURDOUGH, FULL_BREAD);
        availableBread.put(BreadType.WONDER, FULL_BREAD);


        //initializes a hashmap that applies semaphores to each bread that can be used in the Customer class
        breadFromShelf = new HashMap<BreadType,Semaphore>();

        //this initializes each bread to have a semaphore of permission 1, this ensures a customer can only take 1 bread at a time
        breadFromShelf.put(BreadType.RYE, new Semaphore(1));
        breadFromShelf.put(BreadType.SOURDOUGH, new Semaphore(1));
        breadFromShelf.put(BreadType.WONDER, new Semaphore(1));

        //Thread pool that executes all customers
        executor = Executors.newFixedThreadPool(ALLOWED_CUSTOMERS);
        for(int i = 0; i < TOTAL_CUSTOMERS; i++){
            executor.execute(new Customer(this));
        }

        //shuts down tasks that we executed and stops any new tasks from being made
        executor.shutdown();

        //This blocks until all threads have been shutdown from the executor
        try {
            executor.awaitTermination(100000000, TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        if(customersThatEntered != TOTAL_CUSTOMERS) {
            System.out.println("Error, thread pool did not wait total termination. Program may have taken too long");
            System.exit(-1);
        }

        //this prints out the final results of all customers who entered the store and left the store
        System.out.println(customersThatEntered + " customers have entered and left the bakery");
        System.out.println("Total sales from bakery: " + sales);

    }
}