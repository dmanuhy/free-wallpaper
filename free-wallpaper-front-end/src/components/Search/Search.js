import "./Search.scss"

const Search = () => {
    return (
        <div className="search">
            <input className="search-input col-10" type="text" placeholder='Seach for free Wallpaper ...' />
            <i className="search-icon fa-solid fa-magnifying-glass"></i>
        </div>
    )
}

export default Search