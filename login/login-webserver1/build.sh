export PATH=$NODEJS_BIN_LATEST:$PATH

echo "node: $(node -v)"
echo "npm: v$(npm -v)"

npm install

if [ -d output ]; then
        rm -rf output
fi

mkdir output

cp -r config output
# cp -r data_import output
# cp -r download output
cp -r lib output
cp -r node_modules output
cp -r router output
cp -r util output
cp -r web output
cp app.js output
cp package-lock.json output
cp package.json output
cp pm2.conf.json output
