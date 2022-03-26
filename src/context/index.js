import { createContext, useState } from 'react';

export const AllContextData = createContext();

const getLocalItems = () => {
    let list = localStorage.getItem("favorite-author");
    if (list) {
        return JSON.parse(localStorage.getItem("favorite-author"));
    } else {
        return [];
    }
}

export default function RootContext({children}) {
    const [favoriteList, setFavoriteList] = useState(getLocalItems());

    return (
        <AllContextData.Provider
        value={{
            favoriteList, setFavoriteList
        }}
      >{children}</AllContextData.Provider>
    )
}