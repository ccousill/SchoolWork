(*Christopher Cousillas *)
(*2/16/20 *)
(*Professor Bonelli*)
(*I pledge my honor that I have abided by the Stevens Honor System. *)

type dtree = Leaf of int | Node of char * dtree * dtree

let tLeft = Node('w' , Node('x' , Leaf 2 , Leaf 5) , Leaf 8)
let tRight = Node('w' , Node('x' , Leaf 2, Leaf 5) , Node('y' , Leaf 7, Leaf 8))


(*Gives height of given dtree *)
let rec dTree_height: dtree -> int = fun t ->
	match t with
	|Leaf(_) -> 0
	|Node(x,left,right) -> 
	 let height1 = 1 + dTree_height left in
	 let height2 = 1 + dTree_height right in
	 max height1 height2
	
(*Gives full size of Given dTree *)
let rec dTree_size: dtree -> int = fun t -> 
	match t with
	|Leaf(_) -> 1
	|Node(x, left, right) -> 1+ (dTree_size left + dTree_size right)
	
(*helper function for dTree paths, code taken from canvas *)
let rec dTree_paths_help: dtree -> int list -> int list list = fun t l ->
	match t with
	|Leaf(_) -> [l]
	|Node(x, left, right)-> List.map (fun i -> 0::i) (dTree_paths_help left l)               
	@                       List.map (fun i -> 1::i) (dTree_paths_help right l)

(*Gives all different path routes to every leaf on dtree *)
let dTree_paths: dtree -> int list list = fun t ->
	dTree_paths_help t []

(*gives first item in given list *)
let second: int list list -> int list = fun l ->
	match l with
	|h::t -> h

(*checks if all the lists in a given list are equal in size*)
let rec is_all_equal: int list list -> bool = fun l ->
	match l with
	|[] -> true
	|h::t -> if List.length l = 1 
	         then true
			 else if (List.length h = List.length (second t)) 
			 then is_all_equal t 
	         else false
(*returns true if a dtree is perfect by checking each list in the list and their size *) 
let rec dTree_is_perfect: dtree -> bool = fun t ->
	match t with 
	|Leaf(_) -> true
	|Node(x,left,right)-> is_all_equal(dTree_paths t)
						
(*maps a modification to the elements in a given dtree*)
let rec dTree_map:(char->char) -> (int -> int) -> dtree -> dtree = fun f g t ->
	match t with
	|Leaf(x) -> Leaf(g x)
	|Node(x,left,right) -> Node(f x, dTree_map f g left, dTree_map f g right)

(*converts given list of char to a dtree *)
let rec list_to_tree: char list -> dtree = fun l ->
	match l with
	|[] -> Leaf 0
	|h :: t -> Node(h, list_to_tree t, list_to_tree t)
	
(*helper function for replace_leaf_at, checks whether to go left or right on dtree *)
let rec replace_leaf_help: dtree -> int list -> int -> dtree = fun tree l f ->
	match tree,l with
	|Leaf(x),_ -> Leaf(f)
	|Node(x,left,right),h::t -> 
		if h = 0
		then Node(x,replace_leaf_help left t f,right)
		else Node(x,left, replace_leaf_help right t f )
						
										
(*replaces leaves on a given dtree with a given set of paths and ints *)
let rec replace_leaf_at: dtree -> (int list *int) list -> dtree = fun tree f ->
	match f with
	|[] -> tree
	|h::t -> replace_leaf_at (replace_leaf_help tree (fst h) (snd h) ) t
		
		
(* converts a bf to a btree*)
let rec bf_to_dTree: (char list*(int list*int)list) -> dtree = fun l ->
	replace_leaf_at (list_to_tree (fst l)) (snd l) 
	
