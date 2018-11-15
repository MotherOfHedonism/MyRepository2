const INITIAL_CAR_X = 0;
const INITIAL_CAR_Y = 0;
const INITIAL_CUBE_X = 10;
const INITIAL_CUBE_Y = 0;
const LAND = 0;
var CAR_STEP = 5;
var CUBE_STEP = 5;
const KEY_CODE_LEFT = 37;
const KEY_CODE_RIGHT = 39;
const CUBE_HEIGHT = 20;
const CUBE_WIDTH = 20;
const CAR_HEIGHT = 90;
const CAR_WIDTH = 30;
const BEGIN_X = 0;
const BEGIN_Y = 0;
const SCREEN_HEIGHT = 600;
const SCREEN_WIDTH = 1400;
var TIME_INTERVAL = 200;
var TIMER_SPEED = 50;
var DSTEP = 0;
var SCORE = 0;
var KILL = 0;
var LIFES = 3;
var BIGINT = SCREEN_HEIGHT * SCREEN_HEIGHT;
var beginKILL = BIGINT;
var SCORE_SPEED = 100;
var FLAG = false;
var STEP = 0;
var LEFT_BORDER = 2 * CAR_WIDTH + 5;
var RIGHT_BORDER = SCREEN_WIDTH - CAR_WIDTH;

var CarID = null;
var CubeID = null;

function cubeModel() {
    this.obj = {
        x: INITIAL_CUBE_X,
        y: INITIAL_CUBE_Y,
        color: new Array(),
        size: CUBE_WIDTH
    }
}

var Model = function () {
    this.objs = {
        'car': {
            x: INITIAL_CAR_X,
            y: INITIAL_CAR_Y
        },
    };
    this.cubeObjs = Array();
};


Model.prototype.init = function (renderFunction) {
    this.needRendering = renderFunction;
    this.createCube();
};
Model.prototype.createCube = function () {
    var cube = new cubeModel();
    this.setCoordsCube(cube.obj, cube.obj.x, cube.obj.y);
    this.setColor(cube.obj);
    this.setSize(cube.obj);
    this.cubeObjs.push(cube.obj);
    return cube.obj;
}

Model.prototype.setColor = function (obj) {
    let rand;
    for (let i = 0; i < 3; i++) {
        rand = Math.random() * 1689 - 0.5;
        obj.color.push(Math.round(rand));
    }
    rand = 1;
    obj.color.push(rand);
}

Model.prototype.setCoordsCube = function (obj, x, y) {
    obj.x = x = Math.random() * (RIGHT_BORDER - LEFT_BORDER - RIGHT_BORDER / 10 / 2);
}

Model.prototype.setSize = function (obj) {
    obj.size = CUBE_WIDTH;
}

Model.prototype.getSize = function (obj) {
    let size = obj.size;
    return size;
}


Model.prototype.setCoords = function (obj, x, y) {
    x = x == (undefined || null) ? obj.x : x;
    y = y == (undefined || null) ? obj.y : y;

    checkScreenBorders.call(this, obj, x);

    this.needRendering();
};

Model.prototype.getCoords = function (obj) {
    return {
        x: obj.x,
        y: obj.y
    }
};

Model.prototype.carMove = function (e) {
    var keyCode = e.keyCode;
    var x = carModel.getCoords(carModel.objs.car).x;
    switch (keyCode) {
        case KEY_CODE_RIGHT: {
            carModel.setCoords(carModel.objs.car, x + CAR_STEP);
            STEP = CAR_STEP;
            break;
        }
        case KEY_CODE_LEFT: {
            carModel.setCoords(carModel.objs.car, x - CAR_STEP);
            STEP = -CAR_STEP;
            break;
        }
    }
};

Model.prototype.Levels = function () {
    if (KILL < 200) {
        TIMER_SPEED = 50;
        CAR_STEP = 5;
    }
    else if (KILL > 200 && KILL < 500) {
        TIMER_SPEED = 30;
        CAR_STEP = 7;
    }
    else if (KILL > 500) {
        TIMER_SPEED = 10;
        CAR_STEP = 10;
    }
};

Model.prototype.walkingCube = function (el) {
    var carX1 = carView.car.getBoundingClientRect().left;
    var carX2 = carView.car.getBoundingClientRect().right;
    var carY1 = carView.car.getBoundingClientRect().top;
    var cubeX1 = el.getBoundingClientRect().left;
    var cubeX4 = el.getBoundingClientRect().right;
    var cubeY3 = el.getBoundingClientRect().bottom;
    if (cubeY3 > SCREEN_HEIGHT)
        carController.dieCube(el);

    if ((cubeY3 == carY1) || (carY1 == cubeY3 - 4) || (carY1 == cubeY3 - 3) || (carY1 == cubeY3 - 2) || (carY1 == cubeY3 - 1)) {
        if ((cubeX1 < carX2 || cubeX1 == carX2) && (cubeX4 > carX1) || cubeX4 == carX1) {
            carController.dieCar();
        }
    }
};

Model.prototype.walkingCube1 = function (el, machine) {
    var carX1 = machine.x;
    var carX2 = machine.x + CAR_WIDTH;
    var carY1 = machine.y;
    var cubeX1 = el.x + DSTEP;
    var cubeX4 = el.x + CUBE_WIDTH + DSTEP;
    var cubeY3 = el.y + CUBE_HEIGHT;
    if ((parseInt(el.y) + CUBE_HEIGHT) > SCREEN_HEIGHT)
        carController.dieCube(el);
    if ((cubeY3 == carY1) || (carY1 == cubeY3 - 4) || (carY1 == cubeY3 - 3) || (carY1 == cubeY3 - 2) || (carY1 == cubeY3 - 1)) {
        if ((cubeX1 < carX2 || cubeX1 == carX2) && (cubeX4 > carX1) || cubeX4 == carX1) {
            carController.dieCar();
        }
    }
};



function checkScreenBorders(obj, x) {
    if (!(x <= LEFT_BORDER || x >= RIGHT_BORDER)) {
        obj.x = x;
    }
    else {
        if (obj.hasOwnProperty('direction')) {
            obj.direction = obj.direction === 'right' ? 'left' : 'right';
        }
        else  STEP=0;
    }
}


var carModel = new Model();