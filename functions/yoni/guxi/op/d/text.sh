while true; do
	unset text
	while read -r; do
		text+="${REPLY}"$'\n'
	done
	text=$(echo -n "$text" | sed 's/.*/§咕&/g' |sed ':label;N;s/\n/\\n/;t label')
	clear
	echo '{"rawtext":[{"translate":"'"$text"'"}]}'
done
