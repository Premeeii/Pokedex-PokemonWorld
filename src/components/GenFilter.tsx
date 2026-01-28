import "./GenFilter.css";

interface GenFilterProps {
  genSearch: number;
  setGenSearch: (value: number) => void;
}

const GenFilter = ({ genSearch, setGenSearch }: GenFilterProps) => {
  return (
    <div>
      <select
        className="dropdown"
        value={genSearch}
        onChange={(e) => setGenSearch(Number(e.target.value))}
      >
        <option value={0}>All</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
      </select>
    </div>
  );
};

export default GenFilter;
