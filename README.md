Webcoin-checkpoint-maker helps you make checkpoints for webcoin projects. It only supports Bitcoin currently.

To make some for your [webcoin](https://github.com/mappum/webcoin) project:
```
npm i -g webcoin-checkpoint-maker
webcoin-checkpoint-maker --heights "[2016, 4032]"
```

This will print out something like the following, which you can then copy and paste into your project.

```
({
    'height': 2016,
    'header': {
        'version': 1,
        'prevHash': Buffer('Y5e7ar1PxSHA0/YHG1ZQOJ8LRVG8QLTmsGcwaQAAAAA=', 'base64'),
        'merkleRoot': Buffer('rORwrs2pyIGMj+V2iM0qdytaV5VKAN8EIKfdVGttLFc=', 'base64'),
        'timestamp': 1233063531,
        'bits': 486604799,
        'nonce': 790229043
    }
});
```
