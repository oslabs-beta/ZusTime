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

(window as any).store = useStore;

export default useStore;