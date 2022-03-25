import { createContext, useState } from 'react';

export const AllContextData = createContext();

export default function RootContext({children}) {
    const [favoriteList, setFavoriteList] = useState([])

    return (
        <AllContextData.Provider
        value={{
            favoriteList, setFavoriteList
        }}
      >{children}</AllContextData.Provider>
    )
}