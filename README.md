# Doug's Conway's Game of Life

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## References

- https://playgameoflife.com/ (very helpful parsing the rules)
- https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
- https://developer.mozilla.org/en-US/
  - In particular as a refresher on `localStorage` syntax
- https://geletka-plus-pattern-library.netlify.app/accordion/
  - Pattern library built by my mentee
- ChatGPT was used for various prompts as a sounding board or quick solution in lieu of Google
  - Filling a new empty array with booleans and later, random booleans
  - Brainstorming solutions to manage state; specifically the loading of option and grid state from local storage, though ultimately I used my own solution
  - Curiosity had me trying to find a more concise solution to the render function that checks neighbors but I've kept my original solution.
