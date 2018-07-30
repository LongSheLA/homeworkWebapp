module.exports = {
    baseUrl:"/",
    devServer:{
        proxy:{
            "/homework":{
                target:'http://localhost:9099',
                changeOrigin:false,
                ws:true
            }
        }
    }
}