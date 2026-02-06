import pokedex from "../assets/pokedex.png";
import "./Header.css";

const Header = () => {
  return (
    <div className="logo">
      <img
        src={pokedex}
        className="title-img"
        alt="Pokedex"
        onClick={() => window.location.reload()}
      ></img>
    </div>
  );
};

export default Header;
