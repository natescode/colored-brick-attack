var Input = {
	keyboard: function (key, method) {
		$(document).on("keydown", function (e) {
			if (keyAlias(key) == e.keyCode) {
				method();
			}
		});
	}
}

export default function keyAlias(keyString) {
	keyString = keyString.toLowerCase();
	var key;
	switch (keyString) {
		case "space":
			key = 32;
			break;
		case "left":
			key = 37;
			break;
		case "up":
			key = 38;
			break;
		case "right":
			key = 39;
			break;
		case "down":
			key = 40;
			break;
		case "a":
			key = 97;
			break;
		case "b":
			key = 98;
			break;
		case "c":
			key = 99;
			break;
		case "d":
			key = 100;
			break;
		case "e":
			key = 101;
			break;
		case "f":
			key = 102;
			break;
		case "g":
			key = 103;
			break;
		case "h":
			key = 104;
			break;
		case "i":
			key = 105;
			break;
		case "j":
			key = 106;
			break;
		case "k":
			key = 107;
			break;
		case "l":
			key = 108;
			break;
		case "m":
			key = 109;
			break;
		case "n":
			key = 110;
			break;
		case "o":
			key = 111;
			break;
		case "p":
			key = 112;
			break;
		case "q":
			key = 113;
			break;
		case "r":
			key = 114;
			break;
		case "s":
			key = 115;
			break;
		case "t":
			key = 116;
			break;
		case "u":
			key = 117;
			break;
		case "v":
			key = 118;
			break;
		case "w":
			key = 119;
			break;
		case "x":
			key = 120;
			break;
		case "y":
			key = 121;
			break;
		case "z":
			key = 122;
			break;
		default:
			return key = "unknown";
	}
	return key;
}