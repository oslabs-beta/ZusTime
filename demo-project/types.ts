export interface storeType {
  counter: number,
  incrementCounter: () => void,
  decrementCounter: () => void,
  todos: string[],
  newTodo: string,
  setNewTodo: (string) => void,
  addTodo: (string) => void
}

export type classNameProp = string;