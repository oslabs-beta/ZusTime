import * as React from "react";

function NavBar() {

    const timeTravelClick = (e) => {
        const tree = document.querySelector('#tree')
        tree.classList.toggle('hidden')
        const debug = document.querySelector('#debugger');
        debug.classList.toggle('hidden')

    }

    const componentTreeClick = (e) => {
        const tree = document.querySelector('#tree')
        tree.classList.toggle('hidden')
        const debug = document.querySelector('#debugger');
        debug.classList.toggle('hidden')
    } 

    return (
        <nav>
            <div>            
            <button onClick={timeTravelClick}>Time Travel</button>
            <button onClick={componentTreeClick}>Component Tree</button>
            </div>
            <div>
              <div>ZusTime</div>
            <img src='../public/images/ZusTime.png' alt="ZusTime Logo"></img></div>
        </nav>
    )
}

export default NavBar;