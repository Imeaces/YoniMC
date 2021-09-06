#!/bin/bash
AcDichotomy(){
  local max="$1"
  local objective="$2"
  local query
  if [ -n "$3" ]; then
    query="$3"
  else
    query="query.${objective}"
  fi
  local text="{\"format_version\":\"1.10.0\",\"animation_controllers\":{"
  local num=0
  local numLow=0
  local numPower=1
  local numLowOp=0
  while((num < max)); do
    let numLow++
    if [ "${numLowOp}" = 1 ]; then
      let numPower*=2
    else
      let numLowOp=1
    fi
    let num+=numPower
  done
  local countAc
  for((countAc = 0; countAc < numLow; countAc++)); do
    if [[ "${countAc}" != 0 ]]; then
      text+=","
    fi
    text+="\"controller.animation.yoni.${objective}.${countAc}\":{\"initial_state\":\"default\",\"states\":{\"default\":{\"transitions\":["
    AcDichotomyDefaultState "${numLow}" "${numPower}"
    AcDichotomyOtherStates "${numLow}" "${numPower}"
    text+="}}"
  done
  text+="}}"
  echo "${text}"
}
AcDichotomyOtherStates(){
  local stext="" numLow="$1" numPower="$2"
  for((;numLow >= 1;numLow--)); do
    stext+=",\"raise${numPower}\":{\"on_entry\":[\"/scoreboard players add @s ${objective} ${numPower}\"],\"transitions\":[{\"default\":\"(1.0)\"}]},\"drop${numPower}\":{\"on_entry\":[\"/scoreboard players add @s ${objective} -${numPower}\"],\"transitions\":[{\"default\":\"(1.0)\"}]}"
    let numPower/=2
  done
  text+="${stext}"
  
}

AcDichotomyDefaultState(){
  local dtext="" numLow="$1" numPower="$2"
  for((;numLow >= 1;numLow--)); do
    dtext+="{\"raise${numPower}\":\"query.scoreboard('${objective}') - ${query} <= -${numPower}\"},{\"drop${numPower}\":\"query.scoreboard('${objective}') - ${query} >= ${numPower}\"}"
    if [[ ${numLow} != 1 ]]; then
      dtext+=","
    fi
    let numPower/=2
  done
  text+="${dtext}],\"on_exit\":[\"/scoreboard objectives add health dummy\"]}"
}

show_usage(){
  echo "帮助还没写"
}

file_save(){
  local fileName
  if [ -n "$2" ]; then
    fileName="$2"
  else
    fileName="$3"
  fi
  if [ -e "${fileName}" ]; then
    echo "存在同名文件: ${fileName}"
    echo "你需要指定一个不存在的文件以保存内容"
  else
    echo "$1" > "${fileName}" &&
      {
        echo "内容已保存到${fileName}" 
        return 0
      } ||
      {
        echo "内容保存到${fileName}时出现错误"
        return 1
      }
  fi
  while read -er; do
    fileName="$REPLY"
    if [ -e "${fileName}" ]; then
      echo "存在同名文件: ${fileName}"
      echo "你需要指定一个不存在的文件以保存内容"
      continue
    else
      echo "$1" > "${fileName}" &&
        {
          echo "内容已保存到${fileName}" 
          return 0
        } ||
        {
          echo "内容保存到${fileName}时出现错误"
          return 1
        }
    fi
  done  
}

case "$1" in
  --help)show_usage;;
  help)show_usage;;
  -h)show_usage;;
  data)case "$2" in
    get)case "$3" in
      health)file_save "$(AcDichotomy "$4" "${5:-health}" "$6")" "$7" health.json;;
      max_health)file_save "$(AcDichotomy "$4" "${5:-max_health}" "$6")" "$7" max_health.json;;
    esac;;
  esac;;
  *)show_usage;;
esac