module.exports = {
    presets: [
        ["@babel/preset-env", {
            target: {
                chrome: '79',
                ie: '11'
            },
            useBuiltIns: 'usage',
            corejs: {
                version: 2,
            }
        }]
    ]
}