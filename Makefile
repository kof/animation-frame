
build:
	./node_modules/.bin/uglifyjs < ./AnimationFrame.js > ./AnimationFrame.min.js --comments license


.PHONY: build
