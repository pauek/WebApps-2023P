import { useEffect, useState, useRef } from "react";

import "./BeerSearch.css";

const Beer = ({ beer }) => (
  <div className="beer">
    <img src={beer.image_url} />
    <div className="text">
      <div className="title">{beer.name}</div>
      <div className="tagline">{beer.tagline}</div>
    </div>
  </div>
);

const BeerList = ({ beers }) => {
  if (beers === null) {
    return <div className="beer-list">Loading...</div>;
  }
  if (Array.isArray(beers) && beers.length === 0) {
    return <div className="beer-list">No results</div>;
  }
  return (
    <div className="beer-list">
      {beers.map((beer) => (
        <Beer key={beer.id} beer={beer} />
      ))}
    </div>
  );
};

export default function BeerSearch() {
  const ref = useRef();
  const [search, setSearch] = useState("");
  const [beers, setBeers] = useState([]);

  const loadBeers = async (search) => {
    const query = search ? `?beer_name=${search}` : "";
    console.log(query);
    const response = await fetch(`https://api.punkapi.com/v2/beers${query}`);
    return await response.json();
  };

  useEffect(() => {
    setBeers(null);
    loadBeers(search).then(setBeers);
  }, [search]);

  const doSearch = (e) => {
    e.preventDefault();
    setSearch(ref.current.value);
  };

  return (
    <div className="beer-search">
      <form onSubmit={doSearch}>
        <input type="text" ref={ref} />
        <button>Submit</button>
      </form>
      <BeerList beers={beers} />
    </div>
  );
}
