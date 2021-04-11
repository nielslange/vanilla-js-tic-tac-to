// Prepare the data state.
const data = {
	currentPlayer: 'x',
	playerOne: [],
	playerTwo: [],
	fields: {},
	combinations: [
		[ 1,2,3 ], // → 1st row left to right
		[ 4,5,6 ], // → 2nd row left to right
		[ 7,8,9 ], // → 3rd row left to right
		[ 1,4,7 ], // ↓ 1st column top to bottom
		[ 2,5,8 ], // ↓ 2nd column top to bottom
		[ 3,6,9 ], // ↓ 3rd column top to bottom
		[ 1,5,9 ], // ↘ top-left to bottom-right
		[ 3,5,7 ], // ↙ top-right to bottom-left
	]
}

// Reset the game.
const resetGame = function() {
	data.currentPlayer = 'x';
	data.playerOne = [];
	data.playerTwo = [];
	data.fields = {};

	render();
}

// Prepare the template.
const template = function() {
	const fields = getFields();
	let message = '';

	if ( hasWinner() ) {
		message = winnerMessage();
	}
	
	if ( isDraw() ) {
		message = drawMessage();
	}

	return `
	<div class="row mb-3">
		<div class="col">x: ${data.playerOne.length} moves</div>
		<div class="col">Turn: ${data.currentPlayer}</div>
		<div class="col">o: ${data.playerTwo.length} moves</div>
	</div>
	<div class="row">${fields}</div>
	<div class="row mt-3">${message}</div>
	`;
}

// Get the fields.
const getFields = function() {
	let fields = '';

	for ( let i = 1; i <= 9; i++ ) {
		const value = data.fields[i] || '';
		const style = data.fields[i] || hasWinner() ? 'disabled' : '';
		fields += `<div class="col-4 ${style}" data-field="${i}">${value}</div>`;
	}

	return fields;
}

// Prepare the winner message.
const winnerMessage = function() {
	const winner = 'x' !== data.currentPlayer ? 'x' : 'o';
	return `
		<div class="alert alert-success" role="alert">
			<span class="float-start mt-1">${winner} is the winner!</span>
			<button class="btn btn-light float-end" onclick="resetGame()">Play again</button>
		</div>
	`;
}

// Prepare the draw message.
const drawMessage = function() {
	return `
		<div class="alert alert-info" role="alert">
			<span class="float-start mt-1">It is a draw!</span>
			<button class="btn btn-light float-end" onclick="resetGame()">Play again</button>
		</div>
	`;
}

// Render the UI.
const render = function( scope = '' ) {
	const app = document.querySelector('#app');
	app.innerHTML = template();
}

// Toggle the turn.
const toggleTurn = function() {
	if ( 'x' == data.currentPlayer ) {
		data.currentPlayer = 'o';    
	} else {
		data.currentPlayer = 'x';
	}

	render();
}

// Add a marker.
const addMarker = function( field ) {
	data.fields[field] = data.currentPlayer;

	if ( 'x' == data.currentPlayer ) {
		data.playerOne.push(+field);
	} else {
		data.playerTwo.push(+field);
	}

	toggleTurn();
}

// Count all marker.
const countMarker = function () {
	return count = data.playerOne.length + data.playerTwo.length;
}

// Check if game has a winner.
const hasWinner = function() {
	const array = 'x' !== data.currentPlayer ? data.playerOne : data.playerTwo;
	let hasWinner = false;
	
	data.combinations.forEach( combination => {
		if ( combination.every( val => array.includes( val ) ) ) {
			hasWinner = true;
		}
	} );

	return hasWinner;
}

// Check if game is a draw.
const isDraw = function() {
	return ( 9 === countMarker() ) ? true : false;
}

// Handle click event.
const clickEvent = function( event ) {
	if ( ! event.target.matches( '[data-field]' ) ) return;

	if ( event.target.matches( '.disabled' ) ) return;

	addMarker( event.target.dataset.field );
}

// Render the UI.
render();

// Listen for events.
document.addEventListener( 'click', clickEvent, false );