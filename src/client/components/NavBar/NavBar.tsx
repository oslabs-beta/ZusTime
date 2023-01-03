import * as React from "react";
import '../../public/styles.css'
// import logo from '../../public/images/ZusTime.PNG'

function NavBar() {

    const timeTravelClick = (e: React.MouseEvent) => {
        const tree = document.querySelector('#tree')
        if (!tree.classList.contains('hidden')){
            tree.classList.toggle('hidden')
        }
        
        const debug = document.querySelector('#debugger');
        if (debug.classList.contains('hidden')){
            debug.classList.toggle('hidden')
        }

    }

    const componentTreeClick = (e: React.MouseEvent) => {
        const debug = document.querySelector('#debugger');
        if (!debug.classList.contains('hidden')) {
            debug.classList.toggle('hidden')
        }

        
        const tree = document.querySelector('#tree')
        if (tree.classList.contains('hidden')) {
            tree.classList.toggle('hidden')
        }
    } 

    return (
        <nav className="navBarContainer">         
            <button onClick={timeTravelClick}>Time Travel</button>
            <button onClick={componentTreeClick}>Component Tree</button>
        </nav>
    )
}

export default NavBar;