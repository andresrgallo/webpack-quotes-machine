import 'index.scss';

var theQuotes;

var colors = [
	'#16a085',
	'#27ae60',
	'#2c3e50',
	'#f39c12',
	'#e74c3c',
	'#9b59b6',
	'#FB6964',
	'#342224',
	'#472E32',
	'#BDBB99',
	'#77B1A9',
	'#73A857'
];

//Variable declarations
var currentQuote =
	'A good teacher can inspire hope, ignite the imagination, and instill a love of learning';
var currentAuthor = 'Brad Henry';
var rootApp = document.getElementById('root');
var text = document.getElementById('text');
var author = document.getElementById('author');
var quotesIcon = document.getElementById('quote-text');
var twitter = document.getElementById('tweet-icon');
var theButton = document.getElementById('new-quote');

//Initial text to render
text.innerHTML = currentQuote;
author.innerHTML = currentAuthor;

//Select a random color from the color array
function randomColor() {
	return colors[Math.floor(Math.random() * colors.length)];
}

//Assign random color to Body, button, text and tweet icon
rootApp.style.backgroundColor = randomColor();
var theColor = document.getElementById('root').style.backgroundColor;

function handleColor(someColor) {
	text.style.color = someColor;
	author.style.color = someColor;
	twitter.style.color = someColor;
	quotesIcon.style.color = someColor;
	theButton.style.backgroundColor = someColor;
}
handleColor(theColor);

const tweetQuote = document.getElementById('tweet-quote');
tweetQuote.href =
	'https://twitter.com/intent/tweet?hashtags=quotes&text=' +
	encodeURIComponent('"' + currentQuote + '" ' + currentAuthor);

fetch(
	'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
)
	.then(function(response) {
		return response.json();
	})
	.then(function(myJson) {
		theQuotes = myJson.quotes;
		initialize();
	})
	.catch(function(err) {
		console.log('Fetch problem: ' + err.message);
	});

function initialize() {
	//Button onClick
	const button = document.getElementById('new-quote');

	button.addEventListener('click', displayQuote);

	function displayQuote() {
		var randomQuote = theQuotes[Math.floor(Math.random() * theQuotes.length)];
		currentQuote = randomQuote.quote;
		currentAuthor = randomQuote.author;
		$('#quote-text').animate({ opacity: 0 }, 500, function() {
			$(this).animate({ opacity: 1 }, 500);
			$('#text').text(randomQuote.quote);
		});

		$('#quote-author').animate({ opacity: 0 }, 500, function() {
			$(this).animate({ opacity: 1 }, 500);
			$('#author').text(randomQuote.author);
		});
		var newColor = randomColor();
		rootApp.style.backgroundColor = newColor;
		handleColor(newColor);
		document.getElementsByTagName('svg')[1].style.color =
			rootApp.style.backgroundColor;
		tweetQuote.href =
			'https://twitter.com/intent/tweet?hashtags=quotes&text=' +
			encodeURIComponent('"' + currentQuote + '" ' + currentAuthor);
	}
}

(function() {
	console.log('At Quote Machine app');
})();
