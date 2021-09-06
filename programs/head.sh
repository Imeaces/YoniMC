#!/bin/bash

main(){
  find . -type f -name "*.mcfunction" |
    awk '/^\.\/.+\.mcfunction$/' |
    while read -er; do
      head "${REPLY#*/}" &
    done
}

head(){
  local file="$1" content
  exec 3<"${file}"
  read -er <&3
  if [ "${REPLY:0:1}" = "#" ]; then
    if [ "${REPLY:1:${#REPLY}}" != "${file%.*}" ]; then
      content="#${file%.*}"$'\n'"$(cat <&3)"
      echo "${content}" > "${file}"
      echo "fix ${file}"
    fi
  else
    content="#${file%.*}"$'\n'"$(cat "${file}")"
    echo "${content}" > "${file}"
    echo "gem ${file}"
  fi
}

main
if [ $# != 0 ]; then
  while sleep "$@"; do
    main
  done
fi
