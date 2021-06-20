path_to_head(){
  sed -E 's@^'"${wd}"'/(.*)\.mcfunction$@\1@' <<EOM
$*
EOM
}

cd -P .
wd="${PWD}"
main() {
  find "${wd}" -type f -name "*.mcfunction" | while read -r; do
    replace &
  done
  wait
}

replace() {
  if [ ! -s "$REPLY" ]; then
    {
      printf "#"
      path_to_head "$REPLY"
    } > "$REPLY"
    return
  fi

  mtime=$(stat -c %Y "$REPLY")
  
  pathHead=$(path_to_head "$REPLY")
  
  fileHead=$(sed -nE '1s/^#(.*)/\1/p' "$REPLY")

  if [ "$pathHead" != "$fileHead" ]; then
    tmp=$(mktemp)
    cat "$REPLY" > "$tmp"
    sed -i "1s@^#.*@#${pathHead}@;1s@^[^#].*@#${pathHead}\n&@;1s@^\$@#${pathHead}@" "$tmp"
    nmtime=$(stat -c %Y "$REPLY")
    if [ "$mtime" = "$nmtime" ]; then
      cat "$tmp" > "$REPLY"
    else
      printf "文件“$REPLY”被修改，跳过\n"
    fi
    rm -f "$tmp"
    return
  fi
}

if [ "$1" ]; then
  while sleep "$1"; do
    main
  done
else
  main
fi
