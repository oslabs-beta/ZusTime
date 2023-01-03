import create from 'zustand';
import { storeType } from './types';


const useStore = create<storeType>()((set) => ({
  counter: 0,
  incrementCounter: () =>
    set((state) => ({
      counter: state.counter + 1
    })),
  decrementCounter: () =>
    set((state) => ({
      counter: state.counter - 1
    })),
  todos: [],
  newTodo: "",
  setNewTodo: (newTodo) => 
    set((state) => ({
      newTodo
    })),
  addTodo: () =>
    set((state) => ({
      todos: [...state.todos, state.newTodo],
      newTodo: ''
    })),
}));

//this makes the store available to be accessed by a chrome developer tool
(window as any).store = useStore;

export default useStore;