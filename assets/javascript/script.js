

let myArray = ["joy", "envy", "gratitude", "loyalty", "fear", "heartbreak", "awe", "disgust", "silliness", "boredom", "love", "rage"];

//for loop to make buttons per item in array

function addButton() {
    //adding new button when user hits submit
    $("#searchGo").on("click", function () {
        searchTerm = $("#search-term").val();
        $('.buttonarea').append("<button type='button' class='btn btn-link text-light' data-search='" + searchTerm + "'>" + searchTerm + " </button>")
    });
}

function runArray() {

    for (i = 0; i < myArray.length; i++) {
        $('.buttonarea').append("<button type='button' class='btn btn-link text-light' data-search='" + myArray[i] + "'>" + myArray[i] + " </button>");
    }

}

function reset() {
    $(".gifarea").empty();
    $(".buttonarea").empty();
    runArray();
    onclicky();
}

//call functions
runArray();
addButton();
onclicky();

//set up on click events
function onclicky() {
    $(document.body).on("click", "button", function () {
        reset();
        let x = $(this).data("search");
        console.log(x);
        $(".gifarea").append("<div class='row mx-auto' style= 'width: 200px' id='" + x + "' style='text-align:center'></div>");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=u4a1P49IlswPZlWPdP66V296HFbI9ZD5&limit=5";

        //making my blank arrays
        let gifArrayAnimated = [];
        let gifArrayStill = [];
        let gifArrayStillFinal = [];
        //ajax getting the api data
        $.ajax({ url: queryURL, method: "GET" })
            .done(function (response) {

                for (i = 0; i < 5; i++) {
                    //just a placeholder for the url of each image, because it's getting too long to type out
                    let placeholder = response.data[i].images.fixed_width.url;
                    //pushing the urls of the gifs to an array (they are already animated versions)
                    gifArrayAnimated.push(placeholder);
                    console.log(gifArrayAnimated);
                    //making array of the gif urls without the .gif ending, so we can concatinate the _s at the end to make it still!
                    gifArrayStill.push(gifArrayAnimated[i].slice(0, -4));
                    console.log(gifArrayStill);
                    //making array of the still version gifs using .concat()
                    gifArrayStillFinal.push(gifArrayStill[i].concat("_s.gif"));
                    console.log(gifArrayStillFinal);

                    //appending to the div
                    $('#' + x).append("<div class= 'col-xl-4 col-md-4 col-sm-12' style='min-width: 250px; min-height:250px; margin: 5px'><img src ='" + gifArrayStillFinal[i] + "' data-still = '" + gifArrayStillFinal[i] + "' data-animate='" + gifArrayAnimated[i] + "' data-state='still' class='gif'><p>Rating: " + response.data[i].rating + "</p></div>");

                    $(document.body).on("click", ".gif", function () {
                        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element

                        var state = $(this).attr("data-state");
                        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                        // Then, set the image's data-state to animate
                        // Else set src to the data-still value
                        if (state === "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        } else {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }
                    })

                }
            })
    });



}
