import * as React from "react";
// import logo from '../../public/images/ZusTime.PNG'

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
        <nav className="navBarContainer">
            <div >            
            <button onClick={timeTravelClick}>Time Travel</button>
            <button onClick={componentTreeClick}>Component Tree</button>
            </div>
            <div>
              <div>ZusTime</div>
              <div className="logo"></div></div>
        </nav>
    )
}

export default NavBar;