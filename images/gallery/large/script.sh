a=0
for file in *.jpg
do
  convert -resize 10% "$file" "../small/$file"
  a=$((a+1))
done
