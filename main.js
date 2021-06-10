function main() {
	hide_all();
	$('#consent').show();
}

// hides all divs
function hide_all() {
    $('#preview').hide();
    $('#returning_worker').hide();
    $('#consent').hide();
    $('#data_instructions').hide();
    $('#data_viewing').hide();
    $('#game_instructions').hide();
    $('#game_play').hide();
    $('#data_recall').hide();
    $('#demographics').hide();
    $('#thankyou').hide();
}

function submit_consent() {
    show_data_instructions();
}

function show_data_instructions() {
	hide_all();
	$('#data_instructions').show();
}

function submit_data_instructions(){
	show_data_viewing();
}

function show_data_viewing() {
	hide_all();
	$('#data_viewing').show();
}

function submit_data_viewing() {
	show_game_instructions();
}

function show_game_instructions() {
	hide_all();
	$('#game_instructions').show();
}

function show_game_play() {
	hide_all();
    $('#game_instructions').show();
    $('#game_play').show();
}

function countdown() {
	alert("Time is up. Click OK to go to the next page.")
	show_data_recall();
}

function show_data_recall() {
	hide_all();
	$('#data_recall').show();
}


function submit_data_recall() {
	show_demographics();
}

// function validate_recall() {
// 	let txtVal = parseFloat($('#recall_input').value);
// 	if (txtVal > 0 && txtVal < 100) {
// 		return true;
// 	} else {
// 		alert('Your response must be between 0-100.');
// 		return false;
// 	}
// }

function show_demographics() {
	hide_all();
	$('#demographics').show();
}

function submit_demographics() {
	show_thankyou();
}

function show_thankyou() {
	hide_all();
	$('#thankyou').show();
}







