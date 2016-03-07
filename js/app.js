$(document).ready(function () {

    // STEP 1 - get the input from the user
    $("#search-term").submit(function (event) {
        event.preventDefault();
        var searchTerm = $("#videoSearch").val();
        getRequest(searchTerm);
    });



    // STEP 2 - using the input from the user (query) make the API call to get the JSON response
    function getRequest(searchTerm) {
        $.getJSON("https://www.googleapis.com/youtube/v3/search", {
                "part": "snippet",
                "key": "AIzaSyAragdDZXDXqbtyG43Tv0do3z1JCxEuI_A",
                "q": searchTerm,
                "type": "video"
            },
            function (data) {
                // If there are no results it will just empty the list
                if (data.pageInfo.totalResults == 0) {
                    alert("No videos found!");
                }
                //if there are results, call the displaySearchResults
                displaySearchResults(data.items);
            }
        );
    }


    // STEP 3 - using the JSON response (videos), populate the relevant part of your HTML with the variable inside the JSON
    function displaySearchResults(videos) {
        var buildTheHtmlOutput = "";
        $.each(videos, function (index, video) {
            // append li to ul
            console.log(video.snippet.thumbnails.medium.url);
            //concatenate the results inside the HTML variable
            buildTheHtmlOutput += "<li><p>" + video.snippet.title + "</p><a href='https://www.youtube.com/watch?v=" + video.id.videoId + "' target='_blank'><img src='" + video.snippet.thumbnails.high.url + "'/></a></li>";

        });
        //use the HTML output to show it in the index.html
        $("#search-results ul").html(buildTheHtmlOutput);
    }


    // Step 4 - make the images clickable links to the youtube video




});
