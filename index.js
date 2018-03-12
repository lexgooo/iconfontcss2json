const fs = require('fs');

exports.css2json = (cssFile, jsonFile) => {
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

    // 把处理后的对象转换成字符串
    data = JSON.stringify(obj)

    // 把转换的字符串写入一个新的文件中
    fs.writeFile(jsonFile, data, (err) => {
      if (err) {
        return console.error(err)
      }
      fs.unlink(cssFile, (err) => {
        if (err) {
          console.log(err)
        }
        console.log(`已成功把${cssFile}删除！`)
      })
      console.info(`写入成功，请前往${jsonFile}查看结果。`)
    })
  })
}