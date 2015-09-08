function getSummoner() {
	var summonerName = "";
	summonerName = $('#sName').val();
	if(summonerName !== ""){
		$.ajax({
			url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + summonerName + '?api_key=093e1934-1a18-490c-8062-1ec8df1b5923',
			type: 'GET',
			dataType: 'json',
			data: {},
			success: function(json) {
				var summonerNameNoSpace = summonerName.replace(" ", "");
				summonerNameNoSpace = summonerNameNoSpace.toLowerCase().trim();
				
				summonerLevel = json[summonerNameNoSpace].summonerLevel;
				document.getElementById("sLevel").innerHTML = summonerLevel;

				summonerID = json[summonerNameNoSpace].id;
				document.getElementById("sID").innerHTML = summonerID;

				summonerIcon = json[summonerNameNoSpace].profileIconId;
				document.getElementById("sIcon").src="http://ddragon.leagueoflegends.com/cdn/5.2.1/img/profileicon/" + summonerIcon + ".png";
				
				//Rank
				getRank(summonerID);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				alert("error");
			}
		});
	} else{}
}

function getRank(summonerID){
	$.ajax({
		url: 'https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/' + summonerID + '?api_key=093e1934-1a18-490c-8062-1ec8df1b5923',
		type: 'GET',
		dataType: 'json',
		data: {},
		success: function(json) {
			summonerRank = json[summonerID][0].tier;
			document.getElementById('sRank').innerHTML = summonerRank;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			alert("error getting summoner rank");
		}
	});
}