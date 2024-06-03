import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import PublicRoutes from "./routes/PublicRoutes";
import { ComponentIndex } from "./components/ComponentsIndex";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PublicRoutes />}>
                    <Route path="" element={<ComponentIndex.Home />} />
                    {/*Define all public route here*/}
                </Route>
            </Routes>
            <ToastContainer
                position="bottom-left"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </BrowserRouter>
    )
}

export default App