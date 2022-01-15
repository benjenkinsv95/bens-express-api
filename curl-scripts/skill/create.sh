#!/bin/bash

API="http://localhost:4741"
URL_PATH="/skills"

# TOKEN=TOKEN_HERE NAME="Duolingo Latin" DESC="Practice Latin on Duolingo" PUBLIC=true REVIEW_URL="https://docs.google.com/document/d/1SJ2Ke625vsrdKOD8t9KflyZo1DVpemcH1nsA8jWJCaw/edit?usp=sharing" PRACTICE_URL="https://www.duolingo.com/learn" sh curl-scripts/skill/create.sh

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "skill": {
      "name": "'"${NAME}"'",
      "description": "'"${DESC}"'",
      "reviewUrl": "'"${REVIEW_URL}"'",
      "practiceUrl": "'"${PRACTICE_URL}"'",
      "public": '"${PUBLIC}"'
    }
  }'

echo
