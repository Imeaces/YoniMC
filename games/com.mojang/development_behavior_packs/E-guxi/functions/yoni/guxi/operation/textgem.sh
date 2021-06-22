while read -r
do
text+="§§${REPLY}\\n"
done
echo -n '{"rawtext":[{"translate":"'
echo "${text}"|sed -n 's/\n$'
