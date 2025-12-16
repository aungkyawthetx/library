import Navbar from '../../components/Navbar.jsx';
import './styles.css';
import { Outlet, useLocation } from 'react-router-dom'
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { useEffect, useRef } from 'react';
import useTheme from '../../hooks/useTheme.js';

export default function Layout() {
    const location = useLocation();
    const nodeRef = useRef(null);
    let { isDark } = useTheme();
    
    useEffect(() => {
        let body = document.body;
        if (isDark) {
            body.classList.add('bg-zinc-900');
        } else {
            body.classList.remove('bg-zinc-900');
        }
    }, [isDark]);

    return (
    <div className={isDark ? 'bg-zinc-900' : ''}>
        <Navbar />
        <SwitchTransition>
            <CSSTransition timeout={200} classNames='fade' key={location.pathname} nodeRef={nodeRef}>
                <div ref={nodeRef} className='max-w-6xl mx-auto p-3'>
                    <Outlet/>
                </div>
            </CSSTransition>
        </SwitchTransition>
    </div>
    )
}
