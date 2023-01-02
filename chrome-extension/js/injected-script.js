//this grabs the user's application's store
const store = window.store;


//so jump to state does not add snapshots to the array
let isRestoringState = false;
//this adds a listener to the user's store so that whenever a change to their store happens, a snapshot of the state is made and sent in a message to our chrome dev tool
store.subscribe(() => {
  //check to make sure isRestoringState is false
  if (!isRestoringState) {
    //grabs a snapshot of state
    const snapshot = store.getState();
    //make the snapshot a string, otherwise it cannot be sent in a message
    const stringSnapshot = JSON.stringify(snapshot);
    //send message
    window.postMessage({ body: 'stateSnapshot', snapshot: stringSnapshot });
  }
});

//this is listening for messages from content script to time travel
window.addEventListener('message', (event) => {
  if (event.data.body === 'TIMETRAVEL') {
    //we must parse the previous state from a string back into an object
    const parsedPreviousState = JSON.parse(event.data.previousState);
    //this sets the user's store back to its previous state
    //set is restoring state to true so snapshots are temporarily ignored
    isRestoringState = true;
    store.setState(parsedPreviousState);
    //set is restoring state back to false
    isRestoringState = false;
  }
});

//ALL THE CODE FOR THE COMPONENT TREE
//****change from window event listener
//****should be on clicking the toggle button in our app.tsx
//****pass click message from app to CS to injected script? Is that right?

// window.addEventListener('message', (event) => {
//   if (event.data.body === 'HIERARCHY') {
//     //****ALL FUNCTIONALITY IN HERE???
//   }
// })

window.addEventListener('click', (event) => {
  //linked list constructor to create component objects
  function componentNode(name) {
    this.name = name;
    this.children = null;
  }

  //HELPER FUNCTIONS FOR CREATING HIERARCHY
  //returns a boolean: true if reactFiber is defined
  //it would not be defined if it was not an html element
  const findReactFiber = (node) => {
    let reactFiber = false;
    let counter = 0;
    for (const key in node) {
      if (counter > 1) {
        break;
      }
      counter++;
      if (key.includes('reactFiber')) {
        reactFiber = true;
      }
    }
    return reactFiber;
  };

  //returns the name of the passed in component
  const findName = (component) => {
    return component.return.type.name;
  };

  const createHierarchy = (nodelist, startAt = 0) => {
    if (nodelist.length === 0) return;
    //****possible to do this without a for loop?
    for (let i = startAt; i < startAt + 1; i++) {
      //currNode is set to node within nodelist
      let currNode = nodelist[i];
      //if there does not exist a reactFiber key, we know currNode is not a component
      if (!findReactFiber(currNode)) return;
      //gets reactfiber node from node, because it is always the first property in the object, if it exists.
      const reactFiber = Object.entries(currNode)[0][0];
      //access the object in reactFiber
      const currNodeInReactFiber = currNode[reactFiber];

      //if name prop exists, then this is a component that we need to add it to our component tree
      if (findName(currNodeInReactFiber)) {
        const component = new componentNode(findName(currNodeInReactFiber));
        //if there are children, initialize the children array, where we will push objects of children component nodes
        const childrenArray = [];
        //check to see if this component has children
        if (currNode.childNodes.length > 0) {
          //initialize counter for while loop, so that we create components for multiple children
          let i = 0;
          while (i < currNode.childNodes.length) {
            //recursively call createHierarchy, passing in childNodes of node
            const componentChild = createHierarchy(
              currNode.childNodes,
              (startAt = i)
            );
            //if componentChild is defined, that means there are children for this node, so push to childrenArray
            if (componentChild) childrenArray.push(componentChild);
            //increment i so that we don't start at the same childNode again
            i++;
          }
        }
        //assign childrenArray to be the children of component
        component.children = childrenArray;
        //whether or not there are children, we return the component node created
        return component;
      }
    }
  };

  const finalHierarchy = createHierarchy(document.body.childNodes);
  console.log('finalHierarchy', finalHierarchy);

  //sends message containing tree component data to the content script
  window.postMessage({
    body: 'hierarchy',
    hierarchy: JSON.stringify(finalHierarchy),
  });
});
