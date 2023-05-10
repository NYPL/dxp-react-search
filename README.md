# DXP Scout section-front-previews-052023

React app build for www.nypl.org. Pages currently in repo:

- Location Finder - https://www.nypl.org/locations
- Articles & Databases - https://www.nypl.org/research/collections/articles-databases
- Blog - https://www.nypl.org/blog
- Homepage - https://www.nypl.org
- Press Releases - https://www.nypl.org/press
- Section Fronts:
  - Give - https://www.nypl.org/give
  - Research - https://www.nypl.org/research
  - Support - https://www.nypl.org/research/support
  - Educators - https://www.nypl.org/education/educators
- Section Fronts, Events, and more (coming soon)

## Requirements

- NodeJS to install visit [NodeJS](https://nodejs.org/en) ( node: v16.15.0, npm: 8.5.5 )
- NVM to install go to [NVM github page](https://github.com/nvm-sh/nvm)
- Git to install go to [Git Page](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Code Editor [VSCode](https://code.visualstudio.com/download)

## Installation Scout (Local)

Follow these steps to setup a local installation of the project:

1. Clone the repo

```sh
git clone git@github.com:NYPL/dxp-react-search.git
```

Then open the folder

```sh
cd dxp-react-search
```

2. Install all the node dependencies

Check your node version and npm version first

```sh
node -v
```

v16.x.x

```sh
npm -v
```

8.x.x

```sh
npm install
```

3. Copy `.env.example` to create a local .env file

```sh
cp .env.example .env
```

4. Update values in `.env`

   example: `NEXT_PUBLIC_GOOGLE_MAPS_API` with the NYPL Google Maps/Geocode API Key

5. Start development server

```sh
npm run dev
```

6. Alternatively you start the production mode server

```sh
npm run build && npm start
```

## Code Editor Setup

VS Code editor is the recommended IDE for React development. These are recommended VS Code extensions that will help with dev work.

- Prettier
- ESLint
- ES7 + React/Redux
- Auto Import
- DotENV
- GraphQL
- MDX
- Project Manager

## App Testing

- Run Unit tests

```sh
npm test
```

- Run Cypress tests (E2E)

```sh
npm run build && npm start
```

Open new Terminal to start tests

```sh
npm run cypress
```

## Deployment

We use TravisCI for continuous integration and delivery. Builds are started on git push to a target branch per environment (`development`, `qa`, `production`). Deployment to AWS will occur on successful build to an Elastic Container Service cluster.

## Next JS Asset Prefix

NYPL runs a reverse proxy in order to serve multiple different apps under the nypl.org domain.

For this app, the QA and PROD environment will use an `ASSET_PREFIX` .env variable that is wired up to the Next JS `assetPrefix` config.

This will prefix all Next JS assets for this app with `/scout` so the RP rules can route the correct assets to the correct app.

Other Next JS apps will use a different prefix.

For local development, `ASSET_PREFIX` should just be set to a blank string, like in the `.env.example` file.
