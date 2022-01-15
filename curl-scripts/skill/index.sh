#!/bin/sh

API="http://localhost:4741"
URL_PATH="/skills"

# TOKEN=TOKEN_HERE sh curl-scripts/skill/index.sh

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
