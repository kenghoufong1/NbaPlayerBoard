var playersearchedbylastname = document.querySelector("#playersearchedid");
var searchbutton = document.querySelector("#searchbutton");
var mainbody = document.querySelector(".mainbody");
var topsearchbar = document.querySelector("#topsearchplayer");

if (localStorage.getItem("nbasavedname") != null){
	var nbasavedname = localStorage.getItem("nbasavedname");
}

topsearchbar.textContent = "Previous Search:\n"+nbasavedname;

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
	localStorage.setItem("nbasavedname", playersearched);
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
				var playername = event.target.textContent;
				if (playerid === null) {
					/* empty statement */;
				};
				if (playerid != null) {
					mainbody.innerHTML = "";
					searchWiki(playername);
					function searchWiki(s) {
						var ids = "";
						var links = [];
						var results = [];
						fetch('https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=' + "NBA" + " " + s)
							.then(response => {
								return response.json();
							})
							.then(result => {
								1
								results = result.query.search;
								for (var i = 0; i < results.length; i++) {
									if (results[i + 1] != null) {
										ids += results[i].pageid + "|";
									}
									else {
										ids += results[i].pageid;
									}
								}
							})
							.then(a => {
								fetch("https://en.wikipedia.org/w/api.php?action=query&prop=info&inprop=url&origin=*&format=json&pageids=" + ids)
									.then(idresult => {
										return idresult.json();
									})
									.then(idresult => {
										for (i in idresult.query.pages) {
											links.push(idresult.query.pages[i].fullurl);
										}
									})
									.then(g => {
										for (var i = 0; i < results.length; i++) {
											let snippetval = results[i].snippet;
											if (snippetval.includes("basketball player")) {
												let wikistats = document.createElement("p");
												wikistats.innerHTML+="<a href='"+links[i+1]+"' target='_blank'>"+results[i].title+"</a><br>"+results[i].snippet+"<br>";
												mainbody.appendChild(wikistats);

												console.log(results[i].title);
												var pageTitle = results[i].title.replaceAll(" ", "_");

											}
										}

									});
							});

					}
					function getWikiContent(requestUrl) {
						console.log("Inside getcontent")
						let res = fetch(requestUrl)
							.then(resp => resp.clone().json())
							.then(json => {
								console.log(json);
								console.log(Object.keys(json));
								console.log(json.query.pages[0].revisions[0].slots.main.content)
								return json;
							});

						return res;



					}




					fetch('https://api-nba-v1.p.rapidapi.com/players/statistics?id=' + playerid + '&season=2022', options)
						.then(function (response) {
							return response.json();
						})
						.then(function (data) {
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
							gamestats.textContent = "On " + data.response[data.response.length - 1].player.firstname + " most recent game. His stats are:";
							mainbody.appendChild(gamestats);

							let assists = document.createElement("p");
							assists.textContent = "Assists:" + data.response[data.response.length - 1].assists;
							mainbody.appendChild(assists);

							let points = document.createElement("p");
							points.textContent = "Points:" + data.response[data.response.length - 1].points;
							mainbody.appendChild(points);

							let minsplayed = document.createElement("p");
							minsplayed.textContent = "Mins Played:" + data.response[data.response.length - 1].min;
							mainbody.appendChild(minsplayed);

							let block = document.createElement("p");
							block.textContent = "Blocks:" + data.response[data.response.length - 1].blocks;
							mainbody.appendChild(block);

							let rebounce = document.createElement("p");
							rebounce.textContent = "Rebounces:" + data.response[data.response.length - 1].totReb;
							mainbody.appendChild(rebounce);

							let fieldgoal = document.createElement("p");
							fieldgoal.textContent = "Field Goal%:" + data.response[data.response.length - 1].fgp;
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

