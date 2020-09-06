if (Math.lerp === undefined) {
	Math.lerp = (v0, v1, t) => v0 * (1 - t) + v1 * t
}

if (Math.limit === undefined) {
	Math.limit = (val, min = 0, max = 1) =>
		val > max ? max : val < min ? min : val
}
