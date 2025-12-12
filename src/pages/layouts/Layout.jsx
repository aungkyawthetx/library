import Navbar from '../../components/Navbar.jsx';
import './styles.css';
import { Outlet, useLocation } from 'react-router-dom'
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { useRef } from 'react';

export default function Layout() {
    const location = useLocation();
    const nodeRef = useRef(null);

    return (
    <>
        <Navbar />
        <SwitchTransition>
            <CSSTransition timeout={200} classNames='fade' key={location.pathname} nodeRef={nodeRef}>
                <div ref={nodeRef} className='max-w-6xl mx-auto p-3'>
                    <Outlet/>
                </div>
            </CSSTransition>
        </SwitchTransition>
    </>
    )
}
