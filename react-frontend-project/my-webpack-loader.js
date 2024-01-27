module.exports = function meWebpackLoader (content) {
    console.log('meWebpackLoader meWebpackLoader');
    return content.replace(content, 'alert('+content+')')
}