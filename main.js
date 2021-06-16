// turn on/off console logging
const DEBUG_STATE = true;
let recall1, recall2, recall3, recall4, recall5;
const static = false;

// subject-level variables as globals
// we need to declear all the variables that we need to record
let assignment_id, worker_id, hit_id, submit_to;
let ts_consent_start, 
    ts_instruction_start, ts_viewing_start, 
    ts_game_instruction_start, ts_recall_start, 
    ts_demographics_start, ts_submitted_;
let demo_similar_data, demo_degree, demo_gender, demo_age, demo_ethnicity;

function getURLParams(mturk_param) {
    let url_string = window.location.href
    let url = new URL(url_string);
    let param = url.searchParams.get(mturk_param)
    return param;
}

// hides all divs
function hide_all() {
    $('#preview').hide();
    $('#returning_worker').hide();
    $('#consent').hide();
    $('#data_instructions').hide();
    $('#data_viewing').hide();
    $('#data_viewing_static').hide();
    $('#game_instructions').hide();
    $('#game_play').hide();
    $('#data_recall').hide();
    $('#demographics').hide();
    $('#final_submit').hide();
    // $('#thankyou').hide();
}

function main() {
  // getting study params from mturk 
    assignment_id = getURLParams('assignmentId');
    worker_id = getURLParams('workerId');
    hit_id = getURLParams('hitId');
    submit_to = getURLParams('turkSubmitTo');

	hide_all();

	// check whether this worker is a returning worker
    let workerset = get_workerset();
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
    // show_demographics()
    // show_data_recall()
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
    if (static) {
       $('#data_viewing_static').show(); 
    } else {
        $('#data_viewing').show(); 
    }
	
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
    demo_similar_data = $("input[type='radio'][name='similar_data']:checked").val();
    demo_degree = $("#degree :selected").val(); // https://stackoverflow.com/a/8549358/13716814
    demo_gender = $("input[type='radio'][name='gender']:checked").val();
    //https://www.w3schools.com/jsref/prop_number_value.asp:
    demo_age = document.getElementById("age").value; 
    demo_ethnicity = $("input[type='radio'][name='ethnicity']:checked").val();
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
        // recall data:
        recall1: recall1,
        recall2: recall2,
        recall3: recall3,
        recall4: recall4,
        recall5: recall5,
        // tooktips:
        tooltips, tooltips,
        // time stamps:
        ts_consent_start: ts_consent_start,
        ts_instruction_start: ts_instruction_start,
        ts_viewing_start: ts_viewing_start ,
        ts_game_instruction_start: ts_game_instruction_start,
        ts_recall_start: ts_recall_start,
        ts_demographics_start: ts_demographics_start,
        // if you change it to ts_submitted instead of ts_submitted_ this will break:
        ts_submitted_: ts_submitted,
        // demographics
        demo_similar_data: demo_similar_data,
        demo_degree: demo_degree,
        demo_gender: demo_gender,
        demo_age: demo_age,
        demo_ethnicity: demo_ethnicity
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
