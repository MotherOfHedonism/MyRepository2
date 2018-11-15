var Controller = function (View, Model) {
    this.carView = View;
    this.carModel = Model;
};
Controller.prototype.init = function () {
    this.carView.onKeyDownEvent = this.moving.bind(this);
    this.carView.init();
    this.carModel.init(this.needRendering.bind(this));
    this.needRendering();
};
Controller.prototype.moving = function (e) {
    this.carModel.carMove(e);
};
Controller.prototype.needRendering = function () {
    this.carModel.Levels();
    this.carView.render(carModel.objs);
    this.carView.renderScore();
};
Controller.prototype.dieCar = function () {
    LIFES--;
    if (LIFES == 0) {
        SCORE = KILL;
        carView.renderEnd();
        FLAG = true;
        try {
            this.carView.scene.setAttribute('hidden', 'true');
            this.carView.end.hidden = false;
        } catch{ };
        this.carModel.needRendering=null;
       this.needRendering=null;
    }
    else if (LIFES > 0) {
        this.carView.render(carModel.objs);
        this.carView.renderScore();
    }
};

Controller.prototype.dieCube = function (el) {
    this.carView.clearCube(el);
};
var carController = new Controller(carView, carModel);
carController.init();
