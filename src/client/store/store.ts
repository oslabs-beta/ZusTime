import create from 'zustand';
import { storeType } from '../../types';

const useStore = create<storeType>()((set) => ({
  previousStates: [],
  index: 0,
  treeComponents: {
    name: '',
    children: null
  },

  updateIndex: (newIndex) =>
    set(() => ({
      index: newIndex,
    })),

  addPreviousState: (snapshot) =>
    set((state) => ({
      previousStates: [...state.previousStates, snapshot],
    })),

  updateTreeComponents: (treeObject) => 
  set(() => ({
    treeComponents: treeObject
  }))
}));

export default useStore;


