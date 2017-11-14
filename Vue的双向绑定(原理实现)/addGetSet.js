function addGetSet(obj) {
    if (!obj || typeof obj !== 'object') {
        return
    }
    Object.keys( obj ).forEach(key => {
        //为每个属性创建一个调度中心
        var center = new Center();
        defineProperty(key,center);
    });
    function defineProperty(key,center){
        addGetSet(obj[key]);
        var value=obj[key];
        Object.defineProperty(obj, key, {
            enumerable: true,   // 可枚举
            configurable: true, // 可重新定义
            get: function () {
                console.log('你获取了这个值');
                // 添加订阅者
                center.addRender();
                return value;
            },
            set: function (newVal) {
                if (value === newVal || (newVal !== newVal && value !== value)) {
                    return;
                }
                console.log('数据更新啦 ', value, '=>', newVal);
                value = newVal;
                console.log(center.renders);
                // 调度中心通知所有订阅者
                center.notify();
            }
        });
    }
}
