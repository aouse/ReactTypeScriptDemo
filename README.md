## Build node_modules

In the project root, run:

### `npm install`

## Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload when making edits.

### `npm test`

Runs tests in watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Run on production server

In the project directory, you can run:

### `npm run start-server`

Runs the app on a basic Node.js express server.
Open [http://localhost:8080/next](http://localhost:8080/next) to view it in the browser.


## Observations

Project Structure is very flat, an enhancement would be to separate out components and test folders at the very least.

More unit tests could be developed including snapshots to test the DOM.

In order to test easily I have created an optional prop on the one component (ProductList) but this could be improved upon in the way the API calling/redux setup is done, again by separating things out further.

Limited TypeScript experience so have used comments to ignore some rules.


