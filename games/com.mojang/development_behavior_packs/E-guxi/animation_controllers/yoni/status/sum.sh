on_entry=$(
  printf '"on_entry":['
  a=0
  b=1
  max=20
  while ((a <= $((--max)))); do
    if [ $a = 0 ]; then
      cat <<'EOM'
    "v.position.old.x = v.position.x ?? query.position(0);",
    "v.position.old.y = v.position.y ?? query.position(1);",
    "v.position.old.z = v.position.z ?? query.position(2);",
    "v.position.x = query.position(0);",
    "v.position.y = query.position(1);",
    "v.position.z = query.position(2);",
    "v.position.delta.x = (v.position.old.x - v.position.x);",
    "v.position.delta.y = (v.position.old.y - v.position.y);",
    "v.position.delta.z = (v.position.old.z - v.position.z);",
EOM
    else
      printf '"variable.delta.'
      printf "$a"
      printf " = "
      printf "variable.delta."
      printf $b';'
      printf '",\n'
      if [ $a = $((--max)) ]; then
        printf '"variable.delta.20 = math.sqrt(math.pow(variable.position.delta.x, 2) + math.pow(variable.position.delta.y, 2) + math.pow(variable.position.delta.z, 2));",\n'
        printf '  "v.moving_speed = ((v.delta.1 + v.delta.2 + v.delta.3 + v.delta.4 + v.delta.5 + v.delta.6 + v.delta.7 + v.delta.8 + v.delta.9 + v.delta.10 + v.delta.11 + v.delta.12 + v.delta.13 + v.delta.14 + v.delta.15 + v.delta.16 + v.delta.17 + v.delta.18 + v.delta.19 + v.delta.20)/ 20);"'
      fi
    fi
    let a++ b++
  done
  printf "]"
)
echo "$on_entry"