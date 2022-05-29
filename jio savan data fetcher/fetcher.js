let search = document.querySelector(".search");
let dataText = document.querySelector(".dataText");
let searchVal = ""

let songsArr = [];
let extractedData = "";
let idArr = [];
async function fetchLinks() {
    let response = await fetch(`https://jiosaavn-api-v3.vercel.app/search?query=${searchVal}`);
    let data = await response.json();
    let resultArr = data.results;
    resultArr.map(m=>idArr.push(m.id));
    console.log("fetching Links.....");
    console.log(idArr);

    for(let i=0;i<idArr.length;i++){
        fetchSongs(`https://jiosaavn-api-v3.vercel.app/song?id=${idArr[i]}`);
    }
    
}

    async function fetchSongs(url) {
        let response = await fetch(url);
        let data = await response.json();
        let songLink = data.media_urls["320_KBPS"];
        let songName = data.song;
        let songImage = data.image; 
        let songLanguage = data.language;  
        songsArr.push({
    filePath:songLink,
    songName:songName,
    coverPath:songImage,
    language:songLanguage,
        })  
            
        }
    



function inputChange(){
    searchVal = search.value;
fetchLinks();
}

function fetchData() {
    dataText.value = "";
    for(let i=0;i<songsArr.length;i++){
        extractedData += `{filePath:'${songsArr[i].filePath}',
            songName:'${songsArr[i].songName}',
            coverPath:'${songsArr[i].coverPath}',
            language:'${songsArr[i].language}',},`;
    }
    console.log(extractedData);
    dataText.value = extractedData;
}

function clearData() {
        dataText.value = "";
        songsArr = [];
         extractedData = "";
         idArr = [];
    
}
