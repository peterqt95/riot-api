function findChamp(){
	$.ajax({
		url: 'https://na.api.pvp.net/api/lol/na/v1.2/champion?freeToPlay=true&api_key=093e1934-1a18-490c-8062-1ec8df1b5923',
		type: 'GET',
		dataType: 'json',
		data: {},
		success: function(json){
			var champion = [];
			var listLength = json['champions'].length;
			for(var i = 0; i < listLength; i++){
				champion.push(json['champions'][i].id);
			}

			//Pass ID to retrieve Champ name
			for(var i = 0; i < listLength; i++){
				//Set image for champion
				getChamp(champion, i);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			alert("something went wrong");
		}
	});
}

function getChamp(championIDList, i){
	$.ajax({
		url: 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/' + championIDList[i] + '?api_key=093e1934-1a18-490c-8062-1ec8df1b5923',
		type: 'GET',
		dataType: 'json',
		data: {},
		success: function(currentChamp){
			var champName = currentChamp.key;
			var currentIdx = i.toString();
			var currentImgNav = 'champ'.concat(currentIdx);
			var currentImgBG = currentImgNav.concat('_bg');
			var currentChampName = currentImgNav.concat('_name');
			var currentChampTitle = currentImgNav.concat('_title');

			document.getElementById(currentChampName).innerHTML = currentChamp.name; //set Name
			document.getElementById(currentChampTitle).innerHTML = currentChamp.title; //set Title
			document.getElementById(currentImgNav).src = 'http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/'+champName+'.png'; //set nav img
			document.getElementById(currentImgBG).src = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/'+champName+'_0.jpg'; //set bg img

			//Set current Champion Passive
			getPassive(championIDList[i], i);
			getSkills(championIDList[i], i);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			alert("champ name fail");
		}
	});
}

function getPassive(championID, curIndex){
	$.ajax({
		url: 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/' + championID + '?champData=passive&api_key=093e1934-1a18-490c-8062-1ec8df1b5923',
		type: 'GET',
		dataType: 'json',
		data: {},
		success: function(currentChamp){
			//Elements to fill in document
			var passive_name = currentChamp.passive.name;
			var passive_img = currentChamp.passive.image.full;
			var passive_desc = currentChamp.passive.description;

			//Find the correct selector
			var index = curIndex.toString();
			var doc_id_passive = 'passive'.concat(index);
			var doc_id_passive_name = doc_id_passive.concat('_name');
			var doc_id_passive_img = doc_id_passive.concat('_img');
			var doc_id_passive_desc = doc_id_passive.concat('_desc');

			//Assign values to appropriate selector
			document.getElementById(doc_id_passive_name).innerHTML = passive_name;
			document.getElementById(doc_id_passive_img).src = 'http://ddragon.leagueoflegends.com/cdn/5.2.1/img/passive/' + passive_img;
			document.getElementById(doc_id_passive_desc).innerHTML = passive_desc;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			alert("champ passive fail");
		}
	});
}

function getSkills(championID, curIndex){
	$.ajax({
		url: 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/' + championID + '?champData=spells&api_key=093e1934-1a18-490c-8062-1ec8df1b5923',
		type: 'GET',
		dataType: 'json',
		data: {},
		success: function(currentChamp){
			for(var j = 0; j < 4; j++){
				/* Elements to fill DOM */

				//name
				var skill_name = currentChamp.spells[j].name;
				//Determine skill range
				var skill_range = "Range: " + currentChamp.spells[j].rangeBurn;
				//Determine skill cost
				var skill_cost = currentChamp.spells[j].costType + ": " + currentChamp.spells[j].costBurn;
				//Determine skill CD
				var skill_cd = "Cooldown: " + currentChamp.spells[j].cooldownBurn;
				//image
				var skill_image = currentChamp.spells[j].image.full;

				/* Getting correct selector for DOM */

				var index = curIndex.toString();
				var spellIndex = j.toString();
				var curChamp = 'champ'.concat(index);
				var doc_id_skill = curChamp.concat('_skill');
				doc_id_skill = doc_id_skill.concat(spellIndex);
				var doc_id_skill_name = doc_id_skill.concat('_name');
				var doc_id_skill_img = doc_id_skill.concat('_img');
				var doc_id_skill_range = doc_id_skill.concat('_range');
				var doc_id_skill_cost = doc_id_skill.concat('_cost');
				var doc_id_skill_cd = doc_id_skill.concat('_cd');
				var doc_id_skill_active = doc_id_skill.concat('_active');


				/* Setting Elements */
				document.getElementById(doc_id_skill_name).innerHTML = skill_name;
				document.getElementById(doc_id_skill_img).src = 'http://ddragon.leagueoflegends.com/cdn/5.2.1/img/spell/' + skill_image;
				document.getElementById(doc_id_skill_cost).innerHTML = skill_cost;
				document.getElementById(doc_id_skill_range).innerHTML = skill_range;
				document.getElementById(doc_id_skill_cd).innerHTML = skill_cd;
				document.getElementById(doc_id_skill_active).innerHTML = currentChamp.spells[j].description;
			}

		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			alert("champ skill name fail");
		} 
	});
}

//Create environment for slider to function
var image_change_speed = 5000,
	transition_speed = 400;
var items = $("#background").children('div'), // list of all the images
	nav = $("#nav").children('li'),
	item_length = items.length,
	current,
	refresh_time;

//Event handlers
$("#nav li").click(function(){
	var i = $("#nav li").index(this);
	newImage(i);
});

//Go to next picture
function newImage(index){
	var i = index;
	
	//when previous is clicked
	if(index == 'prev'){
		if(current > 0){
			i = current - 1;
		}
		else {
			// when index is 0
			i = item_length-1;
		}
	}

	//when next is clicked
	if(index == 'next'){
		if(current < item_length-1){
			i = current + 1;
		}
		else{
			i = 0;
		}
	}

	//transition only if its a new picture
	if(current !== i){
		nav.removeClass('active').eq(i).addClass('active');
		items.fadeOut(transition_speed).eq(i).fadeIn(transition_speed);
		current = i;
	}

	//reset time interval
	clearTimeout(refresh_time);
	refresh_time = setTimeout(function(){ newImage('next'); }, image_change_speed);
};

/* View skills */
var $active = $('.passive'),
	$oldTab;
var whichClicked = 'passive',
	newClick = '';

	$oldTab = $('nav a:first-of-type');
function tabSwitch() {
		$('.tab').on('click', function(event) {
		event.preventDefault();                          // Prevent link being followed
        newClick = $( this ).text().toLowerCase();
    	switch(newClick){
    		case '1':
    			newClick = 'skill0';
    			break;
    		case '2':
    			newClick = 'skill1';
    			break;
    		case '3':
    			newClick = 'skill2';
    			break;
    		case '4':
    			newClick = 'skill3';
    			break;
    		default:
    			newClick = 'passive';
    			break;
    	}
        if ( newClick !== whichClicked ) {
        	$oldTab.removeClass('selected');
            $oldTab = $( this );

            $active.css( 'display', 'none' );           // Hide the last active pane

            $active = $( '.' + newClick );              // Set variable that indicates what the currently active pane is

            $active.css( 'display', 'block' );          // Display the new currently active pane
            whichClicked = newClick;

            $( this ).addClass( 'selected' );
        }
	});
}

$(document).ready(function() {
	findChamp();
	//start slider
	//newImage('next');
	tabSwitch();
})
