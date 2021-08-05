#!/bin/bash
text=""

maxHealth="$1"

num=0

numLow=0

numPower=1

numLowOp=0

while((num < maxHealth))
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

text+="{\"format_version\":\"1.10.0\",\"animation_controllers\":{"  
for((countAc = 0; countAc < numLow; countAc++))
do
  if [[ "$((countAc+1))" != numLow && "${countAc}" != 0 ]]; then
    text+=","
  fi
  text+="\"controller.animation.yoni.health.${countAc}\":{\"initial_state\":\"default\",\"states\":{"
  text+="\"default\": {\"transitions\": ["
  text+=$(text=""
    for((;numLow >= 1;numLow--))
    do
      text+="{\"raise${numPower}\":\"query.scoreboard('health') - query.health <= -${numPower}\"},{\"drop${numPower}\":\"query.scoreboard('health') - query.health >= ${numPower}\"}"
      if [[ ${numLow} != 1 ]]
      then
        text+=","
      fi
      let numPower/=2
    done
    echo "${text}],\"on_exit\":[\"/scoreboard objectives add health dummy\"]}"
  )
  text+=$(text=""
    for((;numLow >= 1;numLow--))
    do
      text+=",\"raise${numPower}\": {\"on_entry\": [\"/scoreboard players add @s health ${numPower}\"],\"transitions\": [{\"default\": \"(1.0)\"}]},\"drop${numPower}\": {\"on_entry\": [\"/scoreboard players add @s health -${numPower}\"],\"transitions\": [{\"default\": \"(1.0)\"}]}"
      let numPower/=2
    done
    echo "${text}"
  )
  text+="}}"
done
text+="}}"

echo "${text}" >health.json
