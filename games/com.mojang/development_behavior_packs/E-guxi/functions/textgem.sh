while read -r
do
text+="${REPLY}"$'\n'
done
text=$(echo -n "$text" | sed 's/.*/§§&/g' |sed ':label;N;s/\n/\\n/;t label')
echo '{"rawtext":[{"translate":"'"$text"'"}]}'
