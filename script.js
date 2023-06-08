

var input = document.getElementById('url');

document.getElementById("twitchPlace").onclick = () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {


    
    chrome.scripting.insertCSS({
      target: {tabId: tabs[0].id},
      files: ["injectStyleTwitch.css"],
    });

    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: placeOnTwitch,
      args: [input.value]
    });

    
  });
}

document.getElementById("youtubePlace").onclick = () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {

     

    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: placeOnYoutube,
      args: [input.value]
    });

    
    chrome.scripting.insertCSS({
      target: {tabId: tabs[0].id},
      files: ["injectStyleYoutube.css"],
    });

  });
}

document.getElementById("ssportPlace").onclick = () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {

     

    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: placeOnSsport,
      args: [input.value]
    });
      
    chrome.scripting.insertCSS({
      target: {tabId: tabs[0].id},
      files: ["injectSSportPlus.css"],
    });
    chrome.scripting.insertCSS({
      target: {tabId: tabs[0].id},
      files: ["injectSSportPlus-withChat.css"],
    });
  });
}

document.getElementById("primeVideoPlace").onclick = () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {

     

    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: placeOnPrimeVideo,
      args: [input.value]
    });
      
    chrome.scripting.insertCSS({
      target: {tabId: tabs[0].id},
      files: ["injectPrimeVideo.css"],
    });
  });
}
function placeOnPrimeVideo(url){
  
  let paramString = url.split('?')[1];
  let queryString = new URLSearchParams(paramString);
  var videoId;
  for (let pair of queryString.entries()) {
     console.log("Key is: " + pair[0]);
     console.log("Value is: " + pair[1]);

     videoId = pair[1]
  }

  console.log(videoId)
  var div = document.createElement("div");
  div.id = "2liveDiv"
  div.style.width = "35%"
  div.style.height = "100vh"
  div.innerHTML = '<iframe id="youtube-iframe" width="100%" height="100% " src="https://www.youtube.com/embed/' + videoId +'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  
  document.querySelector("#mainViewContainer > div.mfTnxL > span:nth-child(2)").insertBefore(div, document.querySelector("#playerContainer").nextSibling)
  var liveChat = document.createElement("div");
  
  liveChat.style.width= "100%"
  liveChat.style.height= "60vh"

  liveChat.innerHTML = '<iframe id="liveChat" width="100%" height="60vh" src="https://www.youtube.com/live_chat?v=' + videoId + '&embed_domain=www.primevideo.com&dark_theme=1" frameborder="0"></iframe>'

  div.appendChild(liveChat);

}

function placeOnTwitch(url){
  
    let paramString = url.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    var videoId;
    for (let pair of queryString.entries()) {
       console.log("Key is: " + pair[0]);
       console.log("Value is: " + pair[1]);

       videoId = pair[1]
    }

    console.log(videoId)

    document.querySelector('[data-target="persistent-player-content"]').innerHTML = '<iframe id="youtube-iframe" width="100%" height="100% " src="https://www.youtube.com/embed/' + videoId +'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    
}

function placeOnYoutube(url){
  
  let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    var videoId1;
    for (let pair of queryString.entries()) {
       console.log("1 Key is: " + pair[0]);
       console.log("1 Value is: " + pair[1]);

       videoId1 = pair[1]
    }

    let paramString2 = url.split('?')[1];
    let queryString2 = new URLSearchParams(paramString2);
    var videoId2;
    for (let pair2 of queryString2.entries()) {
       console.log("2 Key is: " + pair2[0]);
       console.log("2 Value is: " + pair2[1]);

       videoId2 = pair2[1]
    }

    /* 1 */
    var sidebar = document.getElementById("secondary");
    
    var streamChat = document.createElement('div')
    sidebar.insertBefore(streamChat, sidebar.childNodes[0]);
    streamChat.innerHTML = '<iframe id="liveChat" width="100%" src="https://www.youtube.com/live_chat?v=' + videoId1 + '" frameborder="0"></iframe>'
    
    document.querySelector('#chat').remove()

    
    var streamerLiveFrame = document.createElement('div');
    streamerLiveFrame.innerHTML = '<iframe id="youtube-iframe" width="100%" height="'+document.querySelector("#ytd-player").offsetHeight*0.4+'" src="https://www.youtube.com/embed/' + videoId1 +'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    sidebar.insertBefore(streamerLiveFrame, sidebar.childNodes[0]);

    /* 2 */
    var liveStream = document.querySelector("#ytd-player");
    liveStream.innerHTML = '<iframe id="liveStreamToWatch" width="100%" height="100%" src="https://www.youtube.com/embed/' + videoId2 +'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    
    
    document.querySelector('.style-scope.ytd-player').remove();

    document.querySelector("#ytd-player").appendChild(liveStream)

}

function placeOnSsport(url){
  let paramString = url.split('?')[1];
  let queryString = new URLSearchParams(paramString);
  var videoId;
  for (let pair of queryString.entries()) {
     console.log("Key is: " + pair[0]);
     console.log("Value is: " + pair[1]);

     videoId = pair[1]
  }

  var div = document.createElement("div");
  div.style.width = "40vw"
  div.style.height= "100vh"
  div.id = 'streamDiv'
  div.innerHTML = '<iframe id="youtubeStream" width="100%" height="40vh" src="https://www.youtube.com/embed/' + videoId +'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  
  var liveChat = document.createElement("div");
  
  liveChat.style.width= "100%"
  liveChat.style.height= "60vh"

  liveChat.innerHTML = '<iframe id="liveChat" width="100%" src="https://www.youtube.com/live_chat?v=' + videoId + '&embed_domain=app.ssportplus.com&dark_theme=1" frameborder="0"></iframe>'

  div.appendChild(liveChat);

  document.getElementById('saranApp').appendChild(div)
}


