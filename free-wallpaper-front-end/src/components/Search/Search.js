import { useNavigate } from "react-router-dom"
import "./Search.scss"
import { useState } from "react";

const Search = () => {

    const naviage = useNavigate();
    const [searchValue, setSearchValue] = useState("");


    const handleSeachOnEnter = (key) => {
        if (key === "Enter") {
            naviage(`search/${searchValue}`)
        }
    }

    return (
        <div className="search">
            <input onKeyDown={(event) => handleSeachOnEnter(event.key)} onChange={(event) => setSearchValue(event.target.value)} value={searchValue} className="search-input col-10" type="text" placeholder='Seach ...' />
            <i onClick={() => naviage(`search/${searchValue}`)} className="search-icon fa-solid fa-magnifying-glass"></i>
        </div>
    )
}

export default Search