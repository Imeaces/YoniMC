while read -r
do
if [ -z "$REPLY" ];then
printf 
break
fi
text+="$REPLY"
done
