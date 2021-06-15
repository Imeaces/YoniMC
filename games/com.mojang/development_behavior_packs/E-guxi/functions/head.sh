path_to_head(){
  sed -E -e "s@^${wd}/(.*)@#\1@" -e 's/\.mcfunction$//' <<EOM
$path
EOM
}

wd=$(realpath "$(pwd)")
cd -P "$wd"
main(){
  find -type f -name "*.mcfunction" | while read -r; do
    replace &
  done
}

replace(){
  head=$(head -n 1 "$REPLY")
  path=$(realpath "$REPLY")
  fpath="${wd}/$(printf "$head"|sed -E 's/^#(.*)$/\1.mcfunction/')"
  if [ -z "$(cat "$REPLY")" ]; then
    path_to_head > "$REPLY"
  elif [ "$fpath" != "$path" ]; then
    tmp=`mktemp`
    path_to_head > "$tmp"
    if [[ $head =~ ^#.* ]]; then
      sed -i '1d' "$REPLY"
    fi
    cat "$REPLY" >> "$tmp"
    cat "$tmp" > "$REPLY"
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