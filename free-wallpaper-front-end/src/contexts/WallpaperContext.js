import React, { useEffect, useState } from "react";
import { WallpaperService } from "../services/wallpaperService";

const WallpaperContext = React.createContext(null);

const WallpaperProvider = ({ children }) => {
  const [wallpaperList, setWallpaperList] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({
    order: "createdAt",
    priority: "descending",
  });

  const [noMoreData, setNoMoreData] = useState(false);

  const fetchAllWallpaper = async () => {
    const response = await WallpaperService.getAllWallpaperService(page, sort.order, sort.priority);
    if (response && response.status === 200 && response.data.length > 0) {
      if (page === 1) {
        setWallpaperList(response.data);
      } else {
        setWallpaperList((products) => [...products, ...response.data]);
      }
    } else {
      setNoMoreData(true);
    }
  };

  useEffect(() => {
    if (page !== 0) {
      fetchAllWallpaper();
    }
  }, [page, sort]);

  return (
    <WallpaperContext.Provider value={{ page, setPage, wallpaperList, setWallpaperList, sort, setSort, noMoreData }}>
      {children}
    </WallpaperContext.Provider>
  );
};

export { WallpaperContext, WallpaperProvider };
