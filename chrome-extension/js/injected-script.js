
console.log('hello im inside of injected scripts');

//this grabs the user's application's store
const store = window.store;

//this adds a listener to the user's store so that whenever a change to their store happens, a snapshot of the state is made and sent in a message to our chrome dev tool
store.subscribe(() => {
  //grabs a snapshot of state
  const snapshot = store.getState();
  
  //make the snapshot a string, otherwise it cannot be sent in a message
  const stringSnapshot = JSON.stringify(snapshot);

  //send message
  window.postMessage(
   { body: 'stateSnapshot', snapshot: stringSnapshot }
   );
});

//this is listening for messages from content script to time travel
window.addEventListener('message', (event) => {
  if (event.data.body === 'TIMETRAVEL') {
    //we must parse the previous state from a string back into an object
    const parsedPreviousState = JSON.parse(event.data.previousState);

    //this sets the user's store back to its previous state
    store.setState(parsedPreviousState);
  }
});


//ALL THE CODE FOR THE COMPONENT TREE
window.addEventListener('click', (event) => {

  //gets child  nodes
  const childNode = document.body.childNodes[0];
  console.log('child nodes', childNode);

  //gets fiber node from child nodes
  let reactFiber;
  for (const key in childNode) {
    if (key.includes('reactFiber')) {
      console.log(key);
      reactFiber = childNode[key];
      break;
    }
  }

  //gets app name
  const appName = reactFiber.return.type.name
  //gets children array
  const childrenArray = reactFiber.memoizedProps.children
  //declaring children array to pass as message
  const childrenNames = [];
  //getting their names and props
  childrenArray.forEach((child) => {
    if (typeof child.type === 'function') {
      childrenNames.push(child.type.name)
    }
  })
  
  //sends message containing tree component data to the content script
  window.postMessage({
    body:
    {
      tree: {
        app: appName,
        children: childrenNames
      }
    }
  });
  
});
