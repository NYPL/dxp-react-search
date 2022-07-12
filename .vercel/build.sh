#!/bin/bash

# Set vercel only env variable
# We set the env vars here and not via Vercel GUI, because we need to use "system env vars"
export NEXT_PUBLIC_GRAPHQL_API=https://$NEXT_PUBLIC_VERCEL_URL/api/graphql
echo "NEXT_PUBLIC_GRAPHQL_API: $NEXT_PUBLIC_GRAPHQL_API"

export NEXT_PUBLIC_NYPL_DOMAIN=https://$NEXT_PUBLIC_VERCEL_URL
echo "NEXT_PUBLIC_NYPL_DOMAIN: $NEXT_PUBLIC_NYPL_DOMAIN"

# Run build
npm run build