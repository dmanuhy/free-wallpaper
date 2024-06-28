import React, { useEffect, useState } from "react"
import { TagService } from "../services/TagService";
const TagContext = React.createContext(null);

const TagProvider = ({ children }) => {

    const [category, setCategory] = useState([])

    const fetchAllTag = async () => {
        const response = await TagService.getAllTag()
        console.log(response.status)
        if (response && response.status === 200 && response.data.length > 0) {
            setCategory(response.data)
        }
    }

    useEffect(() => {
        fetchAllTag()
    }, [])

    return (
        <TagContext.Provider value={{ category }}>
            {children}
        </TagContext.Provider>
    )
}

export { TagContext, TagProvider };