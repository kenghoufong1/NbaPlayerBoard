var playersearchedbylastname = document.querySelector("#playersearchedid");
var searchbutton = document.querySelector("#searchbutton");
var mainbody = document.querySelector(".mainbody");

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '063a60c288mshc43eb80a6c69aa5p1e87ffjsn5fa0ae8c7cac',
		'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
	}
};
function outputdata(event) {
	let playerid = event.target.dataset.id;
	return playerid;
}

function returnbuttonpress() {
	location.reload();
}
searchbutton.addEventListener("click", pulldata);

function pulldata() {
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '063a60c288mshc43eb80a6c69aa5p1e87ffjsn5fa0ae8c7cac',
			'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
		}
	};
	var playersearched = playersearchedbylastname.value;

	fetch('https://api-nba-v1.p.rapidapi.com/players?search=' + playersearched, options)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			mainbody.innerHTML = "";
			if (data.response.length < 1) {
				let notext = document.createElement("p");
				notext.textContent = "Sorry the name you search does not exist or you did not search for any player"
				mainbody.appendChild(notext);
				let returnbutton = document.createElement("button");
				returnbutton.addEventListener("click", returnbuttonpress)
				returnbutton.textContent = "Press to Return";
				mainbody.appendChild(returnbutton);
				mainbody.setAttribute("style", "display:block")
				return;
			}
			let pickaplayer = document.createElement("h3");
			pickaplayer.textContent = "Pick from the Players below "
			mainbody.appendChild(pickaplayer);
			mainbody.setAttribute("style", "display:block")
			for (let i = 0; i < data.response.length; i++) {
				let chooseplayer = document.createElement("h4");
				chooseplayer.textContent = data.response[i].firstname + " " + data.response[i].lastname;
				chooseplayer.dataset.id = data.response[i].id;
				mainbody.appendChild(chooseplayer);
			}
			mainbody.addEventListener("click", function outputdata(event) {
				let playerid = event.target.dataset.id;
				if (playerid === null) {
					/* empty statement */;
				};
				if (playerid != null) {
					mainbody.innerHTML = "";
					fetch('https://api-nba-v1.p.rapidapi.com/players/statistics?id=' + playerid + '&season=2022', options)
						.then(function (response) {
							return response.json();
						})
						.then(function (data) {
							console.log(data.response);
							if (data.response.length < 1) {
								let error = document.createElement("p");
								error.textContent = "Sorry the player you selected did not play any games this season "
								mainbody.appendChild(error);
								let returnbutton = document.createElement("button");
								returnbutton.addEventListener("click", returnbuttonpress)
								returnbutton.textContent = "Press to Return";
								mainbody.appendChild(returnbutton);
							}
							let gamestats = document.createElement("p");
							gamestats.textContent = "On " + data.response[data.response.length - 1].player.firstname + " most recent game. He stats are:";
							mainbody.appendChild(gamestats);

							let assists = document.createElement("p");
							assists.textContent = "Assists:"+data.response[data.response.length - 1].assists ;
							mainbody.appendChild(assists);

							let points = document.createElement("p");
							points.textContent = "Points:"+data.response[data.response.length - 1].points ;
							mainbody.appendChild(points);

							let minsplayed = document.createElement("p");
							minsplayed.textContent = "Mins Played:"+data.response[data.response.length - 1].min ;
							mainbody.appendChild(minsplayed);

							let block = document.createElement("p");
							block.textContent = "Blocks:"+data.response[data.response.length - 1].blocks ;
							mainbody.appendChild(block);

							let rebounce = document.createElement("p");
							rebounce.textContent = "Rebounces:"+data.response[data.response.length - 1].totReb ;
							mainbody.appendChild(rebounce);

							let fieldgoal = document.createElement("p");
							fieldgoal.textContent = "Field Goal%:"+data.response[data.response.length - 1].fgp ;
							mainbody.appendChild(fieldgoal);

							let returnbutton = document.createElement("button");
							returnbutton.addEventListener("click", returnbuttonpress)
							returnbutton.textContent = "Press to Return";
							mainbody.appendChild(returnbutton);
						})
				}

			})
		})

}

