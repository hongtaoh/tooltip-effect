// turn on/off console logging
var DEBUG_STATE = true;
var recall1, recall2, recall3, recall4, recall5;

// subject-level variables as globals
// we need to declear all the variables that we need to record
var assignment_id, worker_id, hit_id, submit_to;
var ts_consent_start; 

function main() {
	// create fake assignment id, hit id, and worker id if none provided

    var url_string = window.location.href
    var url = new URL(url_string);

    // var c = url.searchParams.get("workerid");


  //   if ($.url().attr('query') == "") {
		// logger('creating fake assignment');
		// var params = create_test_assignment();
		// var query_str = window.location.pathname + '?' + $.param(params);
		// window.history.pushState("", "", query_str);
  //   }
  //   // getting study params from mturk 
    assignment_id = url.searchParams.get('assignmentId');
    worker_id = url.searchParams.get('workerId');
    hit_id = url.searchParams.get('hitId');
    submit_to = url.searchParams.get('turkSubmitTo');


	hide_all();

	// check whether this worker is a returning worker
    var workerset = get_workerset();
    if (workerset.has(worker_id)) {
        $('#returning_worker').show();
        return;
    }

    if (assignment_id == 'ASSIGNMENT_ID_NOT_AVAILABLE') {
    	$('#preview').show();
    		return;
        } else {
        	// based on param, assign variables
    }

    // Show consent form
	$('#consent').show();
    ts_consent_start = getDateTime();

    // debug a page
    // hide_all()
    // show_data_viewing()
    // show_data_recall()
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
    $('#final_submit').hide();
    // $('#thankyou').hide();
}

function submit_consent() {
    ts_instruction_start = getDateTime();
    show_data_instructions();
}

function show_data_instructions() {
	hide_all();
	$('#data_instructions').show();
}

function submit_data_instructions(){
    ts_viewing_start = getDateTime()
	show_data_viewing();
}

function show_data_viewing() {
	hide_all();
	$('#data_viewing').show();
}

function submit_data_viewing() {
    ts_game_instruction_start = getDateTime();
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
    ts_recall_start = getDateTime();
	alert("Time is up. Click OK to go to the next page.");
	show_data_recall();
}

function show_data_recall() {
	hide_all();
	$('#data_recall').show();
}

function submit_data_recall() {
    ts_demographics_start = getDateTime();
    recall1 = $('#recall1').val()
    recall2 = $('#recall2').val()
    recall3 = $('#recall3').val()
    recall4 = $('#recall4').val()
    recall5 = $('#recall5').val()
	show_demographics();
}

function show_demographics() {
	hide_all();
	$('#demographics').show();
    // get the value from radio button input
    // $("input:radio[name=rd]:checked").val()
}

function submit_demographics() {
	show_submit_page();
}

function show_submit_page() {
    hide_all();
    $('#final_submit').show();
    $('from#submit_to_turk').attr('action', submit_to + 'mturk/externalSubmit');
    // submit_to_turk
    // sandbox: "https://workersandbox.com/"
    // production: "https://amazonmechanicalturk.com/"
    // logger('assignment is')
    // logger(assignment_id)

    ts_submitted = getDateTime();

    // // add all the params you want to log 
    params = {
        assignmentId: assignment_id,
        workerId: worker_id,
        hitId: hit_id,
        recall1: recall1,
        recall2: recall2,
        recall3: recall3,
        recall4: recall4,
        recall5: recall5,
        tooltips, tooltips,
        ts_consent_start: ts_consent_start,
        ts_instruction_start: ts_instruction_start,
        ts_viewing_start: ts_viewing_start ,
        ts_game_instruction_start: ts_game_instruction_start,
        ts_recall_start: ts_recall_start,
        ts_demographics_start: ts_demographics_start,
        ts_submitted_:ts_submitted // if you change it to ts_submitted instead of ts_submitted_ this will break
    };
    logger(tooltips)

     $.each(params, function (name, val) {
        $('form#submit_to_turk').append('<input type=hidden name="' + name + '" value="' + val + '" />');
    });

}


//generate fake assignment_id, worker_id, and hit_id
function create_test_assignment() {
    var characters = 'ABCDEFGHIJoKLMNOPQRSTUVWXYZ0123456789';
    characters = characters.split('');

    suffix = shuffle(characters).slice(0, 12).join('');

    return {assignmentId: 'ASSIGNMENT_' + suffix,
	    hitId: 'HIT_' + suffix,
	    turkSubmitTo: 'https://workersandbox.mturk.com',
	    workerId: 'WORKER_' + suffix};
}

/* HELPER FUNCTIONS BELOW */
function logger(msg) {
    if (DEBUG_STATE)
	console.log(msg);
}

function shuffle(n){for(var t,e,r=n.length;r;)e=0|Math.random()*r--,t=n[r],n[r]=n[e],n[e]=t;return n}

// http://stackoverflow.com/a/19176102/76259
function getDateTime() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }   
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }   
    var dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;   
     return dateTime;
}


function get_workerset() {
    return new Set(["ABEKDKSE839827987", "workerid2"]);
}
