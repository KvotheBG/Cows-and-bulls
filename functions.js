// Creating Array with 4 numbers function
var number = [];
var tries = 0;
function numberPick(){
	
	var array = [1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 0];
	var length = array.length;

	// shuffle

	while (length > 0){
		var index = Math.floor(Math.random() * length)
		length--;
		var first = array[length];
			array[length] = array[index];
			array[index] = first;
	}

	// first 4 numbers

	for (var i = 0; i < 4; i++) {
		number[i] = array[i];
	}
	console.log(number)
}
 numberPick();

// New game

var newGame = document.getElementById('newGame');

newGame.addEventListener('click', function () {
	numberPick();
	$( "#number" ).show();
	$( "#youWin" ).remove();
	$( ".shots" ).remove();
	tries = 0;
	$('#newGame').addClass('animated bounce');
	var wait = setTimeout(function(){
		$('#newGame').removeClass('animated bounce');
	}, 1000);
});

// Only numbers

$('body').on('keypress', '#number', function(evt){

var char = String.fromCharCode(evt.which);

if (!(/[0-9]/.test(char))) {
	evt.preventDefault();
}
})

// find the bulls and cows

var input = document.getElementById('number');

input.addEventListener('keyup', function () {
	var	allNumbers = document.getElementById('number').value;
	var	allNumbersSplit = allNumbers.split("");
	var bull = 0;
	var match = 0;

	if (allNumbersSplit.length == 4) {
		tries++;
		for (var i = 0; i < 4; i++) {
			
			// Bull find

			for (var k = 0; k < 4; k++) {
				if (number[i] == allNumbersSplit[i]*1) {
					bull++;
					break
				}	
			}

			// Matching

			for (var j = 0; j < 4; j++) {
				if (number[i] == allNumbersSplit[j]*1 ) {
					match++;
					break
				}
			}
		}
		cow = match - bull;

		// New row in the table

		$('#myTable > tbody:last-child')
			.append('<tr class=" animated zoomIn shots"><td>'+tries+'</td><td>'+allNumbers+'</td><td>'+bull+'</td><td>'+cow+'</td></tr>');

	}

	// WIN

	if (bull == 4) {
		$( "#number" ).hide();
		$('#inputDiv').append('<h2 id="youWin" class="animated jackInTheBox">YOU WIN</h2>')
	}

});
