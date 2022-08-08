import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.concurrent.Semaphore;

public class Customer implements Runnable {
    private Bakery bakery;
    private Random rnd;
    private List<BreadType> shoppingCart;
    private int shopTime;
    private int checkoutTime;

    /**
     * Initialize a customer object and randomize its shopping cart
     */
    public Customer(Bakery bakery) {
         this.bakery = bakery;

         //this fills shopping cart to a customer with random bread
         rnd = new Random();
         this.shoppingCart = new ArrayList<BreadType>();
         this.fillShoppingCart();

         //this randomizes the shop time and checkout time of a customer
         this.shopTime = rnd.nextInt(100);
         this.checkoutTime = rnd.nextInt(50);
    }

    /**
     * Run tasks for the customer
     */
    public void run() {
        //this acquire checks if a customer is allowed to enter the bakery
        try {
            bakery.enter.acquire();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("Customer " + this.hashCode()+ " has entered the bakery and started shopping");

        //A sleep is used using shop time to imitate a customer taking time to get the bread they need
        try {
            Thread.sleep(this.shopTime);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        //once a customer enters the bakery, is is then checked to see if a customer is allowed to take a piece of bread.
        for (BreadType bread : shoppingCart) {
            if (bread == BreadType.RYE) {
                //acquire is used for each bread type to make sure that only one customer can take a bread at a time
                try {
                    bakery.breadFromShelf.get(BreadType.RYE).acquire();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                bakery.takeBread(bread); //this removes the bread from the shelf
                System.out.println("Customer " + this.hashCode()+ " took Rye bread");
                bakery.breadFromShelf.get(BreadType.RYE).release();
            }
            else if (bread == BreadType.SOURDOUGH) {
                try {
                    bakery.breadFromShelf.get(BreadType.SOURDOUGH).acquire();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                bakery.takeBread(bread);
                System.out.println("Customer " + this.hashCode()+ " took Sourdough");
                bakery.breadFromShelf.get(BreadType.SOURDOUGH).release();
            }

            else if (bread == BreadType.WONDER) {
                try {
                    bakery.breadFromShelf.get(BreadType.WONDER).acquire();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                bakery.takeBread(bread);
                System.out.println("Customer " + this.hashCode()+ " took Wonder bread");
                bakery.breadFromShelf.get(BreadType.WONDER).release();
            }

        }
        System.out.println("Customer " + this.hashCode() + " has finished shopping and heading to a cashier");
        //cashiers are initialized with 4 permissions because there are only 4 cashiers, acquire is used to make sure only 4 cashiers can be used
        try {
            bakery.toCashier.acquire();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        bakery.customersThatEntered++;
        System.out.println("Customer " + this.hashCode() + " is at a cashier and checking out");
        //a sleep for checkout time is used to simulate a checkout time for the customer
        try {
            Thread.sleep(this.checkoutTime);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        //this creates a mutex for the sales for that no two cashiers can add to a sale at the same time
        try {
            bakery.toSales.acquire();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        //adds the items prices that were from the shopping cart to the total sales price
        bakery.addSales(this.getItemsValue());
        bakery.toSales.release();

        bakery.toCashier.release();


        //mutex made for the print statements when leaving store
        try {
            bakery.mutex.acquire();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(this);
        //This prints each element of a customer to the console
        System.out.println("Customer " + this.hashCode() + " has finished checking out and left the bakery");
        bakery.mutex.release();

        //allows another customer to enter once another has left the bakery
        bakery.enter.release();

    }


    /**
     * Return a string representation of the customer
     */
    public String toString() {
        return "Customer " + hashCode() + ": shoppingCart=" + Arrays.toString(shoppingCart.toArray()) + ", shopTime=" + shopTime + ", checkoutTime=" + checkoutTime;
    }

    /**
     * Add a bread item to the customer's shopping cart
     */
    private boolean addItem(BreadType bread) {
        // do not allow more than 3 items, chooseItems() does not call more than 3 times
        if (shoppingCart.size() >= 3) {
            return false;
        }
        shoppingCart.add(bread);
        return true;
    }



    /**
     * Fill the customer's shopping cart with 1 to 3 random breads
     */
    private void fillShoppingCart() {
        int itemCnt = 1 + rnd.nextInt(3);
        while (itemCnt > 0) {
            addItem(BreadType.values()[rnd.nextInt(BreadType.values().length)]);
            itemCnt--;
        }
    }

    /**
     * Calculate the total value of the items in the customer's shopping cart
     */
    private float getItemsValue() {
        float value = 0;
        for (BreadType bread : shoppingCart) {
            value += bread.getPrice();
        }
        return value;
    }
}