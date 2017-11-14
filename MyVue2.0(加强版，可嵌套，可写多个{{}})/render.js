function Render(node,vue,name,text) {
    this.node = node;
    this.vue = vue;
    this.name = name;
    Center.target = this;
    if( this.node.nodeType === 3 ) {
        this.originText = text;
        // 做一次取值，触发相对应name的属性值的get,好进行正确的addRender操作
         this.dataNameFlag = this.vue.data[this.name];
    }
    this.update=function () {
        if( this.node.nodeType === 1 ) {
            this.node.value = this.vue.data[this.name];
        }
        if( this.node.nodeType === 3 ) {
            let result;
            let reg = /\{\{.*?\}\}/g;
            var finalText = this.originText;
            while( (result= reg.exec(this.originText)) !== null ) {
                let dataName = getDataName( result[0] );
                finalText = finalText.replace( result[0],this.vue.data[dataName] );
            }
            this.node.nodeValue = finalText;
            function getDataName(txt){
                let reg2 = /\{\{(.*?)\}\}/;
                reg2.test(txt);
                return RegExp.$1.trim();
            };
        }
    };
    this.update();
}
