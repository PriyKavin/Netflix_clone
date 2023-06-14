import { useEffect, useState } from "react";
import { fetchData } from "./api/api";
import  YouTube  from "react-youtube";
import movieTrailer from "movie-trailer" 

const List = ({ title, param }) => {
  const [list, setList] = useState([]);
  const [trailerurl, setTrailerurl]=useState("")
const handleClick=(movie)=> {
  if(trailerurl) {
    setTrailerurl("");
  }else {
    movieTrailer(movie || "")
    .then((url)=> {
      const urlParams=new URLSearchParams(new URL(url).search);
      setTrailerurl(urlParams.get("v"));
    })
    .catch((error)=>console.log(error));
  }
}
const opts= {
  height: "390",
  width: "100%",
  playerVars:{
    autoplay: 1,
  },
};
  useEffect(()=>{
    fetchData(param).then( res => setList(res.data.results))
  },[]);
  console.log(list)
  return(
    <div className="list">
      <div className="row">
        <h2 className="text-white title">{ title }</h2>
        <div className="col">
          <div className="row__posters">
            {
              list.map(item => <img
                className="row__poster row__posterLarge"
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                alt={item.title}
                onClick={()=>{handleClick(item.title)}}
              />)
            }
          </div>
        </div>
      </div>
      {trailerurl && <YouTube videoId={trailerurl} opts={opts} /> }
    </div>
  )
}

export default List;