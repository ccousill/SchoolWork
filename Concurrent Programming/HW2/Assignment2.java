/* start the simulation */
//Christopher Cousillas
//10/4/20
//I pledge my honor that I have abided by the Stevens honor system.
//CS 511
public class Assignment2 {
    public static void main(String[] args) {
        Thread thread = new Thread(new Bakery());
        thread.start();

        try {
            thread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
