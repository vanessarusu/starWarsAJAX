
// VARIABLES -------------------------------------------------------------------------------------------------------------

(function() {

    var searchRequest;

    var results = document.querySelector('#results');
    var startButton = document.querySelector('#startButton');
    var detailSection = document.querySelector('#detailSection');
    var moviePoster = document.querySelector('.moviePoster');
    var filmTitle = document.querySelector('.filmTitle');
    var episodeId = document.querySelector('.episodeId');
    var movieCrawl = document.querySelector('.movieCrawl');
    var collapse = document.querySelector('.collapse');
    var filter = document.querySelector('#filter');
    var filterContainer = document.querySelector('#filterContainer');

    // initial url for the first ajax call
    var url = "http://swapi.co/api/people/?format=json";
    // tracks how many times the load characters button has been clicked
    var buttonContent = 0;


// INITIAL AJAX CALL -------------------------------------------------------------------------------------------------------

    function showResults() {
        searchRequest = createRequest();
        
        if(searchRequest === null) {
            alert ("Please upgrade to a modern browser");
            return;
        }

        searchRequest.onreadystatechange = characterLoading;
        searchRequest.open("GET", url, true);
        searchRequest.send(null);
    }


    function characterLoading() {
        // if the request is successfull parse the response text
        if(searchRequest.readyState===4 || searchRequest.readyState==="complete") {
            var parsedResponse = JSON.parse(searchRequest.responseText);
            
            // populate the results with li elements that state the name, 
            // and create a link to the first film in the results array
            for(var i=0; i<parsedResponse.results.length; i++) {
                results.innerHTML += '<a href="'+parsedResponse.results[i].films[0]+'?format=json"><li class="characterList">'
                +parsedResponse.results[i].name+'</li></a>';
            }

            document.querySelector('#mainContent').classList.remove('fullHeight');
            results.classList.add('character-fade-in');
            var listItems = results.getElementsByTagName('a');

            // add an event listener on the li's that grabs the href attribute, 
            // fades the detail panel in, and updates the active link
            for(var i=0; i<listItems.length; i++) {
                listItems[i].addEventListener('click', function(e) {
                    e.preventDefault();
                    displayInfo(this.getAttribute("href"));
                    detailSection.classList.remove('fade-out');
                    detailSection.classList.add('fade-in');
                    displayActiveLink(this.firstElementChild);
                });
            }

            // updates the url to load the next page of characters
            // fade in filter input
            url = parsedResponse.next;
            console.log(url);
            filterContainer.classList.remove('hidden');
            filterContainer.classList.add('character-fade-in');

            // update content of the button
            if (buttonContent ===0) {
                buttonContent++;
                startButton.innerHTML = 'Load MORE characters';
            }
            else if(buttonContent===1) {
                buttonContent++;
                startButton.innerHTML = 'Load EVEN MORE characters';
            }
            else if(buttonContent>=2 && buttonContent<=8) {
                startButton.innerHTML = "I'm a Star Wars Nerd.";
                buttonContent++;
            }
        }
    }


// DETAILS AJAX CALL ------------------------------------------------------------------------------------------------------

    function displayInfo(url) {
        searchRequest = createRequest();

        if(searchRequest === null) {
            alert("Please upgrade to a modern browser");
            return;
        }

        var url = url;
        searchRequest.onreadystatechange = displayStatus;
        searchRequest.open("GET", url, true);
        searchRequest.send(null);
    }


    function displayStatus() {
        // if the second ajax call is successful parse the response text
        if(searchRequest.readyState===4 || searchRequest.readyState==="complete") {
            var secondResponse = JSON.parse(searchRequest.responseText);

            // update the background image of the div in the css to match the film id
            // update the title, episode id, and movie crawl
            // show the detail panel
            moviePoster.style.backgroundImage = 'url("./images/episode-'+secondResponse.episode_id+'.jpg")';
            filmTitle.innerHTML = secondResponse.title;
            episodeId.innerHTML = 'EPISODE '+secondResponse.episode_id;
            movieCrawl.innerHTML = secondResponse.opening_crawl;
            detailSection.classList.remove('hidden');
        }
    }


// FUNCTIONS -------------------------------------------------------------------------------------------------------------

    function displayActiveLink(character) {
        // take in a paramater of which character is active (if any)
        var character = character;
        var listItems = results.getElementsByTagName('li');
        
        // remove the active class from all li elements
        // if the parameter is undefined or null, exit the function
        // otherwise, add the active character class to the input parameter
        for(var i=0; i<listItems.length; i++) {
            listItems[i].classList.remove('activeCharacter');
        }

        if(character=="undefined" || character ==null){
            return;
        }
        else {
            character.classList.add('activeCharacter');
        }
    }

// EVENT LISTENERS -------------------------------------------------------------------------------------------------------

    // add an event listener to the start button
    // listener prevents the default, clears the filter, and makes another ajax call for more characters
    // if the next url to call is empty/null, don't try to make any more ajax calls
    startButton.addEventListener("click", function(e) {
        e.preventDefault();
        filter.value = '';
        if(url) {
            showResults();
        }
        else if(url==null || url=='undefined') {
            startButton.innerHTML = "No more Star Wars for You!";
        }
    }, false);

    // toggle classes that collapse the detail panel when the icon is clicked
    collapse.addEventListener("click", function(e){
        e.preventDefault();
        detailSection.classList.toggle('fade-out');
        detailSection.classList.toggle('fade-in');
        displayActiveLink();
    });

    // filter the results by accepting the value of the input on keyup
    // grab all the li elements in the character list to search through
    //convert everything to lowercase
    filter.addEventListener('keyup', function() {
        var str = String(filter.value.toLowerCase());
        var elementsToSearch = document.querySelectorAll('a li');

        // search through the li elements content, looking for the input value
        // if there is no match in the li, fade it out, then hide it completely
        // otherwise, display it/fade it in
        for(var i=0; i<elementsToSearch.length; i++) {
            var loop = String(elementsToSearch[i].innerHTML.toLowerCase());

            if(loop.search(str)==-1) {
                elementsToSearch[i].classList.add('searchFadeOut');
                elementsToSearch[i].classList.remove('searchFadeIn');
                var closure = elementsToSearch[i];

                // timer allows animation to finish before removing the class
                (function(closure) {
                    setTimeout(function() {
                    closure.classList.add('hidden');
                    }, 200);
                })(closure);
            }
            else {
                elementsToSearch[i].classList.remove('hidden');
                elementsToSearch[i].classList.add('searchFadeIn');
                elementsToSearch[i].classList.remove('searchFadeOut');
            }
        }
    });
})();