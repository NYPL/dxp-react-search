# DXP Scout

React app build for www.nypl.org. Pages currently in repo:

- Location Finder - https://www.nypl.org/locations
- Articles & Databases - https://www.nypl.org/research/collections/articles-databases
- Blogs - https://www.nypl.org/blog
- Press Releases, Homepage and more (coming soon)

## Installation (Local)

Follow these steps to setup a local installation of the project:

1. Clone the repo

```sh
$ git clone git@github.com:NYPL/dxp-react-search.git
```

2. Install all the node dependencies

```sh
$ npm install
```

3. Copy `.env.example` to create a local .env file

```sh
$ cp .env.example .env
```

4. Update the value for `NEXT_PUBLIC_GOOGLE_MAPS_API` to the NYPL Google Maps/Geocode API Key

5a. Start development server

```sh
$ npm run dev
```

5b. Alternatively you start the production mode server

```sh
$ npm run build && npm start
```

## Deployment

We use TravisCI for continuous integration and delivery. Builds are started on git push to a target branch per environment (`development`, `qa`, `production`). Deployment to AWS will occur on successful build to an Elastic Container Service cluster.

## Next JS Asset Prefix

NYPL runs a reverse proxy in order to serve multiple different apps under the nypl.org domain.

For this app, the QA and PROD environment will use an `ASSET_PREFIX` .env variable that is wired up to the Next JS `assetPrefix` config.

This will prefix all Next JS assets for this app with `/scout` so the RP rules can route the correct assets to the correct app.

Other Next JS apps will use a different prefix.

For local development, `ASSET_PREFIX` should just be set to a blank string, like in the `.env.example` file.
