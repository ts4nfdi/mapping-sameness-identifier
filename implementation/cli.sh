#!/bin/bash
export LANG=C.UTF-8

read -r s p o n <<<$(jq -r '[
    (.subjects|sort|join("|")),
    .predicate,
    (.objects|sort|join("|")),
    (if .negative then "~" else "" end)
  ]|join(" ")')

digest=$(echo -n "$s $p $o" | sha256sum | cut -f1 -d' ') 
base64=$(echo $digest | xxd -r -p | basenc --base64url | tr -d =)

echo "mapping:$n$base64"
