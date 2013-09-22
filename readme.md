## An even better requestAnimationFrame

- fixed ios6 issues upgrading to the native implementation if it works (no agent sniffing)
- like the native implementation it will group callbacks for better performance
- like the native implementation it will degrade the frame rate depending on device performance
- you can define your own frame rate specifically for every animation
- highly optimized for performance
- can be used as a shim, but has an own namespace per default

## Usage

### Get the api

If you are inside of a commonjs/amd module:

    var AnimationFrame = require('AnimationFrame');

Otherwise its defined on window:

    var AnimationFrame = window.AnimationFrame;

### Activate the shim

It will replace native implementation if it does exist but still will use it if possible.
So you can use `window.requestAnimationframe` and `window.cancelAnimationFrame` after this  safely.

    new AnimationFrame().shim();

### Request frame

    // Using default frame rate
    var animationFrame = new AnimationFrame();

    // Using custom frame rate, frame rates higher 60hz are not supported.
    var animationFrame = new AnimationFrame(20);

    var frameId = animationFrame.request(function(time) {
        // Your animation here.
    });

### Cancel frame

    var animationFrame = new AnimationFrame();
    animationFrame.cancel(frameId);

### Custom default frame rate

There are devices with different refresh rate than 60 out of there. You can define a custom value, for the shim implementation. Native implementation should do it for you.
Do it before requesting frames, because after that the frame length is cached.

    AnimationFrame.FRAME_RATE = 30;

## Credits

http://paulirish.com/2011/requestanimationframe-for-smart-animating

http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

https://gist.github.com/paulirish/1579671

https://gist.github.com/jonasfj/4438815

https://gist.github.com/KrofDrakula/5318048

## License

MIT
