function camelCase(string){
	if(typeof string != 'string') throw `${string} is not a string`
	if(string.length <= 0) throw 'Error: No string'
		

	var words = string.split(" ");
	words[0] = words[0].toLowerCase();

		for(let i = 1;i< words.length; i++){
			words[i] = words[i].toLowerCase();
			words[i] = words[i].replace(words[i][0],words[i][0].toUpperCase()); 
		}

	words = words.join('');
	return words;
 }


function replaceChar(string){
	if(typeof string != 'string') throw `${string} is not a string`
	if(string.length <= 0) throw 'Error: No string'

	word = string;
	word = word.replace(word[0],word[0].toUpperCase());
	firstLetter = word[0].toLowerCase();
	count = 1;
	
	for(let i = 1;i < word.length; i++){
		if(word[i] ==firstLetter){
			if(count % 2 == 1 ){
				word = word.replace(word[i],"*");
				count++;
			}
			else{
				word= word.replace(word[i],"$");
				count++;
			}
		}

	}
	word = word.replace(word[0],word[0].toUpperCase());
	return word;
}


function mashUp(string1,string2){
	if(typeof string1 != 'string' || typeof string2 != 'string') throw `Error: Input must both be strings`
	if(string1.length < 2 || string2.length < 2 ) throw 'Error: Both strings must be at least 2 characters long'
	word1 = string1
	word2 = string2
	firstLetter1 = word1.substring(0,2);
	firstLetter2 = word2.substring(0,2);

	word1 = word1.replace(firstLetter1,firstLetter2);
	word2 = word2.replace(firstLetter2,firstLetter1);

	final = word1 + " " + word2;

	return final;
}





module.exports = { camelCase, replaceChar, mashUp };