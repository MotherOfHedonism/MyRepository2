var View = function () {
    this.scene = document.querySelector('.mainScene');

    var car = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    car.setAttribute('width', CAR_WIDTH);
    car.setAttribute('height', CAR_HEIGHT);
    car.setAttribute('x', SCREEN_WIDTH / 2);
    car.setAttribute('y', SCREEN_HEIGHT - CAR_HEIGHT);
    carModel.objs.car.x = SCREEN_WIDTH / 2;
    carModel.objs.car.y = SCREEN_HEIGHT - CAR_HEIGHT;
    car.setAttribute('class', 'car');
    car.setAttribute('style', 'fill: rgb(0,162,232)');
    this.scene.appendChild(car);
    this.car = document.querySelector('.car');

    this.score = document.querySelector('.scoreText');
    this.score.setAttribute('width', SCREEN_WIDTH);
    this.score.setAttribute('height', 100);
    this.newText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    this.newText.setAttributeNS(null, "x", SCREEN_WIDTH / 2.3);
    this.newText.setAttributeNS(null, "y", 90);
    this.newText.setAttributeNS(null, "width", "100%");
    this.newText.setAttributeNS(null, "height", "100%");
    this.newText.setAttributeNS(null, "font-size", "90");
    this.newText.setAttributeNS(null, 'style', 'fill: purple');
    this.newText.setAttributeNS(null, 'text-align', 'center');

    this.onKeyDownEvent = null;
};
View.prototype.render = function (objs) {
    // objs.car.x= objs.car.x+STEP;
    this.car.setAttribute('x', objs.car.x);
    this.car.setAttribute('y', objs.car.y);
    this.newText.textContent = KILL + ' ' + LIFES + ' lives';
    this.score.appendChild(this.newText);
};
View.prototype.renderEnd = function () {
    this.newText.textContent = 'END ' + SCORE + ' points';
    this.score.appendChild(this.newText);
    this.scene.remove();
};

View.prototype.clearCube = function (el) {
    this.scene.removeChild(el);
};

View.prototype.renderScore = function () {
    this.newText.textContent = KILL + ' ' + LIFES + ' lives';
};

var appendInterval;

View.prototype.init = function () {
    document.addEventListener('keydown', this.onKeyDownEvent);
    LEFT_BORDER = 0;
    RIGHT_BORDER = SCREEN_WIDTH - CAR_WIDTH;
    this.setAppendInterval();
    this.setScoreInterval();
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

View.prototype.renderCube = function (el, machine) {
    var cube = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    cube.setAttribute('width', el.size);
    cube.setAttribute('height', el.size);
    cube.setAttribute('x', el.x);
    cube.setAttribute('y', el.y);
    cube.setAttribute('style', 'fill:rgba(' + el.color[0] + ',' + el.color[1] + ',' + el.color[2] + ',' + el.color[3] + ')');
    this.scene.appendChild(cube);


    let Timer = setInterval(function () {
        el.y = el.y + CUBE_STEP;
        cube.setAttribute('y', el.y);
        if ((parseInt(cube.style.top) + CUBE_HEIGHT) > SCREEN_HEIGHT||LIFES<=0) clearInterval(Timer);
        carModel.walkingCube(cube);
    }, TIMER_SPEED);

};
var carView = new View();
