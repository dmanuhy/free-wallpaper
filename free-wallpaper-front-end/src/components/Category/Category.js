import { NavLink } from "react-router-dom"

import "./Category.scss"
import { useContext } from "react"
import { TagContext } from "../../contexts/TagContext"

const Category = () => {

    const { category } = useContext(TagContext)

    return (
        <div className="category content-width-padding">
            <div className="category-list">
                <NavLink to={`/`} className={({ isActive }) => isActive ? "category-tag category-tag-selected" : "category-tag"}>
                    All
                </NavLink>
                {category && category.map((item, index) => {
                    return (
                        <NavLink key={index} to={`/search/${item.name}`} className={({ isActive }) => isActive ? "category-tag category-tag-selected" : "category-tag"}>
                            {item.name}
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}

export default Category