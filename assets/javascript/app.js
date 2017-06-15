  

	var topics= ["Rick and Morty", "Community", "Veep", "Seinfeld", "Arrested Development"];

	displayImages();
	displayButtons();
	imageClick();


	function displayButtons() {
		for (var i = 0; i < topics.length; i++) {
			$("#buttons").append('<button>' + topics[i] + '</button>');
		};
	};

	function displayImages() {
				
		var url = "https://api.giphy.com/v1/gifs/search";

		url += '?' +$.param({
		'api_key': "dc6zaTOxFJmzC",
		'q': topics[2],
		'limit': 10,
		});

			$.ajax({
				url: url,
				method: "GET"
			}).done(function(data){
				for (var i = 0; i < 10; i++) {
					var imageURL = $('<img class="gif">');
					imageURL.attr("src", data.data[i].images.fixed_height_still.url);
					imageURL.attr("data-pause", data.data[i].images.fixed_height_still.url);
					imageURL.attr("data-animate", data.data[i].images.fixed_height.url);
					imageURL.attr("data-state", "pause");
					//imageURL.addClass("gif");
					$("#images").append(imageURL);
				};
			});

	};

	function imageClick() {
		$("#images").on("click", "img.gif", function() {
			
			var state = $(this).attr("data-state");
			console.log(state);

			if (state === "pause") {
				$(this).attr("src", $(this).attr("data-animate"));
				$(this).attr("data-state", "animate")
			}
			else {
				$(this).attr("src", $(this).attr("data-pause"));
				$(this).attr("data-state", "pause");
			};
		});
	};


	 