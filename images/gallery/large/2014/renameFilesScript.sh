a=24
for file in *.jpg
do
  mv "$file" "$a.jpg"
  a=$((a+1))
done
