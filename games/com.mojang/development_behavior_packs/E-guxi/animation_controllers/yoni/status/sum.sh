
printf '"on_entry":['
a=0
b=1
while ((a <= 19)); do
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
    if [ $a = 19 ]; then
    printf    '"variable.delta.20 = math.sqrt(math.pow(variable.position.delta.x, 2) + math.pow(variable.position.delta.y, 2) + math.pow(variable.position.delta.z, 2));"'
    fi
  fi
  let a++ b++
done
printf "]"