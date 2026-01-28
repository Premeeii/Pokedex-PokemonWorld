import "./Search.css"

interface SearchProps {
  search: string
  setSearch: (value: string) => void
}

const Search = ({search, setSearch}: SearchProps) => {
  return (
    <input
      type="text"
      placeholder="Search Pokémon"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="search"
    />
  );
};

export default Search;
