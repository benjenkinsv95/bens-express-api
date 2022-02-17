#!/bin/sh

API="http://localhost:4741/skill-tracker"
URL_PATH="/practices"

# TOKEN=TOKEN_HERE sh curl-scripts/practice/index.sh

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
