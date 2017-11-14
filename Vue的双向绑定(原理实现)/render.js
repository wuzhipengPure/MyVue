function Render(node,vue,name) {
    this.node = node;
    this.vue = vue;
    this.name = name;
    Center.target = this;
    this.update=function () {
        if( this.node.nodeType === 1 ) {
            this.node.value = this.vue.data[this.name];
        }
        if( this.node.nodeType === 3 ) {
            this.node.nodeValue = this.vue.data[this.name];
        }
    };
    this.update();
}
