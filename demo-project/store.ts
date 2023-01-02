import create from 'zustand';
interface storeType {
  counter: number,
  incrementCounter: () => void,
  decrementCounter: () => void,
  todos: string[],
  newTodo: string,
  setNewTodo: (string) => void,
  addTodo: (string) => void
}

const useStore = create<storeType>()((set:any) => ({
  counter: 0,
  incrementCounter: () =>
    set((state: any) => ({
      counter: state.counter + 1
    })),
  decrementCounter: () =>
    set((state:any) => ({
      counter: state.counter - 1
    })),
  todos: [],
  newTodo: "",
  setNewTodo: (newTodo: string) => 
    set((state:any) => ({
      newTodo
    })),
  addTodo: () =>
    set((state: any) => ({
      todos: [...state.todos, state.newTodo],
      newTodo: ""
    })),
}));

//this makes the store available to be accessed by a chrome developer tool
(window as any).store = useStore;

export default useStore;