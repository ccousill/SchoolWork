//Christopher Cousillas
//9/15/20
//CS511
//I pledge my honor that I have abided by the Stevens Honor System.
import java.io.*;
import java.util.*;

public class TextSwap {

    private static String readFile(String filename) throws Exception {
        String line;
        StringBuilder buffer = new StringBuilder();
        File file = new File(filename);
        BufferedReader br = new BufferedReader(new FileReader(file));
        while ((line = br.readLine()) != null) {
            buffer.append(line);
        }
        br.close();
        return buffer.toString();
    }

  private static Interval[] getIntervals(int numChunks, int chunkSize) {
        Interval[] inter = new Interval[numChunks];
        int current = 0;
        int chunk = chunkSize - 1;
        for(int i = 0; i < numChunks; i++){
            inter[i] = new Interval(current,(chunk));
            current += chunkSize;
            chunk += chunkSize;            
        }
        return inter;
    }

    private static List<Character> getLabels(int numChunks) {
        Scanner scanner = new Scanner(System.in);
        List<Character> labels = new ArrayList<Character>();
        int endChar = numChunks == 0 ? 'a' : 'a' + numChunks - 1;
        System.out.printf("Input %d character(s) (\'%c\' - \'%c\') for the pattern.\n", numChunks, 'a', endChar);
        for (int i = 0; i < numChunks; i++) {
            labels.add(scanner.next().charAt(0));
        }
        scanner.close();
        // System.out.println(labels);
        return labels;
    }

    private static char[] runSwapper(String content, int chunkSize, int numChunks) {
        List<Character> labels = getLabels(numChunks);
        Interval[] intervals = getIntervals(numChunks, chunkSize);
        char[] buffer = new char[chunkSize*numChunks];
        Thread[] threads = new Thread[numChunks];

        //initializes threads and runs
        for(int i = 0; i < numChunks;i++){
            threads[i] = new Thread(new Swapper(intervals[labels.get(i) - 'a'],content, buffer, i * chunkSize));
            threads[i].run();
        }

        //joins threads in list of threads
        for(int i = 0;i < threads.length;i++) {
            try {
                threads[i].join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        return buffer;
    }

    private static void writeToFile(String contents, int chunkSize, int numChunks) throws Exception {
        char[] buff = runSwapper(contents, chunkSize, contents.length() / chunkSize);
        PrintWriter writer = new PrintWriter("output.txt", "UTF-8");
        writer.print(buff);
        writer.close();
    }

    public static void main(String[] args) {
        if (args.length != 2) {
            System.out.println("Usage: java TextSwap <chunk size> <filename>");
            return;
        }
        int error = 0;
        String contents = "";
        int chunkSize = Integer.parseInt(args[0]);
        try {
            contents = readFile(args[1]);
            //checks if file length is more than 26 letters
            if(contents.length() > 26) {
                error = 1;
                throw new Exception();
            }
            //checks if file size is a multiple of chunk size
            if(contents.length() % chunkSize != 0){
                error = 2;
                throw new Exception();
            }
            writeToFile(contents, chunkSize, contents.length() / chunkSize);
        } catch (Exception e) {
            if(error == 1) System.out.println("Chunk size too small");
            else if(error == 2) System.out.println("File size must be multiple of chunk size");
            else System.out.println("Error with IO.");
            return;
        }
    }
}