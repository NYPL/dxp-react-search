# DXP React Search

React app build for search interfaces on www.nypl.org. TEST

## Installation (Local)

- Clone the dxp-react-search repo
- Run `npm install`

## Setup Local .env file
- Copy `.env.example` to `.env`
- Update the value for `NEXT_PUBLIC_GOOGLE_MAPS_API` to the NYPL Google Maps/Geocode API Key

## Start development server
```
npm run dev
```

## Deployment

We use TravisCI for continuous integration and delivery. Builds are started on git push to a target branch per environment (`development`, `qa`, `production`). Deployment to AWS will occur on successful build to an Elastic Container Service cluster.

## Next JS Asset Prefix

NYPL runs a reverse proxy in order to serve multiple different apps under the nypl.org domain.

For this app, the QA and PROD environment will use an `ASSET_PREFIX` .env variable that is wired up to the Next JS `assetPrefix` config.

This will prefix all Next JS assets for this app with `/scout` so the RP rules can route the correct assets to the correct app.

Other Next JS apps will use a different prefix.

For local development, `ASSET_PREFIX` should just be set to a blank string, like in the `.env.example` file.
