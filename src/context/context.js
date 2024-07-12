import React, { useReducer, useContext, createContext } from 'react';
import axios from 'axios';

const UserContext = createContext();
const StudentContext = createContext();

const initialState = {
    user: null, // or your initial user state
};

const reducer = (state, action) => {
    switch (action.type) {
        case "REGISTER_USER":
            return {
                ...state,
                users: [...state.users, action.payload]
            };

        case "ADD_STUDENT":
            return {
                ...state,
                students: [...state.students, action.payload]
            };
            case 'SET_USER':
            return { ...state, user: action.payload };

        default:
            return state;
    }
};
//Providers
const UserProvider = ({ children }) => {
    const initialState = {
        users: []
    };
    
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UserContext.Provider value={{ user: state.user, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

const StudentProvider = ({ children }) => {
    const initialState = {
        students: []
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StudentContext.Provider value={{ state, dispatch }}>
            {children}
        </StudentContext.Provider>
    );
}

const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

const useStudent = () => {
    const context = useContext(StudentContext);
    if (context === undefined) {
        throw new Error("useStudent must be used within a StudentProvider");
    }
    return context;
}

export { UserProvider, useUser };
export { StudentProvider, useStudent };
