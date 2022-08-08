(*Christopher Cousillas *)
(*2/9/20 *)
(*Professor Bonelli*)
(*I pledge my honor that I have abided by the Stevens Honor System. *)

 
type program = int list

let square : program = [0; 2; 2; 3; 3; 4; 4; 5; 5; 1]
let letter_e : program = [0;2;2;3;3;5;5;4;3;5;4;3;3;5;5;1]
let square' : program = [0; 3; 3; 2; 2; 5; 5; 4; 4; 1]


let remove_elt e l =
  let rec go l acc = match l with
    | [] -> List.rev acc
    | h::t when e = h -> go t acc
    | h::t -> go t (h::acc)
  in go l []
  
let remove_duplicates l =
  let rec go l acc = match l with
    | [] -> List.rev acc
    | h :: t -> go (remove_elt h t) (h::acc)
  in go l []

(*helper function that modifies the tuples for the function colored depending on the pen direction *)
let helper (p: (int*int)) (dir:int)=
	match dir with
	| 0 -> p
	| 1 -> p
	| 2 -> ( (fst p) , (snd p )+1 )
	| 3 -> ( (fst p) +1 , (snd p) )
	| 4 -> ( (fst p)  , (snd p )-1 )
	| 5 -> ( (fst p) -1 , (snd p) )

let rec colored_helper (p: (int*int)) (list_:program)=
	match list_ with
	| [] -> []
	| h::t -> (helper p h) :: colored_helper (helper p h) t

	
(*colored function that displays the coordinates of points drawn given a program *)
let rec colored (p: (int*int)) (list_:program)=
	remove_duplicates (colored_helper p list_)

	
(* checks if two programs are equivalent using their coordinates with colored *)
let rec help : (int*int) list -> (int*int) list -> bool = fun p r ->
	match p,r with
	|[],[]->true
	|h1::t1,h2::t2 -> if (fst h1) = 0 && (snd h1) = 0 
		then help t1 t2
	else if (((fst h1 = snd h2) && (snd h1 = fst h2)) || ((fst h1 = fst h2) && (snd h1 = snd h2)))  then true
	else false
	
(* equivalent boolean function *)	
let equivalent : program -> program -> bool = fun p r ->
	match p,r with
	| [],[] -> true
	| p , r -> if help (colored (0,0) p) (colored (0,0) r) then true
	else false
						

(*map function for applying functions onto a list *)
let rec map: ('a -> 'b)  -> 'a list -> 'b list = fun f l ->  
	match l with  
	| [] -> []  
	| h::t -> f h ::  map f t
	
(*standard foldr function*)
let rec foldr: ('a -> 'b  -> 'b)  -> 'b -> 'a list -> 'b = fun f a l -> 
	match l with  
	| [] -> a  
	| h::t -> f h (foldr f a t)

(*helper function used for mirror image that switches the given coordinate to the corresponding mirrored number *)
let switch : int -> int = fun i ->
	match i with 
	|0->0
	|1->1
	|2->4
	|3->5
	|4->2
	|5->3

(*mirror function that mirrors a given program*)
let mirror_image : program -> program = fun p ->
	match p with
	|[] -> []
	|h::t -> map switch p
	
(* helper function that modifies the given number in a program to the corresponding rotated number *)
let rotate : int -> int = fun i ->
	match i with
	|0->0
	|1->1
	|2->3
	|3->4
	|4->5
	|5->2

(*rotates the program 90 degrees *)
let rec rotate_90 : program -> program = fun p ->
	match p with
	|[]-> []
	|h::t -> map rotate p 
	

(* repeats a given item n number of times and givens a list *)
let rec repeat : int -> 'a -> 'a list = fun i s -> 
	match s,i with
	| s,0 -> []
	| s,i -> s :: repeat (i-1) s


(* scales a given program n number of times *)
let rec pantograph : program -> int -> program = fun p n ->
	match p, n with
	|[], n -> []
	|_, 0 ->[]	
	|h::t , n -> if h = 0 || h = 1 then h :: pantograph t n
	else repeat n h @ pantograph t n


(*deletes item in program given n number of times*)
let rec delete : program -> int -> program = fun p n ->
	match p,n with
	|[],_ -> []
	|h::t, 0 -> h::t
	|h::t, n -> delete t (n-1)

(*counts how many times a repeated number appears in a program *)
let rec count_times : program -> int ->  int = fun p n ->
	match p,n with
	|_, 0 -> 0
	|_, 1 -> 0
	|h::t, n -> if h = n then 1 + (count_times t n) 
	else 0

(* compresses given program by combining repeated instructions *)
let rec compress : program -> (int*int) list = fun p ->
	match p with
	| [] -> []
	| h::t -> (h, 1+ count_times t h) :: compress ( delete t ( count_times t h))
	

(* reverses the compress function *)
let rec uncompress : (int*int) list -> program = fun l ->
	match l with
	|[]->[]
	|h :: t -> repeat (snd h) (fst h) @ uncompress t
	
	
	
	
	
(* functions below were functions that were attempted but not completed due to the issue of using map and fold, I was unable
properly append items to the list effectively and resulted in lists that were not correct
*)	
	
	
	
(*
let rec pantograph_m : program -> int -> program = fun p n ->
	match p, n with
	|[], n-> []
	|h::t , n ->	if ((h = 0) || (h = 1)) then
						h :: pantograph_m t n
					else
						map (repeat n) p

let rec repeat_f : int -> 'a -> 'a list = fun i s -> 
	let new_rep = repeat i s in
		[s@new_rep]

let rec pantograph_f : program -> int -> program = fun p n ->
	List.fold_left repeat_f n p 
*)	

(*
let rec uncompress_m : (int*int) list -> program = fun l ->
	map repeat l
	*)
	
(*	
let rec uncompress_f : (int*int) list -> program = fun l ->
	match l with
	List.fold_left l
*)

