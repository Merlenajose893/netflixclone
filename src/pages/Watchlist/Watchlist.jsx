import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./Watchlist.css";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const watchlistRef = collection(db, "user", user.uid, "watchlist");
        const snapshot = await getDocs(watchlistRef);
        const movies = snapshot.docs.map((doc) => doc.data());
        setWatchlist(movies);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    };

    fetchWatchlist();
  }, []);

  if (!auth.currentUser) {
    return <p>Please log in to see your watchlist.</p>;
  }

  return (
    <div className="watchlist-container">
      <h2 className="watchlist-title">My List</h2>
      <div className="watchlist-slider">
        {watchlist.length > 0 ? (
          watchlist.map((movie) => (
            <Link
              to={`/player/${movie.id}`}
              key={movie.id}
              className="watchlist-card"
            >
              <img src={movie.image} alt={movie.title} />
              <div className="card-overlay">
                <p>{movie.title}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="empty-text">Your watchlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
