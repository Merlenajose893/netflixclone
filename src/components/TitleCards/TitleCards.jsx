import React, { useRef, useEffect, useState } from "react";
import "./TitleCards.css";
import card_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

// Firebase imports
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase"; // your firebase.js file where you export db
import { toast } from "react-toastify";
import { setDoc,doc } from "firebase/firestore";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardRef = useRef();
  

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMmRiZWFiNWViOTZmMTA2NmI2NDI1ZTEzNDE2M2I0OCIsIm5iZiI6MTc2NTAyMzAzNi40MjQsInN1YiI6IjY5MzQxZDNjYmYyOTNjZWZjNDQ4ZTdhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eGU6SJzaitS_vqPciqWYN10-HZMunJifPdmpbgCJotk'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category || "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results || []))
      .catch(err => console.error(err));

    const slider = cardRef.current;
    const handleScroll = (e) => {
      e.preventDefault();
      slider.scrollLeft += e.deltaY;
    };

    slider.addEventListener("wheel", handleScroll);
    return () => slider.removeEventListener("wheel", handleScroll);
  }, [category]);

  const addToList = async (movie) => {
  const user=auth.currentUser;
  console.log("User",user);
  
  if(!user)
  {
    toast.error("Please log in to add movies to your watchlist")
    return
  }

  try {
    await setDoc(
      doc(db, "user", user.uid, "watchlist", movie.id.toString()), // ✅ correct path
      {
        id: movie.id,
        title: movie.original_title || movie.name,
        image: movie.backdrop_path
          ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
          : movie.image
      }
    );
    toast.success("Added to your watchlist!");
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    toast.error("Failed to add movie.");
  }
};

  return (
    <div className="titleCards">
      <h2>{title || "Popular on Netflix"}</h2>

      <div className="card-list" ref={cardRef}>
        {(apiData.length > 0 ? apiData : card_data).map((c, index) => (
          <div className="card" key={index}>
            <Link to={`/player/${c.id}`}>
              <img
                src={
                  c.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500${c.backdrop_path}`
                    : c.image
                }
                alt={c.original_title || c.name}
              />
            </Link>
            <div className="card-info">
                <p>{c.original_title || c.name}</p>
            <button className="add-to-list-btn" onClick={() => addToList(c)}>Add to List</button>
            </div>
              
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
