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
    //当nodeType === 1的时候，该节点为input，div这样的元素节点，带有属性值。
    if(node.nodeType === 1) {
        //获取该节点的所有属性
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
    //当nodeType === 3的时候为纯文本节点，比如'     {{ text1 }}'
    if( node.nodeType === 3 ) {
        let text = node.nodeValue;
        let reg = /\{\{(.*?)\}\}/g;
        if( (result= reg.test(text)) !== null ) {
            let name =  RegExp.$1.trim();
            new Render(node,vue,name);
        }
    }
}




