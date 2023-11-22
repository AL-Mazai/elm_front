const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    devServer: {
        port: 9999,
        client: {
            webSocketURL: 'ws://localhost:9999/ws',
        },
    },
    transpileDependencies: true
})

// module.exports = {devServer: {port: 9999}}
