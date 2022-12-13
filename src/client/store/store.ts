import create, {State} from 'zustand';
import Snapshots from '../components/Debugger/FakeData'



interface storeType {
  bgColor: any,
  previousStates: any[],
  index: number,
  updateIndex: (index: number) => void,
  addPreviousState: (currColor: any) => void,
  newColor: (newBgColor: any) => void
}

const useStore = create<storeType>()((set:any) => ({
  previousStates: [...Snapshots],
  index: Snapshots.length,
  
  bgColor: {
    r: Snapshots[Snapshots.length - 1].bgColor.r,
    g: Snapshots[Snapshots.length - 1].bgColor.g,
    b: Snapshots[Snapshots.length - 1].bgColor.b,
  },

  updateIndex: (newIndex: number) =>
    set((state:any) => ({
      index: newIndex,
    })),

  addPreviousState: (currColor) =>
    set((state: any) => ({
      previousStates: [...state.previousStates, currColor],
    })),

  newColor: (newBgColor) =>
    set((state: any) => ({
      bgColor: newBgColor,
    })),
}));

export default useStore;

// set up the store
// inside the store we need an array to hold previous state values
// inside of the previous state values we need to initialize state to 255
// when clicking on previous or next buttons, we need to produce states in the array
// also need an index value to keep track of current state we're on
