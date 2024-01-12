// Get references to the HTML elements
let moon = document.getElementById('moon');
let mountain2 = document.getElementById('mountain2');
let mountain1 = document.getElementById('mountain1');
let base = document.getElementById('base');
let rightTree = document.getElementById('rightTree');
let leftTree = document.getElementById('leftTree');
let parallaxHeading = document.getElementById('parallax-heading');

// Add a scroll event listener to the window object
window.addEventListener('scroll', function () {
    // Get the current scroll position
    var scrollPosition = window.scrollY;

    // Log the scroll position for debugging purposes
    // console.log(scrollPosition);

    // Get a reference to the section2 element
    var section2 = document.getElementById('section2');

    // Calculate the translation value based on scroll position
    var translation = Math.max(-15, Math.min(120, 120 - (scrollPosition / (2 * window.innerHeight)) * 100));

    // Update the transform property of section2 element
    section2.style.transform = 'translate3d(0px, ' + translation + '%, 0px)';

    // Update the position and scale of the leftTree element based on scroll position
    leftTree.style.left = scrollPosition / -13 + 'px';
    leftTree.style.transform = 'scale(' + (1 + scrollPosition / 1600) + ')';

    // Update the scale of the base element based on scroll position
    base.style.transform = 'scale(' + (1 + scrollPosition / 2000) + ')';

    // Update the position of the moon element based on scroll position
    moon.style.transform = 'translateY(' + scrollPosition / 20 + 'px)';

    // Update the position of the rightTree element based on scroll position
    rightTree.style.left = scrollPosition * 0.09 + 'px';
    rightTree.style.bottom = scrollPosition * -0.05 + 'px';

    // Update the position of the mountain2 element based on scroll position
    mountain2.style.left = scrollPosition * 0.07 + 'px';
    mountain2.style.bottom = scrollPosition * 0.04 + 'px';

    // Update the scale and position of the mountain1 element based on scroll position
    mountain1.style.transform = 'scale(' + (1 + scrollPosition / 1611) + ')';
    mountain1.style.bottom = scrollPosition * -0.05 + 'px';

    // Update the font size of the parallaxHeading element based on scroll position
    var headerFont = 59 + scrollPosition * 0.0136;
    var finalHeaderFont = headerFont < 75? headerFont : 75;
    parallaxHeading.style.fontSize = finalHeaderFont + 'px';

    // Update the margin top of the parallaxHeading element based on scroll position
    if (scrollPosition > 800) {
        var headingTransform = ((scrollPosition - 800) * 0.301);
        var finalHeadingTransform = headingTransform < 160? headingTransform : 160;
        parallaxHeading.style.marginTop = '-' + finalHeadingTransform + 'px';
    } else {
        parallaxHeading.style.marginTop = 0;
    }
});



// for the background

(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    window.requestAnimationFrame = requestAnimationFrame;
})();

// Terrain stuff.
var background = document.getElementById("bgCanvas"),
    bgCtx = background.getContext("2d"),
    width = window.innerWidth,
    height = document.body.offsetHeight;

(height < 400) ? height = 400 : height;

background.width = width;
background.height = height;

function Terrain(options) {
    options = options || {};
    this.terrain = document.createElement("canvas");
    this.terCtx = this.terrain.getContext("2d");
    this.scrollDelay = options.scrollDelay || 90;
    this.lastScroll = new Date().getTime();

    this.terrain.width = width;
    this.terrain.height = height;
    this.fillStyle = options.fillStyle || "#191D4C";
    this.mHeight = options.mHeight || height;

    // generate
    this.points = [];

    var displacement = options.displacement || 140,
        power = Math.pow(2, Math.ceil(Math.log(width) / (Math.log(2))));

    // set the start height and end height for the terrain
    this.points[0] = this.mHeight;//(this.mHeight - (Math.random() * this.mHeight / 2)) - displacement;
    this.points[power] = this.points[0];

    // create the rest of the points
    for (var i = 1; i < power; i *= 2) {
        for (var j = (power / i) / 2; j < power; j += power / i) {
            this.points[j] = ((this.points[j - (power / i) / 2] + this.points[j + (power / i) / 2]) / 2) + Math.floor(Math.random() * -displacement + displacement);
        }
        displacement *= 0.6;
    }

    document.body.appendChild(this.terrain);
}

Terrain.prototype.update = function () {
    // draw the terrain
    this.terCtx.clearRect(0, 0, width, height);
    this.terCtx.fillStyle = this.fillStyle;
    
    if (new Date().getTime() > this.lastScroll + this.scrollDelay) {
        this.lastScroll = new Date().getTime();
        this.points.push(this.points.shift());
    }

    this.terCtx.beginPath();
    for (var i = 0; i <= width; i++) {
        if (i === 0) {
            this.terCtx.moveTo(0, this.points[0]);
        } else if (this.points[i] !== undefined) {
            this.terCtx.lineTo(i, this.points[i]);
        }
    }

    this.terCtx.lineTo(width, this.terrain.height);
    this.terCtx.lineTo(0, this.terrain.height);
    this.terCtx.lineTo(0, this.points[0]);
    this.terCtx.fill();
}


// Second canvas used for the stars
bgCtx.fillStyle = '#05004c';
bgCtx.fillRect(0, 0, width, height);

// stars
function Star(options) {
    this.size = Math.random() * 3;
    this.speed = Math.random() * .05;
    this.x = options.x;
    this.y = options.y;
}

Star.prototype.reset = function () {
    this.size = Math.random() * 2;
    this.speed = Math.random() * .05;
    this.x = width;
    this.y = Math.random() * height;
}

Star.prototype.update = function () {
    this.x -= this.speed;
    if (this.x < 0) {
        this.reset();
    } else {
        bgCtx.fillRect(this.x, this.y, this.size, this.size);
    }
}

function ShootingStar() {
    this.reset();
}

ShootingStar.prototype.reset = function () {
    this.x = Math.random() * width;
    this.y = 0;
    this.len = (Math.random() * 80) + 10;
    this.speed = (Math.random() * 10) + 6;
    this.size = (Math.random() * 1) + 0.1;
    // this is used so the shooting stars arent constant
    this.waitTime = new Date().getTime() + (Math.random() * 3000) + 500;
    this.active = false;
}

ShootingStar.prototype.update = function () {
    if (this.active) {
        this.x -= this.speed;
        this.y += this.speed;
        if (this.x < 0 || this.y >= height) {
            this.reset();
        } else {
            bgCtx.lineWidth = this.size;
            bgCtx.beginPath();
            bgCtx.moveTo(this.x, this.y);
            bgCtx.lineTo(this.x + this.len, this.y - this.len);
            bgCtx.stroke();
        }
    } else {
        if (this.waitTime < new Date().getTime()) {
            this.active = true;
        }
    }
}

var entities = [];

// init the stars
for (var i = 0; i < height; i++) {
    entities.push(new Star({
        x: Math.random() * width,
        y: Math.random() * height
    }));
}

// Add 2 shooting stars that just cycle.
entities.push(new ShootingStar());
entities.push(new ShootingStar());
// entities.push(new Terrain({mHeight : (height/2)-120}));
// entities.push(new Terrain({displacement : 120, scrollDelay : 50, fillStyle : "rgb(17,20,40)", mHeight : (height/2)-60}));
// entities.push(new Terrain({displacement : 100, scrollDelay : 20, fillStyle : "rgb(10,10,5)", mHeight : height/2}));

//animate background
function animate() {
    bgCtx.fillStyle = '#052E62';
    bgCtx.fillRect(0, 0, width, height);
    bgCtx.fillStyle = '#ffffff';
    bgCtx.strokeStyle = '#ffffff';

    var entLen = entities.length;

    while (entLen--) {
        entities[entLen].update();
    }
    requestAnimationFrame(animate);
}
animate();