export interface storeType {
    previousStates: string[],
    index: number,
    treeComponents: {
        name: string,
        children?: [] | null
    },
    updateIndex: (newIndex: number) => void,
    addPreviousState: (snapshot: string) => void,
    updateTreeComponents: (
      treeObject: {
        name: string,
        children?: [] | null
      }) => void,
  }

  export interface snapshotProp {
    index: number,
    injectScript: (arg0: string) => void,
    num: number
  }

  // export interface portType {
  //   name: string,
  //   disconnect: () => void,
  //   error: {
  //       message: string
  //   }, 
  //   onDisconnect?: {
  //       //listeners are supposed to be passed ports
  //       addListener: () => void,
  //       removeListener: () => void
  //   },
  //   onMessage: {
  //     addListener: () => void,
  //     removeListener: () => void
  //   }
  //   sender?: {
  //       tab?: 
        
  //   },
  //   postMessage: (arg0: string) => void
  // }

