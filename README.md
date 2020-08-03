# DXP React Search

React app build for search interfaces on www.nypl.org.

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
