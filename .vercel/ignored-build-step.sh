#!/bin/bash

# @see https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == "sandbox" || "$VERCEL_GIT_COMMIT_REF" == "development" || "$VERCEL_GIT_COMMIT_REF" == "qa" || "$VERCEL_GIT_COMMIT_REF" == "production"  ]] ; then
  # Don't build a preview.
  echo "🛑 - Skipping build: sandbox, development, qa, or production branch detected."
  exit 0;

else
  # Proceed with the build preview.
  echo "✅ - Build can proceed"
  exit 1;
fi