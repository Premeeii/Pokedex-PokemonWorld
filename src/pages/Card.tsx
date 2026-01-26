import { useEffect, useState } from "react";
import "./Card.css";

interface CardProps {
  id: number;
}

interface Pokemon {
  id: number;
  name: string;
  generation: {
    name: string;
  };
  sprites: {
    front_default: string;
  };
}

const Card = ({ id }: CardProps) => {
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="pokemon-grid">
      <div className="pokemon-placeholder">
        {loading || !pokemonData ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>#{pokemonData.id}</p>
            <p>Name: {pokemonData.name}</p>

            <img
              src={pokemonData.sprites.front_default}
              alt={pokemonData.name}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
