import "./Category.scss"

const category = ["All", "Car", "Car", "Car", "Car", "Car", "Car", "Car", "Car", "Car", "Car", "Car"]

const Category = () => {
    return (
        <div className="category  content-width-padding">
            <div className="category-list">
                {category.map((item, index) => {
                    return (
                        <span className={index === 0 ? "category-tag category-tag-selected" : "category-tag"} >{item + " " + index}</span>
                    )
                })}
            </div>
        </div>
    )
}

export default Category