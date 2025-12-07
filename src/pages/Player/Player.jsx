import React ,{useEffect,useState}from 'react'
import './Player.css'
import { useParams ,useNavigate} from 'react-router-dom'
import back_arrow from '../../assets/back_arrow_icon.png'

const Player = () => {
  const {id}=useParams();
  const navigate=useNavigate();

  const [apidata,setapidata]=useState({

    name:"",
    key:"",
    published_at:"",
    type:""
  })
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMmRiZWFiNWViOTZmMTA2NmI2NDI1ZTEzNDE2M2I0OCIsIm5iZiI6MTc2NTAyMzAzNi40MjQsInN1YiI6IjY5MzQxZDNjYmYyOTNjZWZjNDQ4ZTdhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eGU6SJzaitS_vqPciqWYN10-HZMunJifPdmpbgCJotk'
  }
};
useEffect(()=>{
fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setapidata(res.results[0]))
  .catch(err => console.error(err));

},[id])

  return (
    <div className='player'>
      <img src={back_arrow} alt=""  onClick={()=>navigate(-2)}/>
      <iframe   width="90%" height="90%" src={`https://www.youtube.com/embed/${apidata.key}`} title='trailer' allowFullScreen> </iframe>
      <div className="player-info">
        <p>{apidata.published_at}</p>
        <p>{apidata.name}</p>
        <p>{apidata.type}</p>
      </div>
    </div>
  )
}

export default Player
