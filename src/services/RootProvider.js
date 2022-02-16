import React, {createContext, useState} from 'react';

export const RootContext = createContext({
    taskList: [],
    setTaskList: () => {}
})

function RootProvider(props){
    const [taskList, setTaskList] = useState([]);

    return (
        <RootContext.Provider value={{taskList, setTaskList}}>
            {props.children}
        </RootContext.Provider>
    );
}

export default RootProvider;
