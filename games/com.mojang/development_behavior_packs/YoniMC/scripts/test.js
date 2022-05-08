function b(argb, ...argbs){
  console.log(JSON.stringify(argbs))
}
function a(arga, ...argas){
  b(0, argas)
}
a(1,2,3,4)
