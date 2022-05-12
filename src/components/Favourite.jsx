import React,{useEffect,useState} from 'react'
import musicDetails from './musicDatabase';
import Player from './Player';

function Favourite() {
  // const [currSong,setCurrSong] = useState({songName:"Please Select the song"});
  const [hover, setHover] = useState("");
  const [fav,setFav] = useState([]);
  const [currSong,setCurrSong] = useState({songName:"Please Select Song"});
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('songs')) || [];
    setFav(data);
    
  }, [fav]);

  const delFav = (songs)=>{
    let newArray = fav.filter(f=>f.songName!=songs.songName);
    setFav(newArray);
    
    localStorage.setItem("songs",JSON.stringify(newArray));
}
  return (
    <>
    <div className='p-2 h-[57vh] flex flex-wrap overflow-auto justify-center'>
    {fav.length==0 && <h1 className='text-4xl text-red-900 mt-44'>No Favourites</h1>}
    {fav.map(m=>m.songName?<div className={`hover:scale-110 ease-in-out duration-200 bg-[url(${m.coverPath})] bg-cover h-[200px] w-[170px] md:h-[250px] md:w-[200px] m-2 md:my-6 md:mx-4 md:mt-14 rounded flex items-end justify-center rounded-xl relative`} onMouseEnter={()=>setHover(m.songName)} onMouseLeave={()=>setHover("")}>
        
          
                {hover == m.songName && !fav.find(f=>f.songName==m.songName) && <div className='text-2xl absolute top-1 right-1 cursor-pointer'>🤍</div>}

                {hover == m.songName && fav.find(f=>f.songName==m.songName) && <div className='text-2xl absolute top-1 right-1 cursor-pointer' onClick={()=>delFav(m)}>❤</div>}

                {hover == m.songName && <button className='material-icons playBtn text-2xl md:text-5xl  mx-4 my-[50%] md:my-[42%] rounded-3xl bg-black text-white  hover:bg-green-500 hover:text-black hover:scale-110  ease-in-out duration-300 h-[40px] md:h-[50px] w-[40px] md:w-[50px] absolute' onClick={()=>setCurrSong(m)} >play_arrow</button>}

                <div className='text-center text-xs md:text-base bg-black bg-cover w-full  rounded-xl text-white'>{m.songName.slice(0,15)}</div>
            </div> :<></>)}
            
</div>
<Player currSong={currSong}/>
</>
  )
}

export default Favourite