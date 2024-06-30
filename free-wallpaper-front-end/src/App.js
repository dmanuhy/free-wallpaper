import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PublicRoutes from "./routes/PublicRoutes";
import { Component } from "./components";
import { Page } from "./pages";
import AccountManagement from "./pages/AccountManagement/AccountManagement";
import RequestManagement from "./pages/RequestManagement/RequestManagement";

const App = () => {
  return (
    <BrowserRouter>
      <Component.ScrollToTop />
      <Component.Header />
      <Routes>
        <Route path="/" element={<PublicRoutes />}>
          <Route path="" element={<Page.Home />} />
          <Route path="wallpaper/:id" element={<Page.WallpaperDetail />} />
          <Route path="search/:key" element={<Page.WallpaperSearchResult />} />
          {/*Define all public route here*/}
          <Route path="login" element={<Page.Login />} />
          <Route path="user/:userId" element={<Page.UserGallery />} />
          <Route path="user/:userId/collections" element={<Page.UserCollections />} />
          <Route path="user/:userId/album/:albumId" element={<Page.UserCollectionsDetails />} />
          <Route path="user/:userId/edit-profile" element={<Page.Editprofile />} />
          <Route path="management/account" element={<AccountManagement />} />
          <Route path="management/request" element={<RequestManagement />} />
          <Route path="register" element={<Page.Register />} />
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
