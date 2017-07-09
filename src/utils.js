// FIXME: stack overflor on 10000 repeats...
export const repeat = times => (func, i) => {
  if(i === undefined){
    repeat(times)(func, times)
  }else if(i > 0){
    func()
    repeat(times)(func, --i)
  }else{
    return
  }
}
// repeat(5)( ()=>console.log('a') )
