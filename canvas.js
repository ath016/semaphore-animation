/* VARIABLES **************************************************** */

// canvas setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const semaphore = new Semaphore(0, 0, 100);

// interval
let string = ' thy is awesome'
let random = false;
let randomString = '';
let frame = 0;
let duration = 2000
let refresh = 60;

let display = true;

/* OBJECT ******************************************************* */

function Semaphore(x, y, size) {
	// properties
	this.x = x;
	this.y = y;
	this.size = size;
	this.rl = 0;
	this.rr = 0;
	this.trl = 0;
	this.trr = 0;
	this.rend = true;
	this.letter = ' ';
	this.flicker = 0;
	
	// set letter
	this.set = function(c) {
		const alpha = [
			'a','b','c','d','e',
			'f','g','h','i','j',
			'k','l','m','n','o',
			'p','q','r','s','t',
			'u','v','w','x','y',
			'z',' '
		];
		const left = [
			1,2,3,4,0,
			0,0,2,3,4,
			1,1,1,1,3,
			2,2,2,2,3,
			3,4,6,7,3,
			7,0
		];
		const right = [
			0,0,0,0,5,
			6,7,1,1,6,
			4,5,6,7,2,
			4,5,6,7,4,
			5,7,5,5,6,
			6,0
		];
		
		const render = [
			1,1,1,1,1,
			1,1,1,1,1,
			1,1,1,1,1,
			1,1,1,1,1,
			1,1,0,1,1,
			1,1
		];
		
		// not found check
		if(alpha.indexOf(c) == -1) c = ' ';
		
		// flicker
		if(c == this.letter && c != ' ') {
			this.flicker = 7;
		} // end of if
		else {
			this.flicker = 0;
		} // end of else
		
		// update letter
		this.letter = c;
		
		// set target
		this.trl = Math.PI * left[alpha.indexOf(c)] / 4;
		this.trr = Math.PI * right[alpha.indexOf(c)] / 4;
		this.rend = render[alpha.indexOf(c)];
	} // end of set
	
	// flip left flag
	this.flipL = function(r) {
		return (Math.sin(r) >= 0 && r < Math.PI)? 1: -1;
	} // end of flip r
	
	// flip right flag
	this.flipR = function(r) {
		return (Math.sin(r) > 0)? 1: -1;
	} // end of flip r
	
	// draw left arm
	this.drawL = function() {
		// rotate
		c.rotate(this.rl);
		ret = rotate(
			this.x + this.size * 37 / 96,
			this.y + this.size * 43 / 96,
			-this.rl
		);
		
		// left arm
		c.roundRect(
			ret.x - this.size * 3 / 96,
			ret.y - this.size * 3 / 96,
			this.size * 3 / 48, this.size / 4, this.size / 48
		);
		c.fill();
		c.stroke();
		
		// left flag
		c.fillStyle = 'red';
		c.beginPath();
		c.moveTo(
			ret.x + this.flipL(this.rl) * this.size / 96,
			ret.y + this.size * 37 / 96);
		c.lineTo(
			ret.x + this.flipL(this.rl) * this.size / 96,
			ret.y + this.size * 21 / 96);
		c.lineTo(
			ret.x + this.flipL(this.rl) * this.size * 17 / 96,
			ret.y + this.size * 37 / 96);
		c.lineTo(
			ret.x + this.flipL(this.rl) * this.size / 96,
			ret.y + this.size * 37 / 96);
		c.fill();
		c.stroke();
		
		c.fillStyle = 'white';
		c.beginPath();
		c.moveTo(
			ret.x + this.flipL(this.rl) * this.size * 17 / 96,
			ret.y + this.size * 21 / 96);
		c.lineTo(
			ret.x + this.flipL(this.rl) * this.size / 96,
			ret.y + this.size * 21 / 96);
		c.lineTo(
			ret.x + this.flipL(this.rl) * this.size * 17 / 96,
			ret.y + this.size * 37 / 96);
		c.lineTo(
			ret.x + this.flipL(this.rl) * this.size * 17 / 96,
			ret.y + this.size * 21 / 96);
		c.fill();
		c.stroke();
		
		// left stick
		c.beginPath();
		c.rect(
			ret.x - this.size / 96,
			ret.y + this.size * 21 / 96,
			this.size / 48, this.size / 6
		);
		c.fill();
		c.stroke();
		
		// fix rotate
		c.rotate(-this.rl);
	} // end of draw left arm
	
	// draw right arm
	this.drawR = function() {
		// rotate
		c.rotate(this.rr);
		ret = rotate(
			this.x + this.size * 59 / 96,
			this.y + this.size * 43 / 96,
			-this.rr
		);
		
		// right arm
		c.roundRect(
			ret.x - this.size * 3 / 96,
			ret.y - this.size * 3 / 96,
			this.size * 3 / 48, this.size / 4, this.size / 48
		);
		c.fill();
		c.stroke();
		
		// right flag
		c.fillStyle = 'red';
		c.beginPath();
		c.moveTo(
			ret.x + this.flipR(this.rr) * this.size / 96,
			ret.y + this.size * 37 / 96);
		c.lineTo(
			ret.x + this.flipR(this.rr) * this.size / 96,
			ret.y + this.size * 21 / 96);
		c.lineTo(
			ret.x + this.flipR(this.rr) * this.size * 17 / 96,
			ret.y + this.size * 37 / 96);
		c.lineTo(
			ret.x + this.flipR(this.rr) * this.size / 96,
			ret.y + this.size * 37 / 96);
		c.fill();
		c.stroke();
		
		c.fillStyle = 'white';
		c.beginPath();
		c.moveTo(
			ret.x + this.flipR(this.rr) * this.size * 17 / 96,
			ret.y + this.size * 21 / 96);
		c.lineTo(
			ret.x + this.flipR(this.rr) * this.size / 96,
			ret.y + this.size * 21 / 96);
		c.lineTo(
			ret.x + this.flipR(this.rr) * this.size * 17 / 96,
			ret.y + this.size * 37 / 96);
		c.lineTo(
			ret.x + this.flipR(this.rr) * this.size * 17 / 96,
			ret.y + this.size * 21 / 96);
		c.fill();
		c.stroke();
		
		// right stick
		c.beginPath();
		c.rect(
			ret.x - this.size / 96,
			ret.y + this.size * 21 / 96,
			this.size / 48, this.size / 6
		);
		c.fill();
		c.stroke();
		
		// fix rotation
		c.rotate(-this.rr);
	} // end of draw right arm
	
	// draw object
	this.draw = function() {
		let ret = undefined;
		
		// set default
		c.fillStyle = 'white';
		c.strokeStyle = 'black';
		
		// head
		c.beginPath();
		c.arc(
			this.x + this.size / 2,
			this.y + this.size / 3,
			this.size / 12, 0, 2 * Math.PI
		);
		c.fill();
		c.stroke();
		
		// body
		c.roundRect(
			this.x + this.size * 5 / 12,
			this.y + this.size * 5 / 12,
			this.size / 6, this.size / 4, this.size / 24
		);
		c.fill();
		c.stroke();
		
		// left leg
		c.roundRect(
			this.x + this.size * 21 / 48,
			this.y + this.size * 2 / 3,
			this.size * 3 / 48, this.size / 4, this.size / 48
		);
		c.fill();
		c.stroke();
		
		// right leg
		c.roundRect(
			this.x + this.size * 24 / 48,
			this.y + this.size * 2 / 3,
			this.size * 3 / 48, this.size / 4, this.size / 48
		);
		c.fill();
		c.stroke();
		
		// arm
		(this.rend)? this.drawL(): this.drawR();
		(this.rend)? this.drawR(): this.drawL();
	} // end of draw object
	
	// update
	this.update = function(move) {
		const twoPI = Math.PI * 2;
		move /= 2;
		
		if(((this.trr - this.rr + twoPI) % (twoPI)) < 0.1 ||
			(twoPI - 0.1) < ((this.trr - this.rr + twoPI) % (twoPI)))
			 this.rr = this.trr;
		else {
			if(((this.trr - this.rr + twoPI) % (twoPI)) < Math.PI)
				this.rr = (this.rr + Math.PI / move) % (twoPI);
			else
				this.rr = (this.rr + Math.PI * (2*move-1) / move) % (twoPI);
		} // end of else
		
		if(((this.trl - this.rl + twoPI) % (twoPI)) < 0.1 ||
			(twoPI - 0.1) < ((this.trl - this.rl + twoPI) % (twoPI)))
			 this.rl = this.trl;
		else {
			if(((this.trl - this.rl + twoPI) % (twoPI)) < Math.PI)
				this.rl = (this.rl + Math.PI / move) % (twoPI);
			else
				this.rl = (this.rl + Math.PI * (2*move-1) / move) % (twoPI);
		} // end of else
		
		// flicker
		if(this.flicker % 2 == 1) {
			this.rr = (this.rr + Math.PI / move) % (twoPI);
			this.rl = (this.rl + Math.PI / move) % (twoPI);
		} // end of if
		
		if(this.flicker > 0) this.flicker--;
	} // end of update;
	
	// resize
	this.resize = function(x, y, size) {
		this.x = x;
		this.y = y;
		this.size = size;
	} // end of resize
} // end of item class */


/* FUNCTIONS **************************************************** */

// set random string
function setRandomString() {
	let alpha = [
		'a','b','c','d','e','f','g','h','i','j',
		'k','l','m','n','o','p','q','r','s','t',
		'u','v','w','x','y','z'
	];

	// empty random string
	randomString = '';

	// fill random string
	while(alpha.length) {
		randomString += alpha.splice(Math.floor(Math.random() * alpha.length), 1)[0];
	} // end of while
} // end of set random string

// initiation
function init() {
	// set canvas dimension
	canvas.width = window.innerWidth - 1;
	canvas.height = window.innerHeight - document.getElementById('menu').clientHeight - 1;
	
	const min = Math.min(canvas.width, canvas.height);
	
	semaphore.resize(canvas.width / 2 - min / 2, 0, min);

	let search = location.href.split('?')[1];

	if(search) search = search.split('#')[0];
	if(search) {
		search = search.split('&')
			.map((x) => x.split('='))
			.reduce((t,s) => {
				t.set(s[0], s[1]);
				return t;
			}, new Map())
	} // end of if
	if(search && search.has('m')) {
		document.getElementById('text').value = decodeURIComponent(search.get('m'));
		handleChange();
	} // end of if
} // end of init

// animation function
function animate() {
	// call animation
	requestAnimationFrame(animate);
	
	// clear screen
	c.clearRect(0, 0, canvas.width, canvas.height);
	
	// draw background
	c.fillStyle = 'black';
	c.fillRect(0, 0, canvas.width, canvas.height);
	
	// draw semaphore
	semaphore.draw();
} // end of animate

function rotate(x, y, r) {
	let xp = x * Math.cos(r) - y * Math.sin(r);
	let yp = x * Math.sin(r) + y * Math.cos(r);
	return {x:xp, y:yp};
} // end of rotate

c.roundRect = function(x, y, width, height, radius) {
  this.beginPath();
  this.moveTo(x, y + radius);
  this.lineTo(x, y + height - radius);
  this.arcTo(x, y + height, x + radius, y + height, radius);
  this.lineTo(x + width - radius, y + height);
  this.arcTo(x + width, y + height, x + width, y + height-radius, radius);
  this.lineTo(x + width, y + radius);
  this.arcTo(x + width, y, x + width - radius, y, radius);
  this.lineTo(x + radius, y);
  this.arcTo(x, y, x, y + radius, radius);
} // end of rounded rectangle

/* EVENT ******************************************************** */

// interal
let interval = setInterval(function() {
	// step
	const step = refresh * duration / 1000;

	// set random letter
	if(frame % step == 0 && random) {
		semaphore.set(randomString[(frame / step) % randomString.length]);
	} // end of if

	// reset random string
	if(random && frame && (frame / step) % randomString.length == 0) {
		setRandomString();
	} // end of if
	
	// set string letter
	if(frame % step == 0 && !random)
		semaphore.set(string[(frame / step) % string.length]);
	
	semaphore.update(refresh);
	frame++;
}, 1000 / refresh); // end of set interval
//window.clearInterval(interval);

function handleChange() {
	string = document.getElementById('text').value.toLowerCase().replace(/[^a-z ]/g, '');
	document.getElementById('text').value = string;
	random = false;
	frame = 0;
} // end of hangle change

function handleString() {
	random = false;
	frame = 0;
} // end of hangle string

function handleRandom() {
	setRandomString()
	random = true;
	frame = 0;
} // end of hangle random

function handleSlow() {
	duration += 100;
	document.getElementById('speed').innerHTML = 'Speed: ' + duration + ' ms';
	setRandomString()
	frame = 0;
} // end of handle slow

function handleFast() {
	if(duration > 500) duration -= 100;
	document.getElementById('speed').innerHTML = 'Speed: ' + duration + ' ms';
	setRandomString()
	frame = 0;
} // end of handle fast

function handleCopy() {
	handleChange();
	navigator.clipboard.writeText(location.origin + location.pathname + '?m=' + encodeURIComponent(string));
} // end of handle fast

window.addEventListener('resize', function() {
	init();
}); // end of resize event listener

window.addEventListener('keydown', function(event) {
	if(event.key != 'Escape') return;
	
	// hide info display
	if(display) {
		document.querySelector('div').style.display = 'none';
		display = false;
		init();
	} // end of if
	
	// show info display
	else {
		document.querySelector('div').style.display = 'block';
		display = true;
		init();
	} // end of else
}); // end of key down event listener

/* START UP ***************************************************** */

init();
animate();
