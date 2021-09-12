form(){
  unset text code
  l=1
  while true; do
    if [ -n "${code}" ]; then
      lcode="${code}"
    fi
    read -r
    code=$?
    if [[ ${lcode} = 0 && ${code} = 0 ]]; then
      text+=\\n
    elif [ "${l}" = 1 ]; then
      text+=\\n
      l=0
    fi
    if [ "${code}" = 0 ]; then
      text+="§r§l${REPLY}"
    else
      echo "{\"rawtext\":[{\"text\":\"${text}\"}]}"
      return
    fi
  done
}
while true; do
  form
done