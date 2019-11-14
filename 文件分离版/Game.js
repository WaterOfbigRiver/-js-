    //自调用函数 --游戏
    (function () {
        var gmSelf;

        //游戏的构造函数
        function Game(map) {
            this.food = new Food();
            this.snake = new Snake();
            this.map = map; //地图
            gmSelf = this; //保留this
        }

        Game.prototype.init = function () {
            //初始化游戏

            this.food.Remove(); //删除所有存在的食物
            //初始化食物（创建食物）
            this.food.init(this.map);
            // 初始化小蛇
            this.snake.init(this.map);

            // //定时器
            // setInterval(function () {
            //     gmSelf.init(gmSelf.map);
            //     // 移动小蛇
            //     gmSelf.move(gmSelf.food, gmSelf.map);
            // }, 150);

            // 调用自动移动小蛇的方法
            this.runSnake(this.food, this.map);
            //调用按键的方法
            this.bindKey();
        };

        //添加原型方法--设置小蛇可以自动的动起来
        Game.prototype.runSnake = function (food, map) {
            //自动的去移动
            timer = setInterval(function () {
                //此时的this是window ,所以需要用bind重新指定为gmSelf

                //移动小蛇
                this.snake.move(food, map);
                console.log("移动了小蛇2..");

                //初始化小蛇
                this.snake.init(map);

                //坐标最大值
                var maxX = parseInt(map.offsetWidth / this.snake.width);
                var maxY = parseInt(map.offsetHeight / this.snake.height);
                //小蛇的头的坐标
                var headX = this.snake.body[0].x;
                var headY = this.snake.body[0].y;

                console.log('(map)maxX=', maxX, '--- (snake)headX=', headX);
                console.log('(map)maxY=', maxY, '--- (snake)headY=', headY);
                // console.log(headX, headY);
                console.log("direction:" + this.snake.direction);

                //如果开启了自动模式
                if (AutoPlayMode == true) {

                    var jinZhiFx = 5; //角落时的禁止方向,默认无禁止方向（非1234）
                    //禁止方向
                    if (headY - 1 < 0 && (this.snake.direction == "left" || this.snake.direction == "right")) { //
                        jinZhiFx = 1; //方向为left且在左上角时，禁止方向为1 上
                    } else if (headY + 1 >= maxY && (this.snake.direction == "right" || this.snake.direction == "left")) { //
                        jinZhiFx = 2; //方向为right且在右下角时，禁止方向为2 下
                    } else if (headX - 1 < 0 && (this.snake.direction == "bottom" || this.snake.direction == "top")) { //
                        jinZhiFx = 3; //方向为bottom且在左下角时，禁止方向为3 左
                    } else if (headX + 1 >= maxX && (this.snake.direction == "bottom" || this.snake.direction == "top")) { //
                        jinZhiFx = 4; //方向为top且在右上角时，禁止方向为4 右
                    }

                    //判断是否要撞墙了
                    if ((headX + 1 >= maxX && this.snake.direction == "right")
                        || (headX - 1 < 0 && this.snake.direction == "left")
                        || (headY + 1 >= maxY && this.snake.direction == "bottom")
                        || (headY - 1 < 0 && this.snake.direction == "top")) {

                        //要撞墙了,就准备自动改变方向
                        console.log("要撞墙了,将准备自动调头方向");
                        changFx(this, this.snake.direction, jinZhiFx);

                    } else {//没有快要撞墙时，也可以随机调整方向，不然只能一直在外围移动

                        var temp = parseInt(Math.random() * 1000 % 10);  //结果0-9
                        if (temp < 1) { //10%的概率，调头
                            console.log("悠闲模式（temp=" + temp + "）,将随机调整调头方向");
                            changFx(this, this.snake.direction, jinZhiFx);
                        } else {
                            console.log("悠闲模式（temp=" + temp + "）,继续前进，不改变方向");
                        }
                    }

                    //自动产生合适的方向--只在自动模式下时可进行的函数
                    function changFx(whom, direction, jinZhiFx) { //whom指gm

                        console.log("产生自动调头方向，1上，2下，3左，4右");

                        var oldfx, newfx;

                        // 对应方向
                        switch (direction) { //原方向

                            case "top":
                                oldfx = 1;
                                break;
                            case "bottom":
                                oldfx = 2;
                                break;
                            case "left":
                                oldfx = 3;
                                break;
                            case "right":
                                oldfx = 4;
                                break;
                        }

                        //赋值
                        newfx = oldfx;

                        //随机产生新的方向
                        while ((newfx == oldfx) || (newfx == jinZhiFx)) { //循环，直到新旧方向不同为止
                            newfx = parseInt(Math.random() * 100 % 4) + 1;
                            console.log("新方向值:" + newfx + "，旧方向值:" + oldfx + "，禁止方向:" + jinZhiFx);
                        }

                        //自动方向确认后，重新赋值
                        autoFx = newfx;

                        //调用自动模式函数，改变方向
                        whom.AutoMode(autoFx);
                    }
                }


                //判断撞墙后，就停止
                if (headX >= maxX || headX < 0 || headY >= maxY || headY < 0) {
                    console.log('游戏结束！');

                    console.log("结束前 timer=" + timer); //测试输出

                    clearInterval(timer);

                    console.log("结束后 timer=" + timer); //测试输出

                    alert('游戏结束！');

                    //修改按钮状态
                    start.innerHTML = "开始";
                    //改变状态，未启动游戏
                    state = false;
                    gm = false;

                    //修改自动模式参数
                    AutoPlayMode = false;
                    autPly.innerHTML = "启用自动模式";
                    plyMode.innerHTML = "手动模式";
                }


            }.bind(gmSelf), timeV);
        };

        // 添加原型方法 --设置用户按键，改变小蛇的移动方向
        Game.prototype.bindKey = function () {
            document.addEventListener('keydown', function (e) {
                //默认这里的this是触发keydown事件的对象，即document---所以需要用.bind(gmSelf)改变指向
                //获取按键的值
                switch (e.keyCode) {
                    case 37:
                        this.snake.direction = "left";
                        break;
                    case 38:
                        this.snake.direction = "top";
                        break;
                    case 39:
                        this.snake.direction = "right";
                        break;
                    case 40:
                        this.snake.direction = "bottom";
                        break;
                }

            }.bind(gmSelf), false);
        };


        // 添加原型方法 --自动模式，自动随机改变小蛇的移动方向
        Game.prototype.AutoMode = function (autoFx) {

            console.log("autoFx=" + autoFx);

            //对应方向的值
            switch (autoFx) {

                case 1:
                    this.snake.direction = "top";
                    break;
                case 2:
                    this.snake.direction = "bottom";
                    break;
                case 3:
                    this.snake.direction = "left";
                    break;
                case 4:
                    this.snake.direction = "right";
                    break;
            }

        };

        window.Game = Game;
    }());
