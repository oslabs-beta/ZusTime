import create from 'zustand';

const useStore = create((set) => ({
  bgColor: {
    r: 225,
    g: 225,
    b: 225,
  },

  previousStates: [],

  addPreviousState: (currColor) =>
    set((state) => ({
      previousStates: [...state.previousStates, currColor],
    })),

  newColor: (r, g, b) =>
    set((state) => ({
      bgColor: {
        r: r,
        g: g,
        b: b,
      },
    })),
}));

export default useStore;

// set up the store
// inside the store we need an array to hold previous state values
// inside of the previous state values we need to initialize state to 255
// when clicking on previous or next buttons, we need to produce states in the array
// also need an index value to keep track of current state we're on
