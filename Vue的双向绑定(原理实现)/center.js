function Center() {
    this.renders = [];
    this.addRender=function () {
        if( Center.target ) {
            this.renders.push( Center.target );
            Center.target = null;
        }
    };
    this.notify=function () {
        this.renders.forEach( render => {
            render.update();
        })
    }
}
