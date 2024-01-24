module.exports = function myBabelPulgin() {
    return {
        visitor: {
            Identifier(path) {
                const name = path.node.name;

                console.log('name: ', name)
            },
            VariableDeclaration(path) {
                console.log('kind: ', path.node.kind);

                if(path.node.kind === 'const') {
                    path.node.kind = 'var'
                }
            }
        }
    }
}