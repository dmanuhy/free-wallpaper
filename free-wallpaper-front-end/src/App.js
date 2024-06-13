import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PublicRoutes from "./routes/PublicRoutes";
import { Component } from "./components";
import { Page } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Component.Header />
      <Routes>
        <Route path="/" element={<PublicRoutes />}>
          <Route path="" element={<Page.Home />} />
          <Route path="search/:category" element={<Page.WallpaperSearchResult />} />
          {/*Define all public route here*/}
          <Route path="login" element={<Page.Login />} />
          <Route path=":userid" element={<Page.UserGallery />} />
          <Route path=":userid/collections" element={<Page.UserCollections />} />
          <Route path=":userid/:albumid" element={<Page.UserCollectionsDetails />} />
          <Route path="edit" element={<Page.Editprofile />} />

        </Route>
      </Routes>
      <Component.Footer />
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
  );
};

export default App;
