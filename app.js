let turn = 'x';

const combinations = [
    [ 1,1,1,0,0,0,0,0,0 ],
    [ 0,0,0,1,1,1,0,0,0 ],
    [ 0,0,0,0,0,0,1,1,1 ],
    [ 1,0,0,1,0,0,1,0,0 ],
    [ 0,1,0,0,1,0,0,1,0 ],
    [ 0,0,1,0,0,1,0,0,1 ],
    [ 1,0,0,0,1,0,0,0,1 ],
    [ 0,0,1,0,1,0,1,0,0 ],
];

function toggleTurn() {
    turn = turn == 'x' ? 'o' : 'x';
}

function placeMark( field ) {
    field.innerText = turn;
}

document.addEventListener( 'click', event => {
    if ( ! event.target.classList.contains( 'field' ) ) return;
    
    if ( event.target.innerText ) return;

    placeMark( event.target );
    
    toggleTurn();

} );