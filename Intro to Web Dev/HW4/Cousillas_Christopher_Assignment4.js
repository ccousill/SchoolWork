// Here are the paths to the images
// I pledge my honor that I have abided by the Stevens honor System
// Christopher Cousillas
const fileLocations = {
   woofer: './img/woofer.jpg',
   pupper: './img/pupper.jpg',
   clouds: './img/clouds.jpg',
   snek: './img/snek.jpg'
};

/**
 * This function will get the values of the following elements:
 * 		formUsername, formCaption, formImg
 * Then, this will pass those values to the addNewPost function.
 * @param {Event} event the submit event of the #postForm form
 */
function handleFormSubmit(event) {
   // This next line prevents the reload of the form
   event.preventDefault();
   
   
   
   
   // Get values of inputs
   var name = document.getElementById("formImg").value;
   formUser = document.getElementById("formUsername").value;
   formCap = document.getElementById("formCaption").value;
   locate = fileLocations[name];
   addNewPost(formUser,formCap,locate);
   
   
   
   
   // Pass values to addNewPost()
    addNewPost(formUser,formCap,locate);
}

/**
 * This function create the following div and append it to the #postList element
	<div class="post">
		<span>{username}</span>
		<img src="{imgLocation}" alt="{caption}">
		<div class="postOverlay">
			{caption}
		</div>
	</div>
 * 
 * Also, add a mouseover and mouseleave events to the post div element
 * @param {String} username username of the post
 * @param {String} caption caption of the post
 * @param {String} imgLocation location of the post image
 */
function addNewPost(username, caption, imgLocation) {
	// Create the parent post div
	var post = document.createElement("div");
	post.className = "post";
	
	
	
	
	
    // Create a span for the user
    var spanElmnt = document.createElement("span");
	var textNode = document.createTextNode(username);
    post.appendChild(spanElmnt);
	
	
	
	
	
    // Create image element
    var im = document.createElement("img");
	im.src = imgLocation;
	im.alt = caption;
	
	
	
	
	
	
	
    // Create overlay element
    var overlay = document.createElement("div");
	overlay.className = "postOverlay";
	
	
   // Add all child elements (order matters)
   spanElmnt.appendChild(textNode);
   post.appendChild(im);
   overlay.appendChild(document.createTextNode(caption));
   post.appendChild(overlay);
   
   
   
   
   // Add event listeners to post
    post.addEventListener("mouseover", function(){overlay.style.opacity = "1";});
	post.addEventListener("mouseleave", function(){overlay.style.opacity = "0";});
	
	
	
	
   // Add post element to post list
    document.getElementById("postList").appendChild(post);
	
	
}

window.onload = () => {
   // Once our window is loaded, we add the event listener for our post form
   postForm.addEventListener('submit', handleFormSubmit);
};