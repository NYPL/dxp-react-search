#!/bin/bash

# Set vercel only env variable
export NEXT_PUBLIC_GRAPHQL_API=https://$NEXT_PUBLIC_VERCEL_URL/api/graphql
echo "NEXT_PUBLIC_GRAPHQL_API: $NEXT_PUBLIC_GRAPHQL_API"

# Run build
npm run build