export function rgb2hex(v) {
	var rgb = v.b | (v.g << 8) | (v.r << 16)
	return rgb //'#' + (0x1000000 + rgb).toString(16).slice(1)
}
