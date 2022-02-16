import React, {createContext, useState} from 'react';

export const AuthContext = createContext({});

function AuthProvider(props){
    const [task, setTask] = useState({
        taskList:[],
    });
    
    return (
        <AuthContext.Provider value={{task, setTask}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;