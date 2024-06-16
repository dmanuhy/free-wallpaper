import { useEffect } from "react";
import "./LoadMoreOnScroll.scss";
import { useInView } from "react-intersection-observer";
export const LoadMoreOnScroll = ({ page, setPage }) => {

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            setPage((page) => page + 1);
        }
    }, [inView])

    return (
        <div className="load-more-on-scroll" ref={ref}>
            <div className="load-more-on-scroll-loader"></div>
            <span>Loading ... {page}</span>
        </div>
    )
}