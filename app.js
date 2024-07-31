// PART 1:

// Q 1:
const favoriteNumber = 2;

async function getFactAboutNumber(number) {
	const res = await fetch(
		`http://numbersapi.com/${number}?json`
	);
	const data = await res.json();
	return data.text;
}

async function displayFavoriteNumberFact() {
	const fact = await getFactAboutNumber(favoriteNumber);
	document.getElementById(
		"favorite-number-fact"
	).innerText = fact;
}

displayFavoriteNumberFact();

// Q 2:

const numbers = [3, 12, 20, 22];

async function getFactsAboutNumbers(numbers) {
	const res = await fetch(
		`http://numbersapi.com/${numbers.join(",")}?json`
	);
	const data = await res.json();
	return data;
}

async function displayMultipleNumbersFacts() {
	const facts = await getFactsAboutNumbers(numbers);
	const factsContainer = document.getElementById(
		"multiple-numbers-facts"
	);

	for (const number in facts) {
		const factDiv = document.createElement("div");
		factDiv.innerText = `- ${facts[number]}`;
		factsContainer.appendChild(factDiv);
	}
}

displayMultipleNumbersFacts();

// Q 3:
async function getMultipleFactsAboutNumber(number, count) {
	const facts = [];
	for (let i = 0; i < count; i++) {
		const fact = await getFactAboutNumber(number);
		facts.push(fact);
	}
	return facts;
}

async function displayFourFacts() {
	const facts = await getMultipleFactsAboutNumber(
		favoriteNumber,
		4
	);
	const factsContainer =
		document.getElementById("four-facts");

	facts.forEach((fact) => {
		const factDiv = document.createElement("div");
		factDiv.innerText = fact;
		factsContainer.appendChild(factDiv);
	});
}

displayFourFacts();

// Part 2:

// Q 1:

async function drawSingleCard() {
	const res = await fetch(
		"https://deckofcardsapi.com/api/deck/new/draw/?count=1"
	);
	const data = await res.json();
	const card = data.cards[0];
	console.log(`${card.value} of ${card.suit}`);
}

drawSingleCard();

// Q 2:

async function drawTwoCards() {
	const res1 = await fetch(
		"https://deckofcardsapi.com/api/deck/new/draw/?count=1"
	);
	const data1 = await res1.json();
	const deckId = data1.deck_id;
	const card1 = data1.cards[0];
	console.log(
		`First card: ${card1.value} of ${card1.suit}`
	);

	const res2 = await fetch(
		`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
	);
	const data2 = await res2.json();
	const card2 = data2.cards[0];
	console.log(
		`Second card: ${card2.value} of ${card2.suit}`
	);
}

drawTwoCards();

// Q 3:
let deckId;

async function createNewDeck() {
	const res = await fetch(
		"https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
	);
	const data = await res.json();
	deckId = data.deck_id;
}

async function drawCard() {
	if (!deckId) {
		console.error("No deck available");
		return;
	}

	const res = await fetch(
		`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
	);
	const data = await res.json();

	if (data.remaining === 0) {
		alert("No more cards left in the deck!");
		document.getElementById(
			"draw-card-button"
		).disabled = true;
	} else {
		const card = data.cards[0];
		const cardDiv = document.createElement("div");
		cardDiv.className = "card";
		cardDiv.innerText = `${card.value} of ${card.suit}`;
		document
			.getElementById("cards-container")
			.appendChild(cardDiv);
	}
}

document
	.getElementById("draw-card-button")
	.addEventListener("click", drawCard);

createNewDeck()
	.then(() => {
		console.log("Deck created successfully");
	})
	.catch((err) => {
		console.error("Failed to create deck:", err);
	});
