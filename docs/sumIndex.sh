sumIndex(){
  if [ -z "$prefix" ]; then
    prefix="/"
  elif [ "$prefix" = / ]; then
    prefix="/${d}"
  else
    prefix="${prefix}/${d}"
  fi
  if [[ -f index.html || -f index.htm ]]; then
    return
  fi

  {

    cat <<EOM
# Index of $prefix

EOM

    if [ "$prefix" != / ]; then
      echo "[../](./../)  "
    fi

    for d in *; do
      if [ -d "${d}" ]; then
        (
          cd "${d}"
          eval "$FUNCNAME"
        )
        echo "[${d}/](./${d}/)  "
      fi
    done

    for f in *; do
      if [ -f "${f}" ]; then
        t="${f##*.}"
        if [[ "$t" = md || "$t" = html || "$t" = htm ]]; then
          fi="${f%.*}"
          if [ "$fi" != index ]; then
            echo "[${fi}](./${fi})  "
          fi
        else
          echo "[${f}](./${f})  "
        fi
      fi
    done

    if [ -f _index.txt ]; then
      cat _index.txt
    fi
  } > index.md
}

sumIndex
