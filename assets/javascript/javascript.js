var actors = [
    "Robert Downey Jr",
    "Brad Pitt",
    "George Clooney",
    "Jennifer Aniston",
    "Angelina Jolie",
    "Sandra Bullock"
];

var person;
var queryURL;
var respData;
var gifDiv;
var rating;
var p;
var image;
var personImage;
var actor;


function addActorName() {
    $("button").on("click", function () {
        person = $(this).attr("actor-name");
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            person + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                var results = response.data;
                for (var i = 0; i < results.length; i++) {

                    respData = response.data[i];
                    gifDiv = $("<div>");
                    rating = results[i].rating;
                    p = $("<p>").text("Rating: " + rating);

                    personImage = $("<img>");
                    personImage.attr("src", results[i].images.fixed_height_still.url);
                    personImage.attr("data-animate", results[i].images.fixed_height.url);
                    personImage.attr("data-still", results[i].images.fixed_height_still.url);
                    personImage.attr("data-state", "still");
                    personImage.attr("class", "gif");

                    gifDiv.prepend(p);
                    gifDiv.prepend(personImage);
                    $("#gifs-appear-here").prepend(gifDiv);

                    $(".gif").on("click", function () {
                        var state = $(this).attr("data-state");

                        if (state === "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        } else {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }
                    });

                }
            });
    });
}

function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < actors.length; i++) {
        var a = $("<button>");
        a.addClass("actor");
        a.attr("actor-name", actors[i]);
        a.text(actors[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-actor").on("click", function (event) {
    event.preventDefault();
    actor = $("#actor-input").val().trim();
    actors.push(actor);
    renderButtons();
});


$(document).on("click", ".actor", addActorName);
$("#gifs-appear-here").empty()
renderButtons();