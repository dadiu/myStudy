# MongoDB


## 安装

1. 下载mongodb ：https://www.mongodb.com/download-center?jmp=nav#community 

2. 选择一个盘，创建相应的文件夹，如下：

```

G:\soft\MongoDB
    |- data         // 数据文件
    |- log          // 系统文件
        |- mongodb.log
    |- Server       // 安装文件，不同的版本号，创建不同的文件夹
        |- 3.4
        |- 3.6
        |- ...
    |- test         // 测试文件夹
    |- mongo.config // 配置文件

```

3. 打开mongo.config文件，输入配置目录，如下：

```

##数据文件
dbpath=G:\soft\MongoDB\data

##日志文件
logpath=G:\soft\MongoDB\log\mongo.log

```

4. cmd打开编辑器，输入``mongo`` 测试，出现下文就表示成功了

```

MongoDB shell version v3.6.0
connecting to: mongodb://127.0.0.1:27017

```


5. cd到G:\soft\MongoDB，然后运行：

```

mongod.exe --config G:\soft\MongoDB\mongo.exe

```

6. tips：记得将mongod.exe路径加入环境变量

```
    G:\soft\MongoDB\Server\3.6\bin\
```