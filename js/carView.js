var View = function () {
    this.car = document.querySelector('.car');
    this.scene = document.querySelector('.mainScene');
    this.score = document.querySelector('.score');
    this.end = document.getElementsByClassName("end")[0];
    this.onKeyDownEvent = null;
};
View.prototype.render = function (objs) {
    this.car.style.left = 'calc(50% + ' + objs.car.x + 'px)';
    this.car.style.top = 'calc(83.5% + ' + objs.car.y + 'px)';
    this.score.innerHTML = KILL + '&nbsp' + LIFES + '&#x2665';
};
View.prototype.renderEnd = function () {
    this.end.innerHTML = this.end.innerHTML + '&nbsp' + SCORE + 'point';
};

View.prototype.clearCube = function (el) {
    el.setAttribute('hidden', 'true');
};

View.prototype.renderScore = function () {
    this.score.innerHTML = KILL + '&nbsp' + LIFES + '&#x2665';
};

var appendInterval;

View.prototype.init = function () {
    document.addEventListener('keydown', this.onKeyDownEvent);
    LEFT_BORDER = -700;
    RIGHT_BORDER = 670;
    this.setAppendInterval();
    this.setScoreInterval();
    carModel.cubeObjs.forEach(el => {
        this.renderCube(el);
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

View.prototype.renderCube = function (el) {

    let cube = document.createElement('div');
    cube.className = 'cube';
    cube.style.width = el.size + 'px';
    cube.style.height = el.size + 'px';
    cube.style.left = el.x + 'px';
    cube.style.top = el.y + 'px';
    cube.style.background = 'rgba(' + el.color[0] + ',' + el.color[1] + ',' + el.color[2] + ',' + el.color[3] + ')';
    cube.style.opacity = 1;
    this.scene.appendChild(cube);

    let Timer = setInterval(function () {
        cube.style.top = (parseInt(cube.style.top) + CUBE_STEP) + 'px';
        if ((parseInt(cube.style.top) + CUBE_HEIGHT) > SCREEN_HEIGHT) clearInterval(Timer);
        carModel.walkingCube(cube);
    }, TIMER_SPEED);

};
var carView = new View();
