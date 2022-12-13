import create, {State} from 'zustand';
import data from './fakedata'

      const generateRandomColor = () => {
        return Math.floor(Math.random() * 255);
      };

interface storeType {
  bgColor: any,
  previousStates: any[],
  index: number,
  updateIndex: (index: number) => void,
  addPreviousState: (currColor: any) => void,
  newColor: (newBgColor?: any) => void
}

const useStore = create<storeType>()((set:any) => ({
  previousStates: [...data],
  index: data.length,
  
  bgColor: {
    r: data[data.length - 1].bgColor.r,
    g: data[data.length - 1].bgColor.g,
    b: data[data.length - 1].bgColor.b,
  },

  updateIndex: (newIndex: number) =>
    set((state:any) => ({
      index: newIndex,
    })),

  addPreviousState: (currColor) =>
    set((state: any) => ({
      previousStates: [...state.previousStates, currColor],
    })),

  newColor: (newBgColor?) =>
    set((state: any) => ({
      bgColor: {
        r: generateRandomColor(),
        g: generateRandomColor(),
        b: generateRandomColor()
      },
    })),
}));

export default useStore;