#!/bin/bash

# Set vercel only env variable
# We set the env vars here and not via Vercel GUI, because we need these
# to be dynamic, based on the current vercel preview url.

export NEXT_PUBLIC_GRAPHQL_API=https://$NEXT_PUBLIC_VERCEL_URL/api/graphql
echo "NEXT_PUBLIC_GRAPHQL_API: $NEXT_PUBLIC_GRAPHQL_API"

export NEXT_PUBLIC_NYPL_DOMAIN=https://$NEXT_PUBLIC_VERCEL_URL
echo "NEXT_PUBLIC_NYPL_DOMAIN: $NEXT_PUBLIC_NYPL_DOMAIN"

echo NEXT_PUBLIC_ADOBE_LAUNCH_URL=https://assets.adobedtm.com/1a9376472d37/8519dfce636d/launch-bf8436264b01-development.min.js

# @TODO this would have use 
export NEXT_PUBLIC_ALLOWED_ORIGIN=https://$NEXT_PUBLIC_VERCEL_URL
echo "NEXT_PUBLIC_ALLOWED_ORIGIN: $NEXT_PUBLIC_ALLOWED_ORIGIN"

# Run build
npm run build