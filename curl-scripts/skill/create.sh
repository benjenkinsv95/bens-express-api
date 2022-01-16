#!/bin/bash

API="http://localhost:4741"
URL_PATH="/skills"

# TOKEN=TOKEN_HERE NAME="Duolingo Latin" DESC="Practice Latin on Duolingo" PUBLIC=true REVIEW_URL="https://docs.google.com/document/d/1SJ2Ke625vsrdKOD8t9KflyZo1DVpemcH1nsA8jWJCaw/edit?usp=sharing" PRACTICE_URL="https://www.duolingo.com/learn" sh curl-scripts/skill/create.sh

# TOKEN=TOKEN_HERE NAME="Personal Retrospective" DESC="Review progress towards goals" PUBLIC=false REVIEW_URL="https://docs.google.com/forms/d/1jz6gHEX0IftilImDibqQgDrEEi3zAPSJVwdvwQKOm0U/edit" PRACTICE_URL="https://forms.gle/CRm6PmjHzTScan1H9" sh curl-scripts/skill/create.sh

# TOKEN=TOKEN_HERE NAME="Dance" DESC="Practice Dancing" PUBLIC=true REVIEW_URL="https://www.youtube.com/playlist?list=PLB9CAA2877007AC02" PRACTICE_URL="https://www.youtube.com/watch?v=AOz68KT3huI&list=PLB9CAA2877007AC02&index=31" sh curl-scripts/skill/create.sh

# TOKEN=TOKEN_HERE NAME="Gratitude Journal" DESC="Practice being grateful" PUBLIC=true REVIEW_URL="https://www.youtube.com/watch?v=WPPPFqsECz0" PRACTICE_URL="https://drive.google.com/drive/u/0/folders/1L_pVQ6Xmr86hsRwf8SMxdPX5iipq7se0" sh curl-scripts/skill/create.sh

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
