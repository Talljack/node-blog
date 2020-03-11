function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export function shuffle (arr) {
  let _arr = arr.slice(0)
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let _t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = _t
  }
  return _arr
}
