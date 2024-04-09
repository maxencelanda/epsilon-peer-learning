import { createContext, useState, useEffect } from 'react'

export const UserContext = createContext()

function getInitialState(){
  const user = localStorage.getItem("theUser")
  return user ? JSON.parse(user): []
}

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(getInitialState)

    useEffect(() => {
      localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        const user = localStorage.getItem("user");
        console.log(localStorage.getItem("user"))
        if (user) {
          setUser(JSON.parse(user));
        }
    }, []);

    const addUser = (usr) => {
        if (!(usr === user)) {
          setUser(usr);
        }
    };

    const removeUser = () => {
      setUser(null);
    };

    const isConnected = () => {
      return user.length == 0
    };

    return (
        <UserContext.Provider
          value={{
            user,
            addUser,
            removeUser,
            isConnected,
          }}>
          {children}
        </UserContext.Provider>
    );
}