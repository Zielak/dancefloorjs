import Vector from './vector'
import pathfinding from './pathfinding'

export const mergeSort = function(array, comparefn) {
	function merge(arr, aux, lo, mid, hi, comparefn) {
		let i = lo
		let j = mid + 1
		let k = lo
		let _b = true
		while(_b){
			let cmp = comparefn(arr[i], arr[j])
			if(cmp <= 0){
				aux[k++] = arr[i++]
				if(i > mid){
					do
						aux[k++] = arr[j++]
					while(j <= hi)
					_b = false
				}
			} else {
				aux[k++] = arr[j++]
				if(j > hi){
					do
						aux[k++] = arr[i++]
					while(i <= mid)
					_b = false
				}
			}
		}
	}

	function sortarrtoaux(arr, aux, lo, hi, comparefn) {
		if (hi < lo) return
		if (hi == lo){
			aux[lo] = arr[lo]
			return
		}
		const mid = Math.floor(lo + (hi - lo) / 2)
		sortarrtoarr(arr, aux, lo, mid, comparefn)
		sortarrtoarr(arr, aux, mid + 1, hi, comparefn)
		merge(arr, aux, lo, mid, hi, comparefn)
	}

	function sortarrtoarr(arr, aux, lo, hi, comparefn) {
		if (hi <= lo) return
		const mid = Math.floor(lo + (hi - lo) / 2)
		sortarrtoaux(arr, aux, lo, mid, comparefn)
		sortarrtoaux(arr, aux, mid + 1, hi, comparefn)
		merge(aux, arr, lo, mid, hi, comparefn)
	}

	function merge_sort(arr, comparefn) {
		const aux = arr.slice(0)
		sortarrtoarr(arr, aux, 0, arr.length - 1, comparefn)
		return arr
	}

	return merge_sort(array, comparefn)
}

export function rgb2hex(v) {
	var rgb = v.b | (v.g << 8) | (v.r << 16)
	return rgb //'#' + (0x1000000 + rgb).toString(16).slice(1)
}


export function worldPos2GridPos(x, y){
	let vec = new Vector()
	if(x instanceof Object){
		vec.set_xy(x.x, x.y)
	}else{
		vec.set_xy(x, y)
	}
	return vec.divideScalar(pathfinding.GRID_CELL_SIZE).subtractScalar(0.5).round()
}
export function gridPos2WorldPos(x, y){
	let vec = new Vector()
	if(x instanceof Object){
		vec.set_xy(x.x, x.y)
	}else{
		vec.set_xy(x, y)
	}
	return vec.multiplyScalar(pathfinding.GRID_CELL_SIZE).addScalar(pathfinding.GRID_CELL_SIZE/2)
}

/**
 * Sorts all children in the container by their true `y` position
 * 
 * @export
 * @param {Array} container 
 * @returns {Array} of all PIXI stuff from the Container
 */
export function sortChildren(container) {
	return mergeSort(container, (a, b) => {
		return ((a._y || a.y) - (b._y || b.y))
	})
}
