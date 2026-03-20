#!/bin/bash
export LANG=C.UTF-8

read -r s p o neg <<<$(jq -r '[
    (.subjects|sort|join("|")),
    .predicate,
    (.objects|sort|join("|")),
    (if .negativity then "~" else "" end)
  ]|join(" ")')

digest=$(echo -n "$s $p $o" | sha256sum | cut -f1 -d' ') 
echo "mapping:$digest$neg"
