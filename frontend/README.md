[Back to root](https://github.com/israelias/lantutors#contents)\
[Go to backend](https://github.com/israelias/lantutors/tree/master/backend)

# Lantutors Front-End

This is a really simple project that shows the usage of Next.js with TypeScript.


## Frameworks and Libraries

- [Node.js:](https://nodejs.org/en/) The runtime environment that allows the app to run asynchronous server-side scripts and events.(Bootstrapped with Nextjs)
- [Webpack:](https://webpack.js.org/) The static module bundler that builds a dependency graph mapping every module the project requires. (Bootstrapped with Nextjs)
- [Typescript]()
- [React 17.0:](https://reactjs.org/) JavaScript Library for building user interfaces.
- [Material-UI](https://material-ui.com/) React component for faster and easier web development.
- [React-Feather:](https://feathericons.com/?query=mai)
- [Axios:](https://github.com/axios/axios) The promise-based HTTP client for the browser and node.js that handles `get` requests to backend API.
- [isomorphic-unfetch]() `unfetch` Fetcher that handles `post` requests to the backend API.
- [clsx:](https://developer.aliyun.com/mirror/npm/package/clsx):Tiny utility for constructing classnames conditionally

## Frontend Deployment

- `commit` and `push` the code from local IDE to Github via Git.
- Log in to Vercel and click the [New Project](https://vercel.com/new) CTA.
- Access "Import Git Repository" via the `select` input, located at the top-left of the immediate prompt.
- Click "Import" on the repository named `lantutors`
- Select the default `Personal Account`
- Select the `frontend` sub-directory.
- Click `Deploy`
- Barring errors, await the prompt for:
  > ##### "Your project has been successfully deployed."

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

## Additional Documentation on Executing the Repo with Next and TypeScript

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example with-typescript with-typescript-app
# or
yarn create next-app --example with-typescript with-typescript-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

## Notes

This example shows how to integrate the TypeScript type system into Next.js. Since TypeScript is supported out of the box with Next.js, all we have to do is to install TypeScript.

```
npm install --save-dev typescript
```

To enable TypeScript's features, we install the type declarations for React and Node.

```
npm install --save-dev @types/react @types/react-dom @types/node
```

When we run `next dev` the next time, Next.js will start looking for any `.ts` or `.tsx` files in our project and builds it. It even automatically creates a `tsconfig.json` file for our project with the recommended settings.

Next.js has built-in TypeScript declarations, so we'll get autocompletion for Next.js' modules straight away.

A `type-check` script is also added to `package.json`, which runs TypeScript's `tsc` CLI in `noEmit` mode to run type-checking separately. You can then include this, for example, in your `test` scripts.
