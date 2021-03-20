
// CIRCLES COLLISION TEST METHOD
export const boolCircleCollision = function (circle1, circle2) {
	//compare the distance to combined radii
	var dx = circle2.x - circle1.x;
	var dy = circle2.y - circle1.y;
	var radii = circle1.radius + circle2.radius;
	if ((dx * dx) + (dy * dy) < radii * radii) {
		//COLLISION
		return true;
	} else {
		//NO COLLISION
		return false;
	}
}

// RECTANGLES COLLISION TEST METHOD
export const boolRectangleCollision = function (rectangle1, rectangle2) {
	if (Math.abs(rectangle1.x - rectangle2.x) * 2 < rectangle1.width + rectangle2.width && Math.abs(rectangle1.y - rectangle2.y) * 2 < rectangle1.height + rectangle2.height) {
		return true;
	} else {
		return false;
	}
}

// RECTANGLE & CIRCLE COLLISION TEST METHOD
export const boolCircleRectCollision = function (circle, rectangle) {
	//Based on http://stackoverflow.com/questions/401847/circle-rectangle-collision-detection-intersection/402010#402010

	var rect = clone(rectangle);
	var circ = clone(circle);

	rect.x = rect.x + rect.width / 2;
	rect.y = rect.y + circ.radius;

	var circleDistanceX = Math.abs(circ.x - rect.x);
	var circleDistanceY = Math.abs(circ.y - rect.y);

	if (circleDistanceX > (rect.width / 2 + circ.radius)) {
		return false;
	}
	if (circleDistanceY > (rect.height / 2 + circ.radius)) {
		return false;
	}

	if (circleDistanceX <= (rect.width / 2)) {
		return true;
	}
	if (circleDistanceY <= (rect.height / 2)) {
		return true;
	}

	var cornerDistance_sq = (Math.pow(circleDistanceX - rect.width / 2, 2)) + (Math.pow(circleDistanceY - rect.height / 2, 2));

	return (cornerDistance_sq <= (circ.radius * circ.radius));

}


//when called returns a clone of the object passed
export const clone = (function () {
	return function (obj) {
		Clone.prototype = obj;
		return new Clone();
	};
	function Clone() {
	}
}());