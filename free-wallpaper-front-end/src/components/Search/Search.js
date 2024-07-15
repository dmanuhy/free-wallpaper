import { useNavigate } from "react-router-dom"
import "./Search.scss"
import { useEffect, useState } from "react";
import { TagService } from "../../services/TagService";
const Search = () => {

    const naviage = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [searchHint, setSearchHint] = useState([])

    useEffect(() => {
        const searchDelay = setTimeout(async () => {
            if (searchValue.trim().length > 1) {
                const response = await TagService.getTagsByKeyService(searchValue.trim());
                if (response.status === 200 && response.data.length > 0) {
                    setSearchHint(response.data)
                } else {
                    setSearchHint([]);
                }
            } else {
                setSearchHint([]);
            }
        }, 100)
        return () => clearTimeout(searchDelay);
    }, [searchValue])


    const handleSeachOnEnter = (key) => {
        if (key === "Enter") {
            naviage(`search/${searchValue}`)
            setSearchValue("")
        }
    }

    return (
        <div className="search">
            {console.log(searchHint)}
            <input onKeyDown={(event) => handleSeachOnEnter(event.key)} onChange={(event) => setSearchValue(event.target.value)} value={searchValue} className="search-input" type="text" placeholder='Seach ...' />
            <i onClick={() => naviage(`search/${searchValue}`)} className="search-icon fa-solid fa-magnifying-glass"></i>

            {searchHint && searchHint.length > 0 &&
                <div className="search-hint">

                    {searchHint.map((item, index) => {
                        return (
                            <div onClick={() => {
                                naviage(`search/${item.name}`)
                                setSearchValue("")
                            }} className="search-hint-item">{item.name}</div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Search