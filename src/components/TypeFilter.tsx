import "./TypeFilter.css";

//pass propsไปที่ส่วนMainpage
interface TypeProps {
  typeSearch: string;
  setTypeSearch: (value: string) => void;
}

const TypeFilter = ({ typeSearch, setTypeSearch }: TypeProps) => {
  return (
    <select
      className="dropdown"
      value={typeSearch}
      onChange={(e) => setTypeSearch(e.target.value)}
    >
      <option>All</option>
      <option>Grass</option>
      <option>Fire</option>
      <option>Water</option>
      <option>Electric</option>
      <option>Flying</option>
      <option>Normal</option>
      <option>Ground</option>
      <option>Rock</option>
      <option>Psychic</option>
      <option>Bug</option>
      <option>Poison</option>
      <option>Fighting</option>
      <option>Ice</option>
      <option>Ghost</option>
      <option>Dark</option>
      <option>Steel</option>
      <option>Dragon</option>
      <option>Fairy</option>
    </select>
  );
};

export default TypeFilter;
