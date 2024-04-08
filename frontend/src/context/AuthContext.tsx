import { createContext, useState, useEffect } from 'react'

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState()

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
          setUser(JSON.parse(user));
        }
    }, []);

    const addUser = (usr) => {
        const isUserinUsers = user === usr;
        if (!isUserinUsers) {
          setUser(usr);
        }
    };

    const removeUser = () => {
          setUser(null);
    };

    return (
        <UserContext.Provider
          value={{
            user,
            addUser,
            removeUser,
          }}>
          {children}
        </UserContext.Provider>
    );
}