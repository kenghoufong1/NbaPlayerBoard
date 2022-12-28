// Adding code for search Wiki
function searchWiki(s){
var ids = "";
var links = [];
var results = [];
fetch('https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch='+s)
.then(response => {
return response.json();
})
.then(result => {
results = result.query.search;
for(var i=0; i<results.length; i++){
if(results[i+1] != null){
ids += results[i].pageid+"|";
}
else{
ids+=results[i].pageid;
}
}
})
.then(a => {
fetch("https://en.wikipedia.org/w/api.php?action=query&prop=info&inprop=url&origin=*&format=json&pageids="+ids)
.then(idresult => {
return idresult.json();
})
.then(idresult =>{
for(i in idresult.query.pages){
links.push(idresult.query.pages[i].fullurl);
}
})
.then(g =>{
document.getElementById("output").innerHTML="";
for(var i=0; i<results.length; i++){
let snippetval = results[i].snippet;
if(snippetval.includes("basketball player")){
    document.getElementById("output").innerHTML+="<a href='"+links[i]+"' target='_blank'>"+results[i].title+"</a><br>"+results[i].snippet+"<br>";
    console.log(links[i]);
getWikiContent("https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvslots=*&rvprop=content&formatversion=2&format=json&origin=*")
  

}
}
});
});

}

function getWikiContent(requestUrl) {
    console.log("Inside getcontent")
    fetch(requestUrl)
    .then(resp => resp.clone().json())
    .then(json => console.log(json));
    
  }
  