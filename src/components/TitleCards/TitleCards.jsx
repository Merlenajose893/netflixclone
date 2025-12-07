
import React, { useRef, useEffect, useState } from "react";
import "./TitleCards.css";
import card_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjVhMTc1NzFmZTgzYTM2ZjQ3ZDc5MWNkMTgwMjY5YiIsIm5iZiI6MTczMTkxNDYyMC4yNDUyMTA0LCJzdWIiOiI2NzNhZWE0ZWJiYjQ5ZjA2YTAwZGJjYzEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.raIe95mEHTLv3U4_QaRGSIA19NR4zILc0TA-NkAwE6Q'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category || "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => {
        console.log("Fetched data:", res);
        setApiData(res.results || []);
      })
      .catch(err => console.error("Fetch error:", err));

    const slider = cardRef.current;
    const handleScroll = (e) => {
      e.preventDefault();
      slider.scrollLeft += e.deltaY;
    };

    slider.addEventListener("wheel", handleScroll);
    return () => slider.removeEventListener("wheel", handleScroll);
  }, [category]);

  return (
    <div className="titleCards">
      <h2>{title || "Popular on Netflix"}</h2>

      <div className="card-list" ref={cardRef}>
        {(apiData.length > 0 ? apiData : card_data).map((c, index) => (
          <Link to={`/player/${c.id}`} className="card" key={index}>
            <img
              src={
                c.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${c.backdrop_path}`
                  : c.image
              }
              alt={c.original_title || c.name}
            />
            <p>{c.original_title || c.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
