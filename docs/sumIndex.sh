sumIndex(){
  if [[ -f index.html || -f index.htm ]]; then
    return
  fi
  {
    cat <<EOM
# Index of $1

EOM
    if [ -n "$1"  ]; then
      echo "[../](./../)  "
    fi
    for d in *; do
      if [ -d "$d" ]; then
        (
          cd "$d"
          eval "$FUNCNAME" '"${1}/${d}"'
        )
        echo "[$d/](./$d/)  "
      fi
    done
    for f in *; do
      if [ -f "$f" ]; then
        t="${f##*.}"
        if [[ "$t" = md || "$t" = html || "$t" = htm ]]; then
          fi="${f%.*}"
          if [ "$fi" != index ]; then
            echo "[${fi}](./${fi})  "
          fi
        else
          echo "[$f](./$f)  "
        fi
      fi
    done
    if [ -f index_attach.txt ]; then
      cat index_attach.txt
    fi
  } > index.md
}
cd "$(git rev-parse --show-toplevel)/docs"
sumIndex 
