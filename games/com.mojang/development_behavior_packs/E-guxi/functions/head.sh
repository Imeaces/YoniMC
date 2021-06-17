path_to_head(){
  sed -E -e "s@^${wd}/(.*)@#\1@" -e 's/\.mcfunction$//' <<EOM
$path
EOM
}

wd=$(realpath "$(pwd)")
cd -P "$wd"
main() {
  find -type f -name "*.mcfunction" | while read -r; do
    replace &
  done
  wait
}

replace() {
  mtime=$(stat -c %Y "$REPLY")

  path=$(realpath "$REPLY")

  if [ -z "$(cat "$REPLY")" ]; then
    path_to_head >"$REPLY"
    return
  fi

  head=$(head -n 1 "$REPLY")
  
  fpath="${wd}/$(printf "$head" | sed -E 's/^#(.*)$/\1.mcfunction/')"
  
  if [ "$fpath" != "$path" ]; then
    nmtime=$(stat -c %Y "$REPLY")
    if [ "$mtime" != "$nmtime" ]; then
      printf "文件“$path”被修改，跳过\n"
      return
    fi

    tmp=$(mktemp)
    cat "$REPLY" > "$tmp"
    if [[ $head =~ ^#.* ]]; then
      sed -i '1d' "$tmp"
    fi
    path_to_head > "$REPLY"
    cat "$tmp" >> "$REPLY"
    rm -f "$tmp"
  fi
}

if [ "$1" ]; then
  while sleep "$1"; do
    main
  done
else
  main
fi
