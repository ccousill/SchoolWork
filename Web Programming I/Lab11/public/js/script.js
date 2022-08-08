(function ($) {
	//starting variables
	var showList = $('#showList'),
	ourShow = $('#show'),
	searchForm = $('#searchForm'),
	homeLink = $('#homeLink');

		//ajax method when page loads that gets list of TV shows
		let endpoint = "http://api.tvmaze.com/shows"
		var requestConfig ={
			type: "GET",
			url: endpoint,
		};

		$.ajax(requestConfig).then(function(shows){
			$(homeLink).hide()
			$(shows).each(function(i, show) {
				$(showList).append('<li id = showId>' + show.name + '</li>')
				$('li').eq(i).attr("href", show._links.self.href)
				$(showList).show()
				
			});

		}); 



		//this gets list of tv shows from seacrh
		$(searchForm).submit(function(event){
			event.preventDefault();
			$(showList).empty()
			searchTerm = $('#search_term').val();
			$(ourShow).hide()
			if(!searchTerm || !searchTerm.replace(/\s/g, '').length ){
				$(ourShow).html('<p> You must input a search! </p>')
                $(homeLink).show()
				$(ourShow.show())
			}

			else{
				$(showList).empty()
				var requestConfig={
					type: "GET",
					url: "http://api.tvmaze.com/search/shows?q="+searchTerm
				}

				$.ajax(requestConfig).then(function(shows){
					$(shows).each(function(i,show){
						$(showList).append('<li id = "showId">' + this.show.name + '</li>')
						$('li').eq(i).attr("href", this.show._links.self.href)
						$(showList).show()
						$(homeLink).show()


         			});//loop


         		});//ajax


         	}//else 

         });//Search form submit 

        //on click event for list of shows given
        $(document).on('click','#showId', function(event) {
        	event.preventDefault();
            $(showList).hide();
            $(ourShow).empty();

        	var hrefID = $(this).attr("href")
        	var requestConfig ={
        		type: "GET",
        		url: hrefID,
        	};

        	$.ajax(requestConfig).then(function(show){
                if(!show.name){
                    $(ourShow).append('<h1> N/A </h1>')
                }else{
        		$(ourShow).append('<h1>' +show.name +'</h1>')
                }
        		$(ourShow).append('<img>')

        		if(!show.image){
        			var image = "../public/no_image.jpeg"
        		}else{
        			var image = show.image.medium
        		}
        		$('img').attr("src",image)

        		$(ourShow).append('<dl>')
        		if(!show.language){
        			var language = "N/A"
        		}else{
        			var language = show.language
        		}

        		$('dl').append('<dt> <strong> Language: </strong>' + language + '</dt')

        		if(!show.genres){
        			var genres = "N/A"
        			$('dl').append('<dt id = "genre"> <strong> Genre: </strong>' + genres +'</dt>')
        		}else{
        			var genres = show.genres
        			$('dl').append('<dt id = "genre"> <strong> Genre: </strong> </dt>')
        			$(show.genres).each(function(i,genre){
        				$('#genre').append('<ul>' + genre +'</ul>')

        			});
        		}


        		if(!show.rating.average){
        			var rating = "N/A"
        		}else{
        			var rating = show.rating.average
        		}

        		$('dl').append('<dt> <strong> Average rating: </strong> ' + rating + '</dt')

        		if(!show.network){
        			var network = "N/A"
        		}else{
        			var network = show.network.name
        		}

        		$('dl').append('<dt> <strong> Network: </strong> ' + network + '</dt')

        		if(!show.summary){
        			var summary = "N/A"
        		}else{
        			var summary = show.summary
        		}

        		$('dl').append('<dt> <strong> Summary: </strong>' + summary + '</dt')

        		$(ourShow).show()
        		$(homeLink).show()


        	});


        }); 

})(window.jQuery);