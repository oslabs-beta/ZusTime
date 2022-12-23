import create from 'zustand';
interface storeType {
  counter: number,
  incrementCounter: () => void;
}

const useStore = create<storeType>()((set:any) => ({
  counter: 0,
  incrementCounter: () =>
    set((state: any) => ({
      counter: state.counter + 1
    }))
}));

//this makes the store available to be accessed by a chrome developer tool
(window as any).store = useStore;

export default useStore;