import { createContext, useState, useEffect, useContext, useCallback, useRef, use } from "react";
import {STAGE, AGE} from "../constants.js";

const AppContext = createContext(null);

export const AppProvider({ children }){
    const [theme, setTheme] = useState(() => 
        localStorage.getItem('cv_theme') || 'dark');
        document.body.className = theme === "light"? "light-mode" : "";
    useEffect(() => {
        localStorage.setItem('cv_theme', theme);
    }, [theme]); 

    const [userName, setUserName] = useState('');
    const [userAge, setUserAge] = useState('Adult');

    const [stage, setStage] = useState(STAGE.NAME);
    const [chatMsgs, setChatMsgs] = useState([]);
    const [isBotTyping, setIsBotTyping] = useState(false);

    const messageCounter = useRef(0);
    const newId = () => `msg-${++messageCounter.current}`;

    const addMsg = useCallback((role, content) => {
        setChatMsgs(prev => [...prev, { id: newId(), role, content }], []);
    
    const resetChat = useCallback(() => {
        setChatMsgs([]);
        setStage(STAGE.NAME);
        setUserName('');
        setUserAge(AGE.ADULT);
        setIsBotTyping(false);
        }, []);

    const value = {
        theme, setTheme,
        userName, setUserName,
        userAge, setUserAge,
        stage, setStage,
        chatMsgs, addMsg, resetChat,
        isBotTyping, setIsBotTyping
    };

    
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;

}


export  function useApp(){
        const ctx = useContext(AppContext);
        if(!ctx) throw new Error("useApp must be used within AppProvider");
        return ctx;
}
