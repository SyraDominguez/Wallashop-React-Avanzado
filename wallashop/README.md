# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Testing Documentation

### 1. feat(test): Add Jest configuration and setup files for unit testing + unit test for synchronous action

- Installed necessary testing dependencies including jest, babel-jest, @babel/core, @babel/preset-env, @babel/preset-react, @testing-library/react, @testing-library/jest-dom, and jest-environment-jsdom.
- Created .babelrc configuration file to include presets for env and react, and plugin for transforming import.meta.
- Added jest.config.cjs for Jest configuration, specifying babel-jest for transforming code, jsdom for test environment, and jest.setup.js for setup files.
- Mocked import.meta.env in jest.setup.js to avoid errors during test execution.
- Created initial test for synchronous action 'setAds' in **tests**/adActions.test.js to ensure it creates the correct action object.
- Ensured tests run successfully with the new configuration.

Changes include:

- package.json: Added devDependencies and Jest configuration.
- .babelrc: Added Babel presets and plugins.
- jest.config.cjs: Jest configuration file.
- jest.setup.js: Setup file to mock import.meta.env.
- **tests**/adActions.test.js: Test file for synchronous action.

### 2. feat(test): Add unit test for async action in authActions

- Added unit tests for `fetchAds` async action in `authActions` to verify that actions are dispatched correctly based on API response.
- Configured the mock store with `redux-thunk` middleware for handling async actions.
- Mocked `axios` to simulate API responses and ensure proper dispatching without actual API calls.
- Verified that the correct actions are dispatched on successful and failed API requests.

Changes include:

- **authActionsAsync.test.js**: New test file with unit tests for `fetchAds` async action.
- **jest.config.cjs**: Ensured Jest configuration supports async action testing.

### 3. feat(test): Add unit test for reducer

### 

- Added unit tests for adReducer covering setAds, setTags, createAd, and deleteAd actions.
- Configured Babel to handle `import.meta.env` using `babel-plugin-transform-vite-meta-env` to avoid Jest errors.
- Updated Jest setup and configuration for consistent test environment.

Changes include:

- package.json: Added `vite-plugin-environment` as devDependency.
- .babelrc: Added `babel-plugin-transform-vite-meta-env` plugin.
- jest.config.cjs: Jest configuration file.
- jest.setup.js: Setup file to mock `import.meta.env`.

### 4.  feat(test): Add unit tests for selectors

- Created selectors `getAds`, `getTags`, and `getAdById` in `src/store/selectors/selectors.js`.
- Added unit tests for selectors in `__test__/selectors.test.js` to ensure correct data extraction from state.

Changes include:

- **selectors**: `src/store/selectors/selectors.js`
- **tests**: `__test__/selectors.test.js`

### 5. feat(test): Add snapshot test for Form component

- Added `form.test.js` to include a snapshot test for the `Form` component.
- Ensured the `Form` component renders correctly and matches the snapshot.
- Configured the test to use `redux-mock-store` for providing a mock Redux store.
- Utilized `BrowserRouter` to enable routing capabilities within the test.

Changes include:

- `src/components/Form.jsx`: No changes, just ensuring proper import.
- `__test__/form.test.js`: New test file with snapshot testing.

### 6. feat(test): Add unit test for component with mocked store action

- Added unit tests for `SomeComponent` to verify that login and logout actions are dispatched correctly.
- Configured a custom middleware to mock redux-thunk behavior for testing asynchronous actions.
- Mocked `login` and `logout` actions from `authActions` to ensure proper dispatching without actual API calls.
- Ensured the component's rendering and button click interactions are handled correctly in the tests.

Changes include:

- **someComponent.test.js**: New test file with unit tests for `SomeComponent`.
- **someComponent.jsx**: Updated component to include React import.

```shell

╰─ npm test

> wallashop@0.0.0 test
> jest

 PASS  __test__/adReducer.test.js
 PASS  __test__/authActionsAsync.test.js
 PASS  __test__/adActionsSync.test.js
 PASS  __test__/selectors.test.js
 PASS  __test__/form.test.js
 PASS  __test__/someComponent.test.js
  ● Console

    console.log
      Login button clicked

      at handleLogin (src/components/SomeComponent.jsx:11:13)

    console.log
      Logout button clicked

      at handleLogout (src/components/SomeComponent.jsx:17:13)


Test Suites: 6 passed, 6 total
Tests:       15 passed, 15 total
Snapshots:   1 passed, 1 total
Time:        1.939 s
Ran all test suites.

```
