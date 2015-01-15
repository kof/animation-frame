
build:
	node_modules/.bin/browserify -e ./index.js -o ./AnimationFrame.js -s AnimationFrame

	./node_modules/.bin/uglifyjs < ./AnimationFrame.js > ./AnimationFrame.min.js --comments license
	xpkg .


.PHONY: build
