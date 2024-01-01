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
    console.log(scrollPosition);

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