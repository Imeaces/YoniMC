path_to_head(){
  echo "$*" | sed -E 's@^'"${wd}"'/(.*)\.mcfunction$@\1@'
}

cd -P .
wd="${PWD}"
main() {
  find "${wd}" -type f -name "*.mcfunction" | while read -r file; do
    replace &
  done
  wait
}

replace() {
  # 如果文件为空
  if [ ! -s "$file" ]; then
    {
      printf "#"
      path_to_head "$file"
    } > "$file"
    return
  fi

  mtime=$(stat -c %Y "$file")
  
  pathHead=$(path_to_head "$file")
  
  fileHead=$(sed -nE '1s/^#(.*)/\1/p' "$file")

  if [ "$pathHead" != "$fileHead" ]; then
    tmp=$(mktemp)
    cat "$file" > "$tmp"
    sed -i "1s@^#.*@#${pathHead}@;1s@^[^#].*@#${pathHead}\n&@;1s@^\$@#${pathHead}@" "$tmp"
    nmtime=$(stat -c %Y "$file")
    if [ "$mtime" = "$nmtime" ]; then
      cat "$tmp" > "$file"
    else
      printf "文件“$file”被修改，跳过\n" >&2
    fi
    rm -f "$tmp"
    printf "文件“$file”已修复\n"
    return
  fi
}

if [ "$1" ]; then
  main
  while sleep "$1"; do
    main
  done
else
  main
fi
