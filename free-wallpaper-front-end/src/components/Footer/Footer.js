import "./Footer.scss"

const Footer = () => {
    return (
        <div className="footer d-flex justify-content-between content-width-padding content-height-padding">
            <div className="footer-left d-flex flex-column gap-3">
                <span className="footer-logo fs-3 text-success">Free Wallpaper</span>
                <span className="fw-bold">Over 2 million+ high quality stock images shared by our talented community.</span>
                <span className="fs-5">© Copyright - {new Date().getFullYear()}</span>
            </div>
            <div className="footer-right d-flex justify-content-center gap-5">
                <div className="d-flex flex-column gap-2">
                    <span className="fw-bold">Discover</span>
                    <span className="">Fully Wallpaper</span>
                    <span className="">Mostly Liked Photos</span>
                    <span className="">Our Contributors</span>
                    <span className="">Collections/Albums</span>
                </div>

                <div className="d-flex flex-column gap-2">
                    <span className="fw-bold">About us</span>
                    <span className="">About Us</span>
                    <span className="">Privacy Policy</span>
                    <span className="">Terms of Service</span>
                </div>
            </div>
        </div>
    )
}

export default Footer