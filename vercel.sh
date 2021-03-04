#!/bin/bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == "qa" || "$VERCEL_GIT_COMMIT_REF" == "production"  ]] ; then
  # Don't build
  echo "🛑 - Skipping build for qa or production branch"
  exit 0;

else
  # Proceed with the build
  echo "✅ - Build can proceed"
  exit 1;
fi