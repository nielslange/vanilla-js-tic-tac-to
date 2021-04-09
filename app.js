(function () {

    let currentPlayer = 'x';
    let playerOne = [];
    let playerTwo = [];

    const combinations = [
        [ 1,2,3 ], // → 1st row left to right
        [ 4,5,6 ], // → 2nd row left to right
        [ 7,8,9 ], // → 3rd row left to right
        [ 1,4,7 ], // ↓ 1st column top to bottom
        [ 2,5,8 ], // ↓ 2nd column top to bottom
        [ 3,6,9 ], // ↓ 3rd column top to bottom
        [ 1,5,9 ], // ↘ top-left to bottom-right
        [ 3,5,7 ], // ↙ top-right to bottom-left
    ];

    function toggleTurn() {
        if ( 'x' == currentPlayer ) {
            currentPlayer = 'o';    
        } else {
            currentPlayer = 'x';
        }
    }

    function placeMarker( field ) {
        const index = field.dataset.field;
        'x' == currentPlayer ? playerOne.push(+index) : playerTwo.push(+index);
        field.innerText = currentPlayer;
        field.setAttribute( 'class', 'disabled' );

        checkState();
    }

    function countMarker() {
        return playerOne.length + playerTwo.length;
    }

    async function checkState() {
        const array = 'x' == currentPlayer ? playerOne : playerTwo;
        let hasWinner = false;

        combinations.forEach( combination => {
            if ( combination.every( val => array.includes( val ) ) ) {
                hasWinner = true;
                showWinnerMessage();
            }
        } );

        if ( ! hasWinner && 9 === countMarker() ) {
            showDrawMessage();
        }

        await sleep(100);
        toggleTurn();
    }

    function sleep( ms ) {
        return new Promise(resolve => setTimeout( resolve, ms ) );
    }

    async function showWinnerMessage() {
        await sleep(100);
        if ( confirm(`${currentPlayer} is the winner! Wanna play again?`) ) {
            window.location = window.location;
        }
    }

    async function showDrawMessage() {
        await sleep(100);
        if ( confirm('No more moves possible! Wanna play again?') ) {
            window.location = window.location;
        }
    }

    document.addEventListener( 'click', event => {
        if ( ! event.target.dataset.field ) return;
        
        if ( event.target.innerText ) return;

        placeMarker( event.target );
    } );

})();