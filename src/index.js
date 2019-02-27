import 'index.scss';

var theQuotes;

// function createNode(element) {
// 	return document.createElement(element);
// }

// function append(parent, el) {
// 	return parent.appendChild(el);
// }

const strong = document.getElementById('text');

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
		let randomQuote = theQuotes[Math.floor(Math.random() * 100)];
		document.getElementById('text').innerHTML = randomQuote.quote;
		document.getElementById('author').innerHTML = randomQuote.author;
	}
}

(function() {
	console.log('At Quote Machine app');
})();
