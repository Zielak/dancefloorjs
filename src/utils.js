var mergeSort = function(array, comparefn) {
	function merge(arr, aux, lo, mid, hi, comparefn) {
		var i = lo
		var j = mid + 1
		var k = lo
		while(true){
			var cmp = comparefn(arr[i], arr[j])
			if(cmp <= 0){
				aux[k++] = arr[i++]
				if(i > mid){
					do
						aux[k++] = arr[j++]
					while(j <= hi)
					break
				}
			} else {
				aux[k++] = arr[j++]
				if(j > hi){
					do
						aux[k++] = arr[i++]
					while(i <= mid)
					break
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
		var mid = Math.floor(lo + (hi - lo) / 2)
		sortarrtoarr(arr, aux, lo, mid, comparefn)
		sortarrtoarr(arr, aux, mid + 1, hi, comparefn)
		merge(arr, aux, lo, mid, hi, comparefn)
	}

	function sortarrtoarr(arr, aux, lo, hi, comparefn) {
		if (hi <= lo) return
		var mid = Math.floor(lo + (hi - lo) / 2)
		sortarrtoaux(arr, aux, lo, mid, comparefn)
		sortarrtoaux(arr, aux, mid + 1, hi, comparefn)
		merge(aux, arr, lo, mid, hi, comparefn)
	}

	function merge_sort(arr, comparefn) {
		var aux = arr.slice(0)
		sortarrtoarr(arr, aux, 0, arr.length - 1, comparefn)
		return arr
	}

	return merge_sort(array, comparefn)
}

if(!Array.prototype.mergeSort){
	Array.prototype.mergeSort = mergeSort
}

export function rgb2hex(v) {
	var rgb = v.b | (v.g << 8) | (v.r << 16)
	return rgb //'#' + (0x1000000 + rgb).toString(16).slice(1)
}
