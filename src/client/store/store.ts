import create, {State} from 'zustand';
import Snapshots from '../components/Debugger/FakeData'



interface storeType {
  previousStates: any[],
  index: number,
  treeComponents: any,
  updateIndex: (index: number) => void,
  addPreviousState: (currColor: any) => void,
  updateTreeComponents: (treeComponents: any) => void,
}

const useStore = create<storeType>()((set:any) => ({
  previousStates: [],
  index: 0,
  treeComponents: {},

  updateIndex: (newIndex: number) =>
    set((state:any) => ({
      index: newIndex,
    })),

  addPreviousState: (snapshot) =>
    set((state: any) => ({
      previousStates: [...state.previousStates, snapshot],
    })),

  updateTreeComponents: (treeObject) => 
  set((state: any) => ({
    treeComponents: treeObject
  }))
}));

export default useStore;

// set up the store
// inside the store we need an array to hold previous state values
// inside of the previous state values we need to initialize state to 255
// when clicking on previous or next buttons, we need to produce states in the array
// also need an index value to keep track of current state we're on
