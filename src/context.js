import React, { useReducer, useContext, createContext } from 'react';

const UserContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "REGISTER_USER":
            return {
                ...state,
                users: [...state.users, action.payload]
            };
        default:
            return state;
    }
};

const UserProvider = ({ children }) => {
    const initialState = {
        users: []
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export { UserProvider, useUser };
