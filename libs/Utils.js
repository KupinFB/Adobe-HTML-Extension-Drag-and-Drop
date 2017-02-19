function Utils(){}

Utils.rgb2hex = function(rgb) {
    //rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 3) ? "" +
    ("0" + parseInt(rgb[0],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) : '';

};

Utils.hex2rgb = function(h) {
    h = (h.charAt(0)=="#") ? h.substring(1,7):h;
    var r = parseInt(h.substring(0,2),16), g = parseInt(h.substring(2,4),16), b = parseInt(h.substring(4,6),16);
    return [r, g, b];
};

/* rgb(255, 255, 255) -> #FFFFFF*/
Utils.parseCSSColorStringToArray = function(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    return '#' + parts.join('');
}

/* rgb(255, 255, 255) -> [255, 255, 255]*/
Utils.parseCSSColorStringToHex = function(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
	var res = [];
	for (var i = 1; i <= 3; ++i) {
        res.push(parts[i]);
    }
    return res;
}