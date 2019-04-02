//Initial arrays of movies
var movies = ["High School Musical", "Hanna Montana", "Jane The Virgin", "Vampire Diaries", "The Originals", "3 Metros Sobre el Cielo", "Coco", "The Lion King"];

// Generic function for capturing the movie name from the data-attribute
        function alertMovieName() {
            var movieName = $(this).attr("data-name");

            alert(movieName);
        }

    // Function for displaying movie data
        function renderButtons() {

     // Deleting the movies prior to adding new movies
     // (this is necessary otherwise we will have repeat buttons)
     $("#buttons-view").empty();

     // Looping through the array of movies
     for (var i = 0; i < movies.length; i++) {

     // Then dynamicaly generating buttons for each movie in the array
     // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
     var a = $("<button>");
     // Adding a class of movie to our button
     a.addClass("movie");
     // Adding a data-attribute
     a.attr("data-name", movies[i]);
     // Providing the initial button text
     a.text(movies[i]);
     // Adding the button to the HTML
     $("#buttons-view").append(a);
     }
      }


      // This function handles events where one button is clicked
        $("#add-movie").on("click", function (event) {
            // Preventing the buttons default behavior when clicked (which is submitting a form)
            event.preventDefault();
            // This line grabs the input from the textbox
            var movie = $("#movie-input").val().trim();

            // Adding the movie from the textbox to our array
            movies.push(movie);

            // Calling renderButtons which handles the processing of our movie array
            renderButtons();

        });

        // Function for displaying the movie info
        // We're adding a click event listener to all elements with the class "movie"
        // We're adding the event listener to the document because it will work for dynamically generated elements
        // $(".movies").on("click") will only add listeners to elements that are on the page at that time
        $(document).on("click", ".movie", alertMovieName);

        // BAD: This won't work as expected (will only listen to clicks on existing buttons at the time it's called)
        // $(".movie").on("click", alertMovieName);

        // Calling the renderButtons function to display the intial buttons
        renderButtons();

       // Add a listener event for all buttons.
       $("#buttons-view").on("click",".movie", function () {
      //"this" refers to button that was clicked
      var movie = $(this).attr("data-name");

      //Making a queryURL using the name of the movies
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie
     + "&api_key=dc6zaTOxFJmzC&limit=10";
      //performing our AJAX get request
      $.ajax({
        url: queryURL ,
        method: "GET"
      })

        // After data comes back from request
        .then(function (response) {
            console.log(queryURL);
            console.log(response);

            //storing an array of results in a results variable
            var results = response.data;

            //looping through each result item
            for (var i = 0; i < results.length; i++) {

            // Making a div for the gif
            var gifDiv = $("div");

            //Storing the result item's rating
            var rating = results [i].rating;

            //Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            //creating an image tag
            var moviePic = $("<img>");

            //Giving the image tag a src attributr of a property pulled off the result item
            moviePic.attr("src", results[i].images.fixed_height.url);

            //Apendding the paragrapgh and image tag to the gifDiv.
            gifDiv.append(p);
            gifDiv.append(moviePic);

            //Prepending the giDiv to the "#gifs-appear-here" div in HTML
            $("#gifs-appear-here").prepend(gifDiv);


           }

       })
});