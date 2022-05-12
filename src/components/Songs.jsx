import React,{useState,useEffect} from 'react'
import musicDetails from './musicDatabase';
import Player from "./Player"

function Songs() {
    const [currSong,setCurrSong] = useState({songName:"Please Select the song"});
    // const [currSong,setCurrSong] = useState(musicDetails[0]);
    const [searchVal,setSearchVal] = useState("");
    const [hover, setHover] = useState("");
    const [fav, setFav] = useState([]);
    useEffect(() => {
    let data = JSON.parse(localStorage.getItem('songs')) || [];
    setFav(data);    
    }, []);

    const addFav = (songs)=>{
        let newArray = [...fav,songs];
        setFav(newArray);
        console.log(newArray);
        console.log(searchVal);
        localStorage.setItem("songs",JSON.stringify(newArray));
    }
    const delFav = (songs)=>{
        let newArray = fav.filter(f=>f.songName!=songs.songName);
        setFav(newArray);
        console.log(newArray);
        localStorage.setItem("songs",JSON.stringify(newArray));
    }

    let filteredArr = musicDetails.filter(f=>f.songName.toLowerCase().includes(searchVal.toLowerCase()));
  return (
      <>
    <input className='m-2 border-2 rounded-3xl mx-[25%] w-[50%] text-center outline-none 
    hover:w-[80%]  hover:mx-[10%] hover:ease-out duration-300
    ' type="text" placeholder='Search' onChange={(e)=>setSearchVal(e.target.value)}/>
    <div className='p-2 h-[50vh] flex flex-wrap overflow-auto justify-center '>

        {filteredArr.map(m=>m.songName?<div className={`hover:scale-110 ease-in-out duration-200 bg-[url(${m.coverPath})] bg-cover h-[130px] w-[100px] md:h-[140px] md:w-[140px] m-2 md:my-3 md:mx-6 rounded flex items-end justify-center rounded-xl relative`} onMouseEnter={()=>setHover(m.songName)} onMouseLeave={()=>setHover("")} >
            
              
                    {hover == m.songName && !fav.find(f=>f.songName==m.songName) && <div className='text-2xl absolute top-1 right-1 cursor-pointer' onClick={()=>addFav(m)}>🤍</div>}

                    {hover == m.songName && fav.find(f=>f.songName==m.songName) && <div className='text-2xl absolute top-1 right-1 cursor-pointer' onClick={()=>delFav(m)}>❤</div>}

                    {hover == m.songName && <button className='material-icons playBtn text-2xl md:text-5xl  mx-4 my-[50%] md:my-[42%] rounded-3xl bg-black text-white  hover:bg-green-500 hover:text-black hover:scale-110  ease-in-out duration-300 h-[40px] md:h-[50px] w-[40px] md:w-[50px] absolute' onClick={()=>setCurrSong(m)} >play_arrow</button>}
                    

                   
                    <div className='text-center text-xs md:text-base bg-black bg-cover w-full  rounded-xl text-white'>{m.songName.slice(0,15)}</div>
                </div> :<></>)}
                
    </div>
    <Player currSong={currSong}/>
    </>
  )
}

export default Songs