import { NavLink } from "react-router-dom"

import "./Category.scss"

const category = ["All", "Car", "Computer", "Natural", "Sea", "Girl", "Boy", "Film", "Actor", "Cafe House", "AI", "Bikini"]

const Category = () => {
    return (
        <div className="category  content-width-padding">
            <div className="category-list">
                {category.map((item, index) => {
                    return (
                        <NavLink key={index} to={`/search/${item}`} className={({ isActive }) => isActive ? "category-tag category-tag-selected" : "category-tag"}>
                            {item}
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}

export default Category