
build:
	./node_modules/.bin/uglifyjs < ./AnimationFrame.js > ./AnimationFrame.min.js --comments license
	xpkg .


.PHONY: build
