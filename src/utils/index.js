/*
*  对象数组去重
* */

 export function deRepeatJson(arr) {
    let hash = {}
    const newArr = arr.reduce((pre, cur) => {
     hash[cur.value] ? '' : (hash[cur.value] = true && pre.push(cur))
     return pre
    }, [])
    return newArr
 }

 /*
 *  判断数组中是否含有同样的对象
 * */

 export function isReapt(arr, obj, key){
  let isRepeat = false
  arr.forEach(val => {
   if(val[key] === obj[key]){
    isRepeat = true
   }
  })
  return isRepeat
 }