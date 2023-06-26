sumIndex(){
  # 如果有html文档
  # 结束
  if [[ -f index.html || -f index.htm ]]; then
    return
  fi
  {
    if [ -f _index_head.txt ]; then
      cat _index_head.txt
    fi
    cat <<EOM
# Index of ${prefix:-/}

EOM
    if [ -n "${prefix}" ]; then
      echo "[../](./../)  "
    fi
    for d in *; do
      if [ -d "${d}" ]; then
        (
          prefix="${prefix}/${d}"
          cd "${d}"
          eval "$FUNCNAME"
        )
        echo "[${d}/](./${d}/)  "
      fi
    done
    for f in *; do
      if [[ -f "${f}" && ${f:0:1} != "_" ]]; then
        t="${f##*.}"
        if [[ "$t" = md || "$t" = html || "$t" = htm ]]; then
          fi="${f%.*}"
          if [ "$fi" != index ]; then
            echo "[**${fi}**](./${fi})  "
          fi
        else
          echo "[${f}](./${f})  "
        fi
      fi
    done
    if [ -f _index_tail.txt ]; then
      cat _index_tail.txt
    fi
  } > index.md
}
find -type f -name index.md -delete
prefix=/yoni-mcscripts-lib
sumIndex
