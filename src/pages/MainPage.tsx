import { useState } from "react";
import Card from "../components/Card";
import "./MainPage.css";
import Search from "../components/Search";
import Pokeball from "../assets/pokeball.png";
import TypeFilter from "../components/TypeFilter";
import GenFilter from "../components/GenFilter";

const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState("All");
  const [genSearch, setGenSearch] = useState<number>(0);

  const genLength: Record<number, { start: number; end: number }> = { //map generation
    0: { start: 1, end: 1025 },
    1: { start: 1, end: 151 },
    2: { start: 152, end: 251 },
    3: { start: 252, end: 386 },
    4: { start: 387, end: 493 },
    5: { start: 494, end: 649 },
    6: { start: 650, end: 721 },
    7: { start: 722, end: 809 },
    8: { start: 810, end: 905 },
    9: { start: 906, end: 1025 },
  };

  const { start, end } = genLength[genSearch];

  const pokemonIds = Array.from(
    { length: end - start + 1 }, (_, i) => start + i,
  );

  // สมมติโหลดเสร็จหลัง 1 วิ (เอาไว้ทดสอบ)
  setTimeout(() => setLoading(false), 1000);

  

  return (
    <div className="page">
      <div className="pokedex-container">
        <div className="filter-bar">
          <img
            src={Pokeball}
            className="pokeball-logo"
            alt="Pokeball Logo"
          ></img>

          {/*ส่งsearchที่ได้มาจาก components serch ไปที่component card เพื่อหาตามที่กรอก*/}
          <div className="search-wrapper">
            <Search search={search} setSearch={setSearch} />   
            
          </div>

          <div className="filter">

            <div className="filter-item">
              <label>Type:</label>
               <TypeFilter typeSearch={typeSearch} setTypeSearch={setTypeSearch} />
            </div>

            <div className="filter-item">
              <label>Generation:</label>
                <GenFilter
                  genSearch={genSearch}
                  setGenSearch={setGenSearch}
                ></GenFilter>
            </div>
    
            

          </div>
        </div>

        <div className="pokemon-grid">
          {loading
            ? pokemonIds.map((_, index) => (
                <div key={index}/>
              ))
            : pokemonIds.map((id) => (
                <Card
                  key={id}
                  id={id}
                  search={search}
                  typeSearch={typeSearch}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
