#!/bin/bash

API="http://localhost:4741"
URL_PATH="/practices"

# SKILL=SKILL_HERE TOKEN=TOKEN_HERE GOAL=5 STREAK_START="2022-01-11" LAST_PRACTICED="2022-01-15" sh curl-scripts/practice/create.sh

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "practice": {
      "minutesGoal": '"${GOAL}"',
      "streakStart": "'"${STREAK_START}"'",
      "lastPracticed": "'"${LAST_PRACTICED}"'",
      "skill": "'"${SKILL}"'"
    }
  }'

echo
