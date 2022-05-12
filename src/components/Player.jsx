import React,{useState,useEffect,useRef} from 'react'
import musicDetails from './musicDatabase';

function Player({currSong}) {
  const [song,setSong] = useState(currSong);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songDur,setSongDur ] = useState("00");
  const [currentDur,setCurrentDur ] = useState("00");
  const [seekVal,setSeekVal] = useState(0);
  const [fav,setFav] = useState([]);
  const [vol,setVol] = useState(10);
  const [prevVol,setPrevVol] = useState(1);
  const [loop,setLoop] = useState(false);
  const [isFinished,setIsFinished] = useState(false);
  const myRef = useRef();
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('songs')) || [];
    setFav(data);
  }, [fav]);

  useEffect(() => {
    if( myRef.current.currentTime == myRef.current.duration){
      if(loop){
        handlePlay();
      }else{
        handleNext();
      }
    } 
  }, [seekVal]);
  
  useEffect(() => {
    setSong(currSong);
  }, [currSong]);


  useEffect(() => {
    handlePlay(loop)
    console.log(song.songName);
  }, [song]);
  
  useEffect(() => {
    myRef.current.volume = vol/10;
    if(vol!=0) setPrevVol(vol);
  }, [vol]);

  useEffect(()=>{
    if(loop){
      setSong(song);
      handlePlay();
    }
  },[isFinished])

  function handlePlay(){
    if(song.filePath != null){
      myRef.current.play();
      setIsPlaying(true);
      setTimeout(() => {

        let totalDur = myRef.current.duration;
        let min = Math.floor(totalDur/60);
        let sec = Math.floor(totalDur%60);
        let totalLen = min+":"+sec
        setSongDur(totalLen);
        setInterval(() => {
        let currDur = myRef.current.currentTime;
        setCurrentDur(Math.floor(currDur/60)+":"+Math.floor(currDur%60))
        let seekValue = (myRef.current.currentTime/myRef.current.duration)*100;
        setSeekVal(seekValue);
        if(myRef.current.currentTime == myRef.current.duration) setIsFinished(true);
        }, 1000);
      }, 2000);
    }
   
  }
  function handlePause(){
    console.log("pause");
    setIsPlaying(false);
    myRef.current.pause();
  }
  const handleNext = ()=>{
    if(song.filePath==null) return;
   
    let location = window.location.href;
    let inFav = location.includes("favourite");
    if(inFav){
     

      let cIdx = fav.findIndex(f=>f.songName==song.songName);
      if(cIdx==-1) return;
      cIdx==fav.length-1?setSong(fav[0]):setSong(fav[cIdx+1]);
    }else{
      let cIdx = musicDetails.findIndex(f=>f.songName==song.songName);
      cIdx==musicDetails.length-1?setSong(musicDetails[0]):setSong(musicDetails[cIdx+1]);
    }
  }

  const handlePrev = ()=>{
    if(song.filePath==null) return;

    let location = window.location.href;
    let inFav = location.includes("favourite");
    if(inFav){
      if(fav.length==0) return;
      let cIdx = fav.findIndex(f=>f.songName==song.songName);
      if(cIdx==-1) return;
      cIdx==0?setSong(fav[fav.length-1]):setSong(fav[cIdx-1]);
    }else{
      let cIdx = musicDetails.findIndex(f=>f.songName==song.songName);
      cIdx==0?setSong(musicDetails[musicDetails.length-1]):setSong(musicDetails[cIdx-1]);
    }
    
  }

  return (
    <>
    <div className="flex  justify-center p-1 rounded-2xl">
            <span>{currentDur}</span>
            <input className="progress w-[90%] mt-2 mx-2 appearance-none w-full h-2  accent-green-500 bg-gray-800 rounded-2xl outline-none slider-thumb" type="range" min="0"  max="100" value={seekVal} onChange={(e)=>{
                myRef.current.currentTime = (e.target.value * myRef.current.duration)/100;
                setSeekVal(e.target.value)              
            }} />
            <span>{songDur}</span>
        </div>

    <div className=' h-[25vh] w-full  flex text-center '>
        <div className='md:flex w-[30%]  md:pl-2'>
        <div className={`bg-[url(${song.coverPath})] m-1 h-[60%] w-[95%] md:h-[80%] md:w-[50%] bg-cover`}></div>
        <div className=' md:mt-12 text-red-900 font-bold text-base w-[100%] md:w-[70%] md:text-xl'>{song.songName}</div>
        </div>
      
     
        <div className=' w-[50%] h-[105px] sticky justify-center mt-10 md:mt-0'>
          
            <button className='material-icons playBtn text-3xl md:text-5xl  mx-1 my-4 rounded-3xl bg-black text-white  hover:bg-green-500 hover:text-black hover:scale-110  ease-in-out duration-300 md:h-[50px] md:w-[50px] h-[35px] w-[35px]' onClick={handlePrev}>skip_previous</button>
            {isPlaying ? <button className='material-icons playBtn text-3xl md:text-5xl  md:mx-8 mx-6 my-4 rounded-3xl bg-black text-white  hover:bg-green-500 hover:text-black hover:scale-110  ease-in-out duration-300 md:h-[50px] md:w-[50px] h-[35px] w-[35px]' onClick={handlePause}>pause</button>:<button className='material-icons playBtn text-3xl md:text-5xl  md:mx-4 mx-2 my-4 rounded-3xl bg-black text-white  hover:bg-green-500 hover:text-black hover:scale-110  ease-in-out duration-300 md:h-[50px] md:w-[50px] h-[35px] w-[35px]' onClick={handlePlay}>play_arrow</button>}
            <button className='material-icons playBtn text-3xl md:text-5xl  mx-1 my-4 rounded-3xl bg-black text-white  hover:bg-green-500 hover:text-black hover:scale-110  ease-in-out duration-300 md:h-[50px] md:w-[50px] h-[35px] w-[35px]' onClick={handleNext}>skip_next</button>
            <div>
          <button className={`material-icons playBtn text-3xl md:text-5xl  mx-1 my-4 rounded-3xl bg-black text-white ${loop==true?'bg-green-500 text-black':'bg-black'} hover:bg-green-500 hover:text-black hover:scale-110  ease-in-out duration-300 md:h-[50px] md:w-[50px] h-[35px] w-[35px]`} onClick={()=>{setLoop(!loop)}}>replay</button>

          </div>
        </div>
        
        <div className=' md:flex  w-[30%] justify-center h-[40px]' >
            <input type="range" className='w-[100px] md:w-[120px] mr-2' value={vol} min="0" max="10" onChange={(e)=>{
              setVol(e.target.value);
              
            }} />
            <div className='material-icons justify-self-center text-4xl  md:mt-[] mx-4' onClick={()=>{
              vol==0?setVol(prevVol):setVol(0);
            }}>{vol>8 && "volume_up" || vol>0 && "volume_down" || vol==0 && "volume_off"}</div>
        </div>
    </div>

    <audio
        ref={myRef}
        src={song.filePath}  />
    </>
  )
}

export default Player