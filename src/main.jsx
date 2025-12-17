import './index.css'
import router from './router'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeContextProvider } from './contexts/ThemeContext'
import { AuthContextProvider } from './contexts/AuthContext'

createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
        <ThemeContextProvider>
            <RouterProvider router={router}/>
        </ThemeContextProvider>
    </AuthContextProvider>
)
