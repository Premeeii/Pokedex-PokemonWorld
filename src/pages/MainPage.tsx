import { useState } from "react"
import Card from "./Card"
import "./MainPage.css"

const MainPage = () => {
  const [loading, setLoading] = useState(true)
  const pokemonIds = Array.from({ length: 1025 }, (_, i) => i + 1)

  // สมมติโหลดเสร็จหลัง 1 วิ (เอาไว้ทดสอบ)
  setTimeout(() => setLoading(false), 1000)

  return (
    <div className="page">
      <div className="pokedex-container">
        <div className="pokemon-grid">
          {loading
            ? pokemonIds.map((_, index) => (
                <div key={index} className="pokemon-placeholder" />
              ))
            : pokemonIds.map(id => <Card key={id} id={id} />)
          }
        </div>
      </div>
    </div>
  )
}

export default MainPage

