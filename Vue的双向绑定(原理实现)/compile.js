function nodeToCompile(app,vue) {
    var fetchDOM = document.createDocumentFragment();
    var child;
    while ( child = app.firstChild ) {
        // console.log(child,child.nodeType );
        //拿到一个dom节点，就进行compile一次
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
                //新建一个订阅者对象，表示它是一个订阅者（这里实现了Model => View，具体之后说明哟）!!!
                new Render(node,vue,name);
                //我们键入键盘的时候，实时赋值给vue.data(这里实现了View => Model) !!!
                node.oninput = function (e) {
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
            //新建一个订阅者，比如{{ text1 }}订阅了text1这个数据（这里实现了Model => View，具体之后说明哟）
            new Render(node,vue,name);
        }
    }
}




