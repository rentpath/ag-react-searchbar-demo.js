
### Overview

This is a proof-of-concept (POC) using React/Redux to rebuild the
AG search bar. This POC is meant to be a conversation starter on
ways to use React and Redux at Rentpath. The code has not been
optimized so you may notice some duplication or refactoring
opportunities - this was done on purpose to help the beginning react
developer more easily understand react concepts.

This came about out of a frustration in trying to change the existing
AG code. The existing code is very difficult to work with due to
business logic and presentation being tightly coupled.

React best practices have evolved in the community over last year
or two and it can be difficult to sort through everything when
reading blog posts and studying tutorials.  A reources section has
been added to the end of this document for those new to React and
to infom some of the design decisions used in this repo.

This POC also fixes several UI quirks in the existing search bar:
  - The options panel stays open until the 'LESS button is clicked.
      - The prod version closes the panel when 'Clear Selections' or 'Clear Filters' are clicked.
      - The prod version closes the options panel when the 'Beds' or 'Price' buttons are clicked.

  - 'Clear Selections' only resets the selection dropdowns and removes the refinement pills for only those fields.
      - The prod version clears all refinement pills.

### In Brief

A global application state, managed by Redux, is used to store
component specific details (like which panel is currently open) as
well as search information (search term and selected refinements).
React is responsible for rendering the components and responding
to changes in the global state.

### Setup

```bash
$ npm install
$ webpack-dev-server

# in another termnal:
$ open http://localhost:8080
```

### Creating Components.
  - React.createElement().
      - JSX is more readable

  - React.createClass.
      - React team says it is going away.

  - ES6 classes
      - Is it stable?
      - Should UIs follow OO or functinal.

  - Prefer functional components.
     - Easier to test.
     - Easier to comprehend.
     - More performant.
     - Future proof.
     - http://wecodetheweb.com/2015/10/03/react-0-14s-coolest-feature-function-components/

### Testing
  ```bash
  $ npm run test:watch
  ```

  - All reducers have tests.

  - Component unit tests use shallowRender to avoid the need for a DOM.
      - Speed of test suites will become very important in a continuous delivery pipeline.
      - Integration tests would likely use the jsdom librry.

  - Not every component has a test yet.
      - The tests in test/components demonstrate:
          - Testing the 'display' style.
          - Testing option selected
          - Testing that a callback gets invoked on click or change.

### Todo
  - The search term does not use onesearch yet.
  - Wire up form submission button.
  - Handle 'live' results count update as the user interacts with the comonent.
  - Add integration tests.
  - Styling is needed.
      - How should we do this in React?
      - How would a reusable component be left open for theming?
  - Handle user entered prices in the Prices component.

### Resources
  - https://camjackson.net/post/9-things-every-reactjs-beginner-should-know
  - http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html
  - https://medium.com/javascript-scene/baby-s-first-reaction-2103348eccdd#.460w2guz2
  - http://reactkungfu.com/2015/07/approaches-to-testing-react-components-an-overview/?utm_campaign=buffer&utm_content=buffer51ecc&utm_medium=social&utm_source=twitter.com

