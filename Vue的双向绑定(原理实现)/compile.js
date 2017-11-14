function nodeToFragment(app,vue) {
    var fetchDOM = document.createDocumentFragment();
    var child;
    while ( child = app.firstChild ) {
        // console.log(child,child.nodeType );
        compile( child,vue );
        fetchDOM.appendChild(child);
    }
    return fetchDOM;
}

function compile(node,vue) {
    if(node.nodeType === 1) {
        //获取所有属性
        let attrs = node.attributes;
        for(let i=0;i<attrs.length;i++) {
            if( attrs[i].nodeName === 'v-model' ) {
                let name = attrs[i].nodeValue;
                new Render(node,vue,name);
                node.oninput = function (e) {
                    // console.log('敲了键盘');
                    let newValue = e.target.value;
                    vue.data[name] = newValue;
                }
            }
        }
    }
    //文本节点
    if( node.nodeType === 3 ) {
        let text = node.nodeValue;
        let reg = /\{\{.*?\}\}/g;
        if( (result= reg.exec(text)) !== null ) {
            let dataName = getDataName(result[0]);
            new Render(node,vue,dataName);
        }
    }
    function getDataName(txt){
        var reg2 = /\{\{(.*?)\}\}/;
        reg2.test(txt);
        return RegExp.$1.trim();
    }
}



