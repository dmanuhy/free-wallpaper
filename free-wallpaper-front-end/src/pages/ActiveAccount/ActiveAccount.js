import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./ActiveAccount.scss"
import { UserService } from "../../services/UserService"
import { Loader } from "../../components/Loader/Loader"

const ActiveAccount = () => {

    const { token } = useParams()

    const [isVerified, setIsVerified] = useState("loading")

    useEffect(() => {
        if (token) {
            activeAccount();
        }
    }, [])

    const activeAccount = async () => {
        const response = await UserService.activeAccountService({
            token: token
        })
        console.log(response)
        if (response && response.status === 201) {
            setIsVerified("done");
        } else {
            setIsVerified("failed")
        }
    }

    return (
        <div className="active-account content-width-padding content-height-padding">
            {isVerified === "loading" ?
                <Loader />
                :
                isVerified === "done" ?
                    <span className="text-success fs-4"><i className="fa-regular fa-circle-check"></i>Verify Successfully</span>
                    :
                    <span className="text-danger fs-4"><i className="fa-solid fa-circle-exclamation"></i>404 Content Not Found</span>
            }
        </div>
    )
}

export default ActiveAccount