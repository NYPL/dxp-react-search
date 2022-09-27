#!/bin/bash

# @see https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == "qa" || "$VERCEL_GIT_COMMIT_REF" == "production"  ]] ; then
  # Don't build a preview.
  echo "🛑 - Skipping build for qa or production branch"
  exit 0;

else
  # Proceed with the build preview.
  echo "✅ - Build can proceed"
  exit 1;
fi