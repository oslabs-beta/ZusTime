( ADD ZUSTIME LOGO HERE )

#ZusTime
##Zustand's first dedicated time travel debugging tool

Hi there and welcome to ZusTime, a Chrome developer tool that can be used with any Zustand application!
( put more of basic intro here)



## Getting Started
### Adding ZusTime as a Chrome developer tool
As of now, ZusTime has not yet been added to the Chrome Extension store. So to use it, please proceed as follows:
1. Clone this repot to your local machine.
2. Open a terminal, navigate to the root director and run
``` npm run build ```
3. Open Google Chrome, navigate to `chrome://extensions/`, and make sure the "Developer mode" toggle in the top-right is siwtched on.
4. Click the "Load unpacked" button in the top-left and select the directory `chrome-extension` on your local machine.

### Making ZusTime compatible with your application
1. Within your Zustand application, navigate to the file that contains your store.
2. Above `export default <your store name>;` add this line of code `(window as any).store = <your store name>;`. This gives ZusTime the ability to capture snapshots of state when changes to your store are made.
3. (add something about security issue with this and that it should only be used in development mode and removed prior to production)
4. The time travel debugging feature will work with any Zustand Application, however the component hierarchy tree utilizes React Fiber and will only render a tree when React version 16 or higher is being used. 

And that's it! You can now run your application in development mode and utilize ZusTime's time travel debugging and component hierarchy tree visulization features!

## Time Travel Debugging with A State Tracker and Visualizer
Once you have your application running in a Chrome browser, open the Chrome DevTools panel by right clicking on the screen and choosing `inspect` or you can `F12` on your keyboard. Among the panels you should find a panel with the title ZusTime and a really cute icon.
( add gif of how to find zustime in the chrome dev panels )
( add gif of how time travel debugger works here )
When a change to state is made within your Zustand application, a snapshot of your store is captured and a button will render within the Chrome developer tool. Whenever your want to "time travel" simply click one of the jump to state buttons and your application will be reverted to a previous instance of state. In addition, you will be able to view the current state of your Zustand store on the right hand side of the buttons. 

## React Component Hierarchy Tree Visualizer
To view your component tree, 
( add gif of how tree looks here )

## Contribute




