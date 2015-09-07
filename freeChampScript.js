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
			//document.getElementById('champ').innerHTML = champion;

			//Pass ID to retrieve Champ name
			for(var i = 0; i < listLength; i++){
				//Set image for champion
				getChamp(champion, i);
			}
		},
		error: function(XMLHttpReqest, textStatus, errorThrown){
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
			var currentImgBG = currentImgNav.concat('bg');
			document.getElementById(currentImgNav).src = 'http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/'+champName+'.png';
			document.getElementById(currentImgBG).src = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/'+champName+'_0.jpg';
		},
		error: function(XMLHttpReqest, textStatus, errorThrown){
			alert("champ name fail");
		}
	});
}

//Create environment for slider to function
var image_change_speed = 5000,
	transition_speed = 400;
var items = $("#background").children('img'),
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
			i = item_length - 1;
		}
	}

	//when next is clicked
	if(index == 'next'){
		if(current < item_length - 1){
			i = current + 1;
		}
		else{
			i = 0;
		}
	}

	//switch to the new picture
	nav.removeClass('active').eq(i).addClass('active');
	items.fadeOut(transition_speed).eq(i).fadeIn(transition_speed);
	current = i;

	//reset time interval
	clearTimeout(refresh_time);
	refresh_time = setTimeout(function(){ newImage('next'); }, image_change_speed);
};


$(document).ready(function() {
	findChamp();
	//start slider
	newImage('next');
})
