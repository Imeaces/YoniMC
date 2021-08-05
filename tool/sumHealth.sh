#!/bin/bash
text=""
maxHealth="$1"
num=0
numLow=0
numPower=1
numLowOp=0
for((;num<maxHealth;))
do
  let numLow++
  if [ "${numLowOp}" = 1 ]
  then
    let numPower*=2
  else
    let numLowOp=1
  fi
  let num+=numPower
done

main(){(
  file_head
  
  for((countAc = 0; countAc < numLow; countAc++))
  do
    if [[ "$((countAc+1))" != numLow && "${countAc}" != 0 ]]; then
      echo ','
    fi
    ac_head
    
    # default state sum
    (ac_st_de_head
    for((;numLow >= 1;numLow--))
    do
      ac_de_tr
      if [[ ${numLow} != 1 ]]
      then
        echo ','
      fi
      let numPower/=2
    done
    ac_st_de_tail)
    
    # states sum
    (for((;numLow >= 1;numLow--))
    do
      ac_st
      let numPower/=2
    done)

    ac_tail
  done

  file_tail
) | jq > health.json; }

ac_st(){
cat <<EOM
,
        "raise${numPower}": {
          "on_entry": [
            "/scoreboard players add @s health ${numPower}"
          ],
          "transitions": [
            {
              "default": "(1.0)"
            }
          ]
        },
        "drop${numPower}": {
          "on_entry": [
            "/scoreboard players add @s health -${numPower}"
          ],
          "transitions": [
            {
              "default": "(1.0)"
            }
          ]
        }
EOM
}

file_head(){
  cat <<EOM
{
  "format_version": "1.10.0",
  "animation_controllers": {
EOM
}

file_tail(){
  cat <<EOM
  }
}
EOM
}

ac_head(){
  cat <<EOM
    "controller.animation.yoni.health.$countAc": {
      "initial_state": "default",
      "states": {
EOM
}
ac_tail(){
  cat <<EOM
      }
    }
EOM
}

ac_st_de_head(){
  cat <<EOM
        "default": {
          "transitions": [
EOM
}
ac_st_de_tail(){
  cat <<EOM
          ],
          "on_exit": [ "/scoreboard objectives add health dummy" ]
        }
EOM
}
ac_de_tr(){
  cat <<EOM
            {
              "raise${numPower}": "query.scoreboard('health') - query.health <= -${numPower}"
            },
            {
              "drop${numPower}": "query.scoreboard('health') - query.health >= ${numPower}"
            }
EOM
}

main

