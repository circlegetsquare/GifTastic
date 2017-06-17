  

	var topics= ["Rick and Morty", "Community", "Veep", "Seinfeld", "Arrested Development", "Silicon Valley", "The O.C.", "Game of Thrones", "Alf", "The Simpsons"];

	//displayImages();
	displayButtons();
	buttonClick();
	imageClick();


	function displayButtons() {
		$("#buttons-div").empty();
		for (var i = 0; i < topics.length; i++) {
			var button = $('<button>');
			button.addClass("topic-button");
			button.attr("id", topics[i]);
			button.attr("value", i);
			button.html(topics[i]);
			$("#buttons-div").append(button);
		};
	};

	function displayImages(i) {
		var url = "https://api.giphy.com/v1/gifs/search";
		url += '?' +$.param({
		'api_key': "dc6zaTOxFJmzC",
		'q': topics[i],
		'limit': 10,
		});

			$.ajax({
				url: url,
				method: "GET"
			}).done(function(data){
				$("#images-div").empty();
				for (var i = 0; i < 10; i++) {
					var image = $('<img>');
					image.attr("src", data.data[i].images.fixed_height_still.url);
					image.attr("data-pause", data.data[i].images.fixed_height_still.url);
					image.attr("data-animate", data.data[i].images.fixed_height.url);
					image.attr("data-state", "pause");
					image.addClass("gif");

					var imageContainer = $('<div>');
					imageContainer.html(image);

					var imageRating = "Rating: " + data.data[i].rating;
					var ratingContainer  = $('<div>');
					ratingContainer.html(imageRating);
					ratingContainer.addClass("ratings");

					var imageHTML = $('<div>');
					imageHTML.addClass("fl-l border");
					imageHTML.html(imageContainer).append(ratingContainer);
					$("#images-div").append(imageHTML);
				};
			});

	};

	function imageClick() {
		$("#images-div").on("click", "img.gif", function() {
			
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

	function buttonClick() {
		$("#buttons-div").on("click", "button.topic-button", function(event) {
			event.preventDefault();
			var value = $(this).val();
			console.log(value);
			displayImages(value);
		});
	}

      $("#add-topic").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var newTopic = $("#topic-input").val().trim();

        // Adding the movie from the textbox to our array
        topics.push(newTopic);
        console.log(newTopic)

        // Calling renderButtons which handles the processing of our movie array
        displayButtons();
      });
	

	 