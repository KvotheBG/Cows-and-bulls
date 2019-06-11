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
	$('#myTable').removeClass('animated flash infinite');
	$('p').empty();
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

var inputNum = document.getElementById('number');

// Keyup function 

inputNum.addEventListener('keyup', function () {
	var	allNumbers = document.getElementById('number').value;
	var	allNumbersSplit = allNumbers.split("");
	var bull = 0;
	var match = 0;

	// Check for repeating number in the input element

	var repeat = [];
	for (var i = 0; i < allNumbersSplit.length; i++) {
			
		if (repeat.indexOf(allNumbersSplit[i]) == -1) {
			repeat.push(allNumbersSplit[i]);
		} else {
			alert("You can't use the same number more than once")
			return;
		}
	}

	console.log(repeat)
	// find the bulls and cows

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
		if (bull == 2 && cow == 2) {
			$('#myTable > tbody:last-child')
				.append('<tr class=" animated rubberBand shots"><td class="red animated heartBeat infinite"> &#9825; </td><td>'+allNumbers+'</td><td class="animated heartBeat infinite red">'+bull+'</td><td class="animated heartBeat infinite red">'+cow+'</td></tr>');
		} else{
			$('#myTable > tbody:last-child')
				.append('<tr class=" animated rubberBand shots"><td>'+tries+'</td><td>'+allNumbers+'</td><td>'+bull+'</td><td>'+cow+'</td></tr>');
		}
		$('p').text(bull+' * B | '+cow+' * C');
	}

	// WIN

	if (bull == 4) {
		$( "#number" ).hide();
		$('#inputDiv').append('<h2 id="youWin" class="animated jackInTheBox">YOU WIN</h2>');
		$('#myTable').addClass('animated flash infinite');
	}

});
