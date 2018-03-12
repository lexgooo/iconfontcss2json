const fs = require('fs');
// module.exports
exports.css2json = function css2json (cssFile, jsonFile) {
  fs.readFile(cssFile, (err, data) => {
    if (err) {
      return console.error(err)
    }
    // 把内容变为字符串对象
    data = data.toString()

    // 把需要的部分截取出来
    const start = data.indexOf('.icon-')
    const end = data.lastIndexOf('}')
    data = data.slice(start, end + 1)

    // 把字符串对象以换行为条件变为数组
    data = data.split('\n')

    // 去掉数组的空行
    let arr = []
    data.map(item => {
      if (item === '') {
        return
      } else {
        arr.push(item)
      }
    })
    data = arr

    // 用正则把需要的部分取出组成对象
    let obj = {}
    const Reg = /^\.([\w\-]+):before.+"\\(\w+).+$/g
    data.map(item => {
      let key = item.replace(Reg, '$1')
      let value = item.replace(Reg, '$2')
      value = parseInt(value, 16)
      obj[key] = value
    })
    data = JSON.stringify(obj)
    // data = obj
    // console.log(data)
    fs.writeFile(jsonFile, data, (err) => {
      if (err) {
        return console.error(err)
      }
      console.log('写入成功！')
    })
  })
}