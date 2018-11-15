var View = function () {
    this.scene = document.querySelector('.mainScene');
    this.context = this.scene.getContext("2d");
    this.scene.height = SCREEN_HEIGHT;
    this.scene.width = SCREEN_WIDTH;

    this.context.fillStyle = "indigo";
    this.context.fillRect(65, 0, SCREEN_WIDTH, SCREEN_HEIGHT);


    this.context.fillStyle = 'blue';
    carModel.objs.car.x = SCREEN_WIDTH / 2;
    carModel.objs.car.y = SCREEN_HEIGHT - CAR_HEIGHT;
    this.context.fillRect(carModel.objs.car.x, carModel.objs.car.y, CAR_WIDTH, CAR_HEIGHT);

    this.sceneScore = document.querySelector('.score');
    this.contextScore = this.sceneScore.getContext("2d");
    this.sceneScore.height = 100;
    this.sceneScore.width = SCREEN_WIDTH;
    this.contextScore.fillStyle = 'purple';
    this.contextScore.textAlign = 'start';
    this.contextScore.font = "5em Verdana";
    DSTEP = 70;
    this.onKeyDownEvent = null;
};

View.prototype.render = function (objs) {

    this.context.clearRect(carModel.objs.car.x - 15, carModel.objs.car.y, CAR_WIDTH + 30, CAR_HEIGHT);

    this.context.fillStyle = "indigo";
    if (carModel.objs.car.x < LEFT_BORDER + CAR_WIDTH / 2) this.context.fillRect(carModel.objs.car.x + 20, carModel.objs.car.y, CAR_WIDTH + 30, CAR_HEIGHT);
    else this.context.fillRect(carModel.objs.car.x - 15, carModel.objs.car.y, CAR_WIDTH + 30, CAR_HEIGHT);

   // this.context.fillStyle = 'rgb(0,162,232)';
   // this.context.fillRect(carModel.objs.car.x + STEP, carModel.objs.car.y, CAR_WIDTH, CAR_HEIGHT);

};
View.prototype.renderScore = function () {
    if (FLAG == false) {
        this.contextScore.clearRect(0, 0, SCREEN_WIDTH, 100);
        this.contextScore.fillText(KILL + ' ' + LIFES + ' lifes ', SCREEN_WIDTH / 2.5, 90);
    }

};
View.prototype.renderEnd = function () {
    this.contextScore.clearRect(0, 0, SCREEN_WIDTH, 100);
    this.contextScore.fillText(' END ' + SCORE + ' points ', SCREEN_WIDTH / 3, 90);
};

View.prototype.clearCube = function (el) {
    this.context.clearRect(el.x, el.y, el.width, el.height);
};

var appendInterval;

View.prototype.init = function () {
    document.addEventListener('keydown', this.onKeyDownEvent);
    this.setAppendInterval();
    this.setScoreInterval();
    this.setCarInterval();
    carModel.cubeObjs.forEach(el => {
        this.renderCube(el, carModel.objs.car);
    });
};

View.prototype.setAppendInterval = function () {
    let appendInterval = setInterval(function () {
        if (LIFES <= 0)
            clearInterval(appendInterval);
        else {
            let cube = carModel.createCube();
            carView.renderCube(cube, carModel.objs.car);
        }
    }, TIME_INTERVAL);
};

View.prototype.setCarInterval = function () {
    let carInterval = setInterval(function () {
        if (LIFES <= 0)
            clearInterval(carInterval);
        else {
            context = this.carView.scene.getContext("2d");
           // this.context.clearRect(carModel.objs.car.x-STEP, carModel.objs.car.y, CAR_WIDTH, CAR_HEIGHT);
            this.context.fillStyle = 'rgb(0,162,232)';
            this.context.fillRect(carModel.objs.car.x, carModel.objs.car.y, CAR_WIDTH, CAR_HEIGHT);
        }
    }, 1);
};


View.prototype.setScoreInterval = function () {
    let scoreTimer = setInterval(function () {
        if (LIFES <= 0)
            clearInterval(scoreTimer);
        else {
            KILL++;
            carView.renderScore();
        }
    }, SCORE_SPEED);
};
var tmp;
View.prototype.renderCube = function (el, machine) {
    var color = this.context.fillStyle = 'rgba(' + el.color[0] + ',' + el.color[1] + ',' + el.color[2] + ',' + el.color[3] + ')';
    this.context.fillRect(el.x + DSTEP, el.y, el.size, el.size);
    let Timer = setInterval(function () {
        context = this.carView.scene.getContext("2d");

        //this.context.fillStyle = 'rgb(0,162,232)';
        //this.context.fillRect(carModel.objs.car.x, carModel.objs.car.y, CAR_WIDTH, CAR_HEIGHT);

        context.clearRect(el.x + DSTEP - 1, el.y, el.size + 5, el.size);
        tmp = context.fillStyle;
        carView.renderScreen(context, el);
        context.fillStyle = color;
        el.y = el.y + CUBE_STEP;
        context.fillRect(el.x + DSTEP, el.y, el.size, el.size);
        carModel.walkingCube1(el, machine);

    }, TIMER_SPEED);

};

View.prototype.renderScreen = function (context, el) {
    context.fillStyle = "indigo";
    context.fillRect(el.x + 68, el.y, el.size + 7, el.size);
}

var carView = new View();
