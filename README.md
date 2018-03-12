# iconfontcss2json  

用来把字体图标的css文件中的类名和16进制的content值转换为json中的key和10进制的value  
## 安装（Installation）  
```bashshell  
yarn add lexgooo/iconfontcss2json
```  
## 快速使用（Quick start）  
  - 先确保当前机子安装了nodejs环境。
  - 新建一个js文件 css2json.js
  ```javascript  
  const css2json = require('iconfontcss2json')
  css2json.css2json('./iconfont.css', './iconfont.json')
  // 其中'./iconfont.css'是需要处理的字体图标的css文件和路径；
  // './iconfont.json'是处理后的json文件及路径
  ```  
  - 在命令行中进入到这个js文件所在目录  
  ```bashshell  
  node css2json.js
  ```