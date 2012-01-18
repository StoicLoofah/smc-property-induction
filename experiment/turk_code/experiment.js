var trial = 0;
var premise = 0;
var trialId = -1;

// 0 for intro, 1 for premises, 2 for conclusion
var state = 0;

var startTime = 0;
var subjectId = -1;
var pressTime = 0;
var debug=false;

function getTrial(){
    $.post('api.php', {action: 'trial', 
		orderIndex: trial,
		trialIndex: stimuli[trial].trial,
		subjectId: subjectId},
	function(data){
	    trialId = data;
	});
}

function randInt(min, max){
    return Math.floor(Math.random() * ((max-min) + 1)) + min;
}

function randPermutation(array){
    for(i = 0; i < array.length; i++){
	var temp = randInt(i, array.length - 1);
	var tempVal = array[i];
	array[i] = array[temp];
	array[temp] = tempVal;
    }
}

stimuli = [
{"trial":1, "isCatch": 0,
"premises": [
{"animal":50, "text":"Dolphins have enzyme B639."},
{"animal":24, "text":"Seals have enzyme B639."}
],
"conclusion": {"animal":7, "text":"Therefore, horses have enzyme B639."}
},
{"trial":2, "isCatch": 0,
"premises": [
{"animal":25, "text":"Chimpanzees have enzyme W767."},
{"animal":20, "text":"Gorillas have enzyme W767."}
],
"conclusion": {"animal":7, "text":"Therefore, horses have enzyme W767."}
},
{"trial":3, "isCatch": 0,
"premises": [
{"animal":27, "text":"Squirrels have enzyme H512."},
{"animal":24, "text":"Seals have enzyme H512."}
],
"conclusion": {"animal":7, "text":"Therefore, horses have enzyme H512."}
},
{"trial":4, "isCatch": 0,
"premises": [
{"animal":27, "text":"Squirrels have enzyme D964."},
{"animal":50, "text":"Dolphins have enzyme D964."}
],
"conclusion": {"animal":7, "text":"Therefore, horses have enzyme D964."}
},
{"trial":5, "isCatch": 0,
"premises": [
{"animal":25, "text":"Chimpanzees have enzyme H280."},
{"animal":27, "text":"Squirrels have enzyme H280."}
],
"conclusion": {"animal":7, "text":"Therefore, horses have enzyme H280."}
},
{"trial":6, "isCatch": 0,
"premises": [
{"animal":20, "text":"Gorillas have enzyme L360."},
{"animal":24, "text":"Seals have enzyme L360."}
],
"conclusion": {"animal":7, "text":"Therefore, horses have enzyme L360."}
},
{"trial":7, "isCatch": 0,
"premises": [
{"animal":25, "text":"Chimpanzees have enzyme D972."},
{"animal":24, "text":"Seals have enzyme D972."}
],
"conclusion": {"animal":7, "text":"Therefore, horses have enzyme D972."}
},
{"trial":8, "isCatch": 0,
"premises": [
{"animal":20, "text":"Gorillas have enzyme K973."},
{"animal":44, "text":"Mice have enzyme K973."}
],
"conclusion": {"animal":7, "text":"Therefore, horses have enzyme K973."}
},
{"trial":9, "isCatch": 0,
"premises": [
{"animal":27, "text":"Squirrels have enzyme O929."},
{"animal":19, "text":"Elephants have enzyme O929."}
],
"conclusion": {"animal":7, "text":"Therefore, horses have enzyme O929."}
},
{"trial":10, "isCatch": 0,
"premises": [
{"animal":19, "text":"Elephants have enzyme L836."},
{"animal":28, "text":"Rhinoceroses have enzyme L836."}
],
"conclusion": {"animal":7, "text":"Therefore, horses have enzyme L836."}
},
{"trial":11, "isCatch": 0,
"premises": [
{"animal":20, "text":"Gorillas have enzyme V146."},
{"animal":19, "text":"Elephants have enzyme V146."}
],
"conclusion": {"animal":7, "text":"Therefore, horses have enzyme V146."}
},
{"trial":12, "isCatch": 0,
"premises": [
{"animal":20, "text":"Gorillas have enzyme Q701."},
{"animal":28, "text":"Rhinoceroses have enzyme Q701."}
],
"conclusion": {"animal":7, "text":"Therefore, horses have enzyme Q701."}
},
{"trial":13, "isCatch": 0,
"premises": [
{"animal":49, "text":"Cows have enzyme S117."},
{"animal":50, "text":"Dolphins have enzyme S117."}
],
"conclusion": {"animal":7, "text":"Therefore, horses have enzyme S117."}
},
{"trial":14, "isCatch": 0,
"premises": [
{"animal":49, "text":"Cows have enzyme J777."},
{"animal":20, "text":"Gorillas have enzyme J777."}
],
"conclusion": {"animal":7, "text":"Therefore, horses have enzyme J777."}
},
{"trial":15, "isCatch": 0,
"premises": [
{"animal":49, "text":"Cows have enzyme A892."},
{"animal":25, "text":"Chimpanzees have enzyme A892."}
],
"conclusion": {"animal":7, "text":"Therefore, horses have enzyme A892."}
},
{"trial":16, "isCatch": 0,
"premises": [
{"animal":49, "text":"Cows have enzyme A282."},
{"animal":19, "text":"Elephants have enzyme A282."},
{"animal":28, "text":"Rhinoceroses have enzyme A282."}
],
"conclusion": {"animal":51, "text":"Therefore, all mammals have enzyme A282."}
},
{"trial":17, "isCatch": 0,
"premises": [
{"animal":7, "text":"Horses have enzyme Y252."},
{"animal":50, "text":"Dolphins have enzyme Y252."},
{"animal":24, "text":"Seals have enzyme Y252."}
],
"conclusion": {"animal":51, "text":"Therefore, all mammals have enzyme Y252."}
},
{"trial":18, "isCatch": 0,
"premises": [
{"animal":25, "text":"Chimpanzees have enzyme K749."},
{"animal":20, "text":"Gorillas have enzyme K749."},
{"animal":24, "text":"Seals have enzyme K749."}
],
"conclusion": {"animal":51, "text":"Therefore, all mammals have enzyme K749."}
},
{"trial":19, "isCatch": 0,
"premises": [
{"animal":44, "text":"Mice have enzyme H246."},
{"animal":19, "text":"Elephants have enzyme H246."},
{"animal":28, "text":"Rhinoceroses have enzyme H246."}
],
"conclusion": {"animal":51, "text":"Therefore, all mammals have enzyme H246."}
},
{"trial":20, "isCatch": 0,
"premises": [
{"animal":44, "text":"Mice have enzyme V788."},
{"animal":27, "text":"Squirrels have enzyme V788."},
{"animal":24, "text":"Seals have enzyme V788."}
],
"conclusion": {"animal":51, "text":"Therefore, all mammals have enzyme V788."}
},
{"trial":21, "isCatch": 0,
"premises": [
{"animal":49, "text":"Cows have enzyme Z427."},
{"animal":25, "text":"Chimpanzees have enzyme Z427."},
{"animal":19, "text":"Elephants have enzyme Z427."}
],
"conclusion": {"animal":51, "text":"Therefore, all mammals have enzyme Z427."}
},
{"trial":22, "isCatch": 0,
"premises": [
{"animal":7, "text":"Horses have enzyme G982."},
{"animal":27, "text":"Squirrels have enzyme G982."},
{"animal":19, "text":"Elephants have enzyme G982."}
],
"conclusion": {"animal":51, "text":"Therefore, all mammals have enzyme G982."}
},
{"trial":23, "isCatch": 0,
"premises": [
{"animal":7, "text":"Horses have enzyme M421."},
{"animal":50, "text":"Dolphins have enzyme M421."},
{"animal":19, "text":"Elephants have enzyme M421."}
],
"conclusion": {"animal":51, "text":"Therefore, all mammals have enzyme M421."}
},
{"trial":24, "isCatch": 0,
"premises": [
{"animal":20, "text":"Gorillas have enzyme L340."},
{"animal":44, "text":"Mice have enzyme L340."},
{"animal":19, "text":"Elephants have enzyme L340."}
],
"conclusion": {"animal":51, "text":"Therefore, all mammals have enzyme L340."}
},
{"trial":25, "isCatch": 0,
"premises": [
{"animal":25, "text":"Chimpanzees have enzyme F391."},
{"animal":27, "text":"Squirrels have enzyme F391."},
{"animal":19, "text":"Elephants have enzyme F391."}
],
"conclusion": {"animal":51, "text":"Therefore, all mammals have enzyme F391."}
},
{"trial":26, "isCatch": 0,
"premises": [
{"animal":7, "text":"Horses have enzyme L366."},
{"animal":20, "text":"Gorillas have enzyme L366."},
{"animal":27, "text":"Squirrels have enzyme L366."}
],
"conclusion": {"animal":51, "text":"Therefore, all mammals have enzyme L366."}
},
{"trial":27, "isCatch": 0,
"premises": [
{"animal":27, "text":"Squirrels have enzyme Y781."},
{"animal":50, "text":"Dolphins have enzyme Y781."},
{"animal":28, "text":"Rhinoceroses have enzyme Y781."}
],
"conclusion": {"animal":51, "text":"Therefore, all mammals have enzyme Y781."}
},
{"trial":28, "isCatch": 0,
"premises": [
{"animal":44, "text":"Mice have enzyme L825."},
{"animal":24, "text":"Seals have enzyme L825."},
{"animal":19, "text":"Elephants have enzyme L825."}
],
"conclusion": {"animal":51, "text":"Therefore, all mammals have enzyme L825."}
},
{"trial":29, "isCatch": 0,
"premises": [
{"animal":7, "text":"Horses have enzyme O765."},
{"animal":25, "text":"Chimpanzees have enzyme O765."},
{"animal":24, "text":"Seals have enzyme O765."}
],
"conclusion": {"animal":51, "text":"Therefore, all mammals have enzyme O765."}
},
{"trial":30, "isCatch": 0,
"premises": [
{"animal":25, "text":"Chimpanzees have enzyme Z124."},
{"animal":27, "text":"Squirrels have enzyme Z124."},
{"animal":50, "text":"Dolphins have enzyme Z124."}
],
"conclusion": {"animal":51, "text":"Therefore, all mammals have enzyme Z124."}
},
{"trial":31, "isCatch": 0,
"premises": [
{"animal":1, "text":"Antelopes have enzyme V368."},
{"animal":40, "text":"Deer have enzyme V368."},
{"animal":39, "text":"Giant pandas have enzyme V368."}
],
"conclusion": {"animal":45, "text":"Therefore, polar bears have enzyme V368."}
},
{"trial":32, "isCatch": 0,
"premises": [
{"animal":48, "text":"Raccoons have enzyme F327."},
{"animal":47, "text":"Walruses have enzyme F327."},
{"animal":46, "text":"Collies have enzyme F327."}
],
"conclusion": {"animal":42, "text":"Therefore, pigs have enzyme F327."}
},
{"trial":33, "isCatch": 0,
"premises": [
{"animal":21, "text":"Oxen have enzyme X372."},
{"animal":37, "text":"Buffaloes have enzyme X372."},
{"animal":51, "text":"All mammals have enzyme X372."}
],
"conclusion": {"animal":17, "text":"Therefore, spider monkeys have enzyme X372."}
},
{"trial":34, "isCatch": 0,
"premises": [
{"animal":39, "text":"Giant pandas have enzyme V111."},
{"animal":19, "text":"Elephants have enzyme V111."},
{"animal":51, "text":"All mammals have enzyme V111."}
],
"conclusion": {"animal":28, "text":"Therefore, rhinoceroses have enzyme V111."}
},
{"trial":35, "isCatch": 0,
"premises": [
{"animal":3, "text":"Killer whales have enzyme R710."},
{"animal":9, "text":"Blue whales have enzyme R710."},
{"animal":18, "text":"Humpback whales have enzyme R710."}
],
"conclusion": {"animal":51, "text":"Therefore, all mammals have enzyme R710."}
},
{"trial":36, "isCatch": 0,
"premises": [
{"animal":13, "text":"Tigers have enzyme Z77."},
{"animal":15, "text":"Leopards have enzyme Z77."},
{"animal":43, "text":"Lions have enzyme Z77."}
],
"conclusion": {"animal":51, "text":"Therefore, all mammals have enzyme Z77."}
},
{"trial":37, "isCatch": 0,
"premises": [
{"animal":3, "text":"Killer whales have enzyme B877."},
{"animal":18, "text":"Humpback whales have enzyme B877."},
{"animal":34, "text":"Rats have enzyme B877."}
],
"conclusion": {"animal":51, "text":"Therefore, all mammals have enzyme B877."}
},
{"trial":38, "isCatch": 0,
"premises": [
{"animal":34, "text":"Rats have enzyme E34."},
{"animal":44, "text":"Mice have enzyme E34."},
{"animal":47, "text":"Walruses have enzyme E34."}
],
"conclusion": {"animal":51, "text":"Therefore, all mammals have enzyme E34."}
},
{"trial":39, "isCatch": 0,
"premises": [
{"animal":5, "text":"Dalmatians have enzyme L253."},
{"animal":8, "text":"German shepherds have enzyme L253."},
{"animal":19, "text":"Elephants have enzyme L253."}
],
"conclusion": {"animal":46, "text":"Therefore, collies have enzyme L253."}
},
{"trial":40, "isCatch": 6,
"premises": [
{"animal":25, "text":"Chimpanzees have enzyme G114."},
{"animal":44, "text":"Mice have enzyme G114."}
],
"conclusion": {"animal":-1, "text":"Please select 6 below on the scale."}
},
{"trial":41, "isCatch": 2,
"premises": [
{"animal":20, "text":"Gorillas have enzyme P269."},
{"animal":50, "text":"Dolphins have enzyme P269."}
],
"conclusion": {"animal":-1, "text":"Please select 2 below on the scale."}
}

];


function stepExperiment(e){
    if(e.which == 32){
	var curTime = (new Date()).getTime();
	if(pressTime != 0 && curTime - pressTime < 100)
	    return;
	pressTime = curTime;
	
	switch(state){
	case 0: //starting
	    state = 1;
	    getTrial();
	    $('.panel').hide();
	    $('.premise').html(stimuli[trial].premises[premise].text);
	    $('.panel[panel="premise"]').show();
	    startTime = (new Date()).getTime();
	    
	    break;
	case 1: //premises
	    var time = (new Date()).getTime() - startTime;
	    $.post('api.php', {'action':'premise',
			'subjectId':subjectId,
			'trial':trialId,
			'orderIndex':premise,
			'animal':stimuli[trial].premises[premise].animal,
			    'text':stimuli[trial].premises[premise].text,
			'time':time});
	    
	    //$('.debug').append(trial + ','  + premise + ',' + stimuli[trial].premises[premise] + ',' + time + ',<br />');
	    
	    premise++;
	    if(premise == stimuli[trial].premises.length){
		$('.panel').hide();
		$('.conclusion').html(stimuli[trial].conclusion.text);
		$('.message').empty();
		$('.rating').attr('checked', false);
		state = 2;
		$('.panel[panel="conclusion"]').show();
	    }else{
		$('.panel').hide();
		$('.premise').html(stimuli[trial].premises[premise].text);
		$('.panel[panel="premise"]').show();
		startTime = (new Date()).getTime();
	    }
	    
	    break;
	case 2: //conclusion
	    var response = $('input:radio[name=rating]:checked').val();
	    if(response == null){
		$('[.panel[panel="conclusion"] .message').html('Please select a rating to continue');
	    }else{
		var catchPassed = stimuli[trial].isCatch==0 || stimuli[trial].isCatch==parseInt(response);
		$.post('api.php', {'action':'conclusion',
			    'subjectId':subjectId,
			    'trial':trialId,
			    'text':stimuli[trial].conclusion.text,
			    'animal':stimuli[trial].conclusion.animal,
			    'rating':response,
			    'catchPassed':catchPassed});
		if(!catchPassed)
		    $('#catchPassed').val('0');
		//$('.debug').append(trial + ',C,' + stimuli[trial].conclusion + ',' + response + ',<br />');
		state = 1;
		premise = 0;
		trial++;
		$('.bar').css('width', (200.0 * trial / stimuli.length) + 'px');
		
		if(trial == stimuli.length){			
		    $('.panel').hide();
		    $('.panel[panel="survey"]').show();
		    $('#finalTrial').val(trial);
		    state = 3;
		}else{
		    getTrial();
		    $('.panel').hide();
		    $('.premise').html(stimuli[trial].premises[premise].text);
		    $('.panel[panel="premise"]').show();
		    startTime = (new Date()).getTime();
		}
	    }
	    break;
	}
	
	
    }
}


function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}

var GET = getQueryParams(document.location.search);

$(document).ready(function(){
	$('.panel[panel="intro"]').show();
	
	debug = 'debug' in GET && GET['debug'] == '1';

	if(!(debug || ('assignmentId' in GET && GET['assignmentId'] != 'ASSIGNMENT_ID_NOT_AVAILABLE')))
	    return;

	if(!debug){
	    $('#assignmentId').val(GET['assignmentId']);
	    $('#hitId').val(GET['hitId']);
	    $('#workerId').val(GET['workerId']);
	}
	    
	$.post('api.php', {action: 'subject', 
		    assignmentId: $('#assignmentId').val(), 
		    hitId: $('#hitId').val(),
		    workerId: $('#workerId').val()}, function(data){
		subjectId = data;
		$('.subjectId').val(subjectId);
	    });

	for(var i = 0; i < stimuli.length; i++){
	    randPermutation(stimuli[i].premises);
	}
	randPermutation(stimuli);
	
	$('.rating').click(function(){
		$('[.panel[panel="conclusion"] .message').html('Press spacebar to continue to the next example.');
	    });
	
	$('.surveydone').click(function(){
		if(!$('.age:checked').val() || !$('.sex:checked').val()){
		    $('#surveyform .message').html('Please respond to the questions above before continuing');
		}else{
		    $.post('api.php', {action:'survey',
				subjectId:$('#subjectId').val(),
				sex:$('.sex:checked').val(),
				age:$('.age:checked').val(),
				comments:$('.comments').val(),
				explanation:$('.explanation').val()}
			);
		    $('.panel').hide();
		    $('.panel[panel="thankyou"]').show();
		}
	    });

	if(navigator.appName == 'Microsoft Internet Explorer' && parseFloat(navigator.appVersion.split("MSIE")[1]) <= 8)
	    $(document).keydown(stepExperiment);
	else
	    $(document).keypress(stepExperiment);


    });

