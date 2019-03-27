var animalsArray = ["dog", "cat", "frog", "bat", "bird", "turtle", "fish", "giraffe", "horse", "tiger"];

function getGIF() {
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=KuEPCWREceFIX884GxmY7yfPeHk6aeWV&q=" + animal + "&limit=10";

    //var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=KuEPCWREceFIX884GxmY7yfPeHk6aeWV&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        var results = response.data;
        for (var i = 0; i < 10; i++) {
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var ratingText = $("<p>").text("Rating: " + rating);

            var animalGIF = $("<img>");
            animalGIF.attr("src", results[i].images.fixed_height_still.url);
            animalGIF.attr("data-still", results[i].images.fixed_height_still.url);
            animalGIF.attr("data-animate", results[i].images.fixed_height.url);
            animalGIF.attr("data-state", "still");
            animalGIF.attr("class", "gif");


            gifDiv.prepend(ratingText);
            gifDiv.prepend(animalGIF);

            $("#gif-div").prepend(gifDiv);
          }

         

    })

    

}

function displayButtons() {
    $("#button-div").empty();

    for (var i = 0; i < animalsArray.length; i++) {
        var animalButton = $("<button>");
        animalButton.addClass("displayed-button");
        animalButton.attr("data-name", animalsArray[i]);
        animalButton.text(animalsArray[i]);
        $("#button-div").append(animalButton);
    }
}

$("#add-animal").on("click", function(event) {
    event.preventDefault();
    var newAnimal = $("#animal-input").val().trim();
    animalsArray.push(newAnimal);
    displayButtons();
});

function changeState() {

    var state = $(this).attr("data-state");

    if (state === "still") {

        var animate = $(this).attr("data-animate");
        
        $(this).attr("src", animate);
        
        $(this).attr("data-state", "animate");
      
      } else {
        
        var still = $(this).attr("data-still");
        
        $(this).attr("src", still);
        
        $(this).attr("data-state", "still");
      }

};

$(document).on("click", ".displayed-button", getGIF);
$(document).on("click", ".gif", changeState);

displayButtons();



// to do:
// display buttons DONE
// add buttons DONE
// on button click, make ajax call and display static gifs DONE
//
// animate gifs when clicked:
// data-still, data-animate, data-state, class="gif" DONE
// on click if statement - change src and class DONE