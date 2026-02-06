import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
//import Button from 'react-bootstrap/Button';

import "./Card.css";
import Bug from "../assets/Bug.png";
import Dark from "../assets/Dark.png";
import Dragon from "../assets/Dragon.png";
import Electric from "../assets/Electric.png";
import Fairy from "../assets/Fairy.png";
import Fighting from "../assets/Fighting.png";
import Fire from "../assets/Fire.png";
import Flying from "../assets/Flying.png";
import Ghost from "../assets/Ghost.png";
import Grass from "../assets/Grass.png";
import Ground from "../assets/Ground.png";
import Ice from "../assets/Ice.png";
import Normal from "../assets/Normal.png";
import Poison from "../assets/Poison.png";
import Psychic from "../assets/Psychic.png";
import Rock from "../assets/Rock.png";
import Steel from "../assets/Steel.png";
import Water from "../assets/Water.png";


//ส่งpropsไปที่ส่วนMainpage
interface CardProps {
  id: number;
  search: string;
  typeSearch: string;
}

interface Types {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface Stats {
  base_stat: string;
  stat: {
    name: string;
  };
}

interface Abilities {
  slot: number;
  ability: {
    name: string;
  };
  is_hidden: string;
}

interface Pokemon {
  id: number;
  name: string;
  generation: {
    name: string;
  };
  stats: Stats[];
  sprites: {
    front_default: string;
  };
  types: Types[];
  abilities: Abilities[];
  height: string;
  weight: string;
}

const typeIcon: Record<string, string> = {
  //กำหนดtypeว่าkeyเป็นstring valueก็เป็นstring(ดึงจากimportมีpathมา)
  bug: Bug,
  dark: Dark,
  dragon: Dragon,
  electric: Electric,
  fairy: Fairy,
  fighting: Fighting,
  fire: Fire,
  flying: Flying,
  ghost: Ghost,
  grass: Grass,
  ground: Ground,
  ice: Ice,
  normal: Normal,
  poison: Poison,
  psychic: Psychic,
  rock: Rock,
  steel: Steel,
  water: Water,
};

const typeBgMap: Record<string, string> = {
  grass: "bg-grass",
  fire: "bg-fire",
  water: "bg-water",
  electric: "bg-electric",
  poison: "bg-poison",
  bug: "bg-bug",
  normal: "bg-normal",
  psychic: "bg-psychic",
  rock: "bg-rock",
  ground: "bg-ground",
  ice: "bg-ice",
  ghost: "bg-ghost",
  dragon: "bg-dragon",
  steel: "bg-steel",
  fairy: "bg-fairy",
  dark: "bg-dark2",
  flying: "bg-flying",
  fighting: "bg-fighting",
};

const Card = ({ id, search, typeSearch }: CardProps) => {
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const showModal = () => setShow(!show);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();

        console.log("Pokemon data:", data);
        setPokemonData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getPokemon();
  }, [id]);

  if (loading || !pokemonData) {
    //ถ้าโหลดข้อมูลยังไม่เสร็จจะขึ้นLoadingกับยังดึงข้อมูลไม่เสร็จ
    return <div className="pokemon-placeholder">Loading...</div>;
  }

  //เครื่อง.?เอาไว้ใช้เช็คค่าว่ามีมั้ย เอาไว้กันerrorในกรณีที่ไม่มีค่า
  const primaryType = pokemonData.types?.[0]?.type?.name ?? "default";
  const bgType = typeBgMap[primaryType];


  //รับค่าsearch มาจากMainpageแล้วมาค้นหา
  if (
    search &&
    !pokemonData.name.toLowerCase().includes(search.toLowerCase()) //searchชื่อให้ตรงกับชื่อpokemon
  ) {
    return null;
  }

  if (
    typeSearch === "All" ||
    pokemonData.types.some((t) => t.type.name === typeSearch.toLowerCase()) //แสดงทั้งหมดกับเลือกpokemonที่มีtypeตรงกับที่search someไว้ใช้ว่ามี1ในtypeตรงมั้ย
  )
    return (
      <div className={`pokemon-placeholder ${bgType}`} onClick={showModal}>
        <p>#{pokemonData.id}</p>
        <p>{pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1)}</p>
        <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
         
         {/* ใช้slotเป็นkey จะได้เช็คtypeง่ายๆ เพราะในjsonมีslotแค่1และ2เท่านั้น*/}
        <div className="type-icon">
          {pokemonData.types.map((t) => (
            <img
              key={t.slot}
              src={typeIcon[t.type.name]}
              alt="type pokemon"
            ></img>
          ))}
        </div>

        <Modal
          size="lg"
          fullscreen="sm-down"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          className={`pokemon-modal ${bgType}`}
        >
          <Modal.Header closeButton>
            <Modal.Title className="modal-title-center">
              {pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1)}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <img
              src={pokemonData.sprites.front_default}
              alt={pokemonData.name}
            />
   
            <div className="line"></div>

            <div className="modal-detail-body">

              <div className="left-side">   
                <div className="pokemon-details">
                  <p>Ability: </p>
                  <p>
                    {pokemonData.abilities
                      .map((a) => a.ability.name)
                      .join(", ")}
                  </p>
                </div>

                <div className="pokemon-details">
                  <p>Height:</p>
                  <p>{pokemonData.height}</p>
                </div>

                <div className="pokemon-details">
                  <p>Weight:</p>
                  <p>{pokemonData.weight}</p>
                </div>
              </div>

              <div className="right-side">
                <p>Base Stats</p>
                {pokemonData.stats.map((s) => (
                  <p key={s.stat.name}>
                    {s.stat.name}: {s.base_stat}
                  </p>
                ))}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
};

export default Card;
