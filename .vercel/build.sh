#!/bin/bash

# Set vercel only env variable
# We set the env vars here and not via Vercel GUI, because we need these
# to be dynamic, based on the current vercel preview url.

# This is the clean url for the preview enviornment, that won't change for each deployment. 
#NEXT_PUBLIC_VERCEL_DOMAIN=scout-git-$NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF-nypl.vercel.app

export NEXT_PUBLIC_GRAPHQL_API=https://$NEXT_PUBLIC_VERCEL_URL/api/graphql
echo "NEXT_PUBLIC_GRAPHQL_API: $NEXT_PUBLIC_GRAPHQL_API"

export NEXT_PUBLIC_NYPL_DOMAIN=https://$NEXT_PUBLIC_VERCEL_URL
echo "NEXT_PUBLIC_NYPL_DOMAIN: $NEXT_PUBLIC_NYPL_DOMAIN"

# @TODO this would have use 
export NEXT_PUBLIC_ALLOWED_ORIGIN=https://$NEXT_PUBLIC_VERCEL_URL
echo "NEXT_PUBLIC_ALLOWED_ORIGIN: $NEXT_PUBLIC_ALLOWED_ORIGIN"

# Run build
npm run build