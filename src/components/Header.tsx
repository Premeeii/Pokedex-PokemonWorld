import pokedex from "../assets/pokedex.png"
import "./Header.css"

const Header=()=> {
    return(
        <div className="logo">
          <img src={pokedex} className="title-img" alt="Pokedex"></img>
        </div>
    )
}

export default Header