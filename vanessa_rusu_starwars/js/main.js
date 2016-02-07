//JavaScript Document
(function() {
	//variables
	var searchRequest;
	var results = document.querySelector('#results');
	var startButton = document.querySelector('#startButton');
	var detailSection = document.querySelector('#detailSection');
	var moviePoster = document.querySelector('.moviePoster');
	var filmTitle = document.querySelector('.filmTitle');
	var episodeId = document.querySelector('.episodeId');
	var movieCrawl = document.querySelector('.movieCrawl');
	var collapse = document.querySelector('.collapse');
	var url = "http://swapi.co/api/people/?format=json";
	console.log('first url is ' +url);

	var buttonContent = 0;


// INITIAL AJAX CALL --------------------------------------------------------------------------

	function showResults(str) {
		searchRequest = createRequest();
		if(searchRequest === null) {
			alert ("Please upgrade to a modern browser");
			return;
		}
		// var url = "http://swapi.co/api/people/?format=json";
		searchRequest.onreadystatechange = searchStatus;
		searchRequest.open("GET", url, true);
		searchRequest.send(null);
	}

	function searchStatus() {
		if(searchRequest.readyState===4 || searchRequest.readyState==="complete") {
			var parsedResponse = JSON.parse(searchRequest.responseText);
			console.log(parsedResponse.results.length + parsedResponse.results.length);
			for(var i=0; i<parsedResponse.results.length; i++) {
				console.log();
				results.innerHTML += '<a href="'+parsedResponse.results[i].films[0]+'?format=json"><li class="characterList">'+parsedResponse.results[i].name+'</li></a>';
			} 
			document.querySelector('#mainContent').classList.remove('fullHeight');
			results.classList.add('character-fade-in');
			var listItems = results.getElementsByTagName('a');
			console.log(listItems[0].getAttribute("href"));
			for(i=0; i<listItems.length; i++) {
				listItems[i].addEventListener('click', function(e) {
					e.preventDefault();
					displayInfo(this.getAttribute("href"));
						// alert('I contain fade-in');
						detailSection.classList.remove('fade-out');
						detailSection.classList.add('fade-in');


				});
			}
url = parsedResponse.next;
console.log('last url is '+url);
}
		}

// DETAILS AJAX CALL --------------------------------------------------------------------------

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
		if(searchRequest.readyState===4 || searchRequest.readyState==="complete") {
			var secondResponse = JSON.parse(searchRequest.responseText);
			// detailSection.classList.toggle('fade-out');
			moviePoster.style.backgroundImage = 'url("./images/episode-'+secondResponse.episode_id+'.jpg")';
			filmTitle.innerHTML = secondResponse.title;
			console.log(secondResponse.title);
			episodeId.innerHTML = 'EPISODE '+secondResponse.episode_id;
			console.log(secondResponse.episode_id);
			movieCrawl.innerHTML = secondResponse.opening_crawl;






			// console.log(detailSection.style);
			detailSection.classList.remove('hidden');
			// detailSection.classList.toggle('fade-in');
			// alert(secondResponse.title);
			// '<figure class="moviePoster"><image src="./images/episode-'+secondResponse.episode_id+'.jpg"></figure>'
		}
	}

	//listener
	startButton.addEventListener("click", function(e) {
		e.preventDefault();
		if (buttonContent ===0) {
			showResults(this.value);
			buttonContent++;
			startButton.innerHTML = 'Load MORE characters';
		}
		else if(buttonContent===1) {
			showResults(this.value);
			buttonContent++;
			startButton.innerHTML = 'Load EVEN MORE characters';
		}
		else if(buttonContent>=2 && buttonContent<=8) {
			showResults(this.value);
			startButton.innerHTML = "I'm a Star Wars Nerd.";
			buttonContent++;
			console.log(buttonContent);
		}
		else if(buttonContent>=9) {
			startButton.innerHTML = "No more Star Wars for You!";
		}

	}, false);

	collapse.addEventListener("click", function(e){
		e.preventDefault();
		detailSection.classList.toggle('fade-out');
		detailSection.classList.toggle('fade-in');
	})


	// FILTER --------------------------------------------------------------------------

	var filter = document.querySelector('#filter');

	// function filterCharacters(value) {
	// 	var value = this.value.toLowerCase();
	// 	console.log(value);
	// }

filter.addEventListener('keyup', function() {
	var str = String(filter.value.toLowerCase());
	// console.log(str);
	var search = document.querySelectorAll('a li');
	console.log(search);

	for(i=0; i<search.length; i++) {
		var loop = String(search[i].innerHTML.toLowerCase());
		console.log(search[i]);
		if(str.indexOf(loop.substring(0, str.length)) >=0) {
		console.log('yes '+search[i].outerHTML);
		results.innerHTML += search[i].outerHTML;
	}
	else {
		console.log('no');
	}


	}
	// console.log(search[0].innerHTML);
	// console.log(search[0].innerHTML);
// 	var test = String(search[0].innerHTML.toLowerCase());
// console.log(search.length);
// 	console.log(str);
// 	console.log(test);


// if(str.indexOf(test.substring(0, str.length)) >=0) {
// 		console.log('yes');
// 	}
// 	else {
// 		console.log('no');
// 	}

	// console.log('im in the keyup');

	// console.log(search.find('l'));

});

	})();