#!/bin/sh

API="http://localhost:4741/skill-tracker"
URL_PATH="/examples"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
