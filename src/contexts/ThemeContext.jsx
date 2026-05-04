import { createContext, useReducer, useEffect } from "react"

const ThemeContext = createContext();

let ThemeReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_THEME":
            return {...state, theme : action.payload}
        default:
            return state;
    }
}

const ThemeContextProvider = ({ children }) => {
    
    let [state, dispatch] = useReducer(ThemeReducer, {
        theme: 'light'
    });

    let changeTheme = (theme) => {
        dispatch({type: "CHANGE_THEME", payload: theme});
    }

    const isDark = state.theme === 'dark';

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <ThemeContext.Provider value={{...state, changeTheme, isDark}}>
            {children}
        </ThemeContext.Provider>
    )
}

export {ThemeContext, ThemeContextProvider}