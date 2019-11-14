    // 自调用函数 --小蛇
    (function () {
        var elementsSnake = [];

        //小蛇的构造函数
        function Snake(width, height, direction) {
            // 身体每个部分的宽高
            this.width = width || 20;
            this.height = height || 20;
            //身体 是一个数组（可变的）
            this.body = [
                //横向时，纵坐标不变，横坐标依次
                {x: 3, y: 2, color: "red"}, //头
                {x: 2, y: 2, color: "orange"}, //身体
                {x: 1, y: 2, color: "orange"}, //身体
            ];

            this.direction = direction || "right";

        }

        Snake.prototype.init = function (map) {
            RemoveSnake();

            //循环遍历，创建div
            for (var i = 0; i < this.body.length; i++) {


                //地图坐标最大值
                var maxX1 = parseInt(map.offsetWidth / this.width);
                var maxY1 = parseInt(map.offsetHeight / this.height);

                //数组中每个元素都是一个对象
                var obj = this.body[i];

                if (!(obj.x >= maxX1 || obj.x < 0 || obj.y >= maxY1 || obj.y < 0)) {
                    //创建div
                    var div = document.createElement('div');
                    //把div加入到map地图中
                    map.append(div);
                    //数组div的样式
                    div.style.position = "absolute";
                    div.style.width = this.width + 'px';
                    div.style.height = this.height + 'px';
                    //横纵坐标
                    div.style.left = obj.x * this.width + 'px';
                    div.style.top = obj.y * this.height + 'px';
                    div.style.backgroundColor = obj.color;
                    //还差一个方向 暂不写


                    //把div加入到elementsSnake数组中
                    elementsSnake.push(div);
                } else {
                    console.log("蛇头位置溢出(撞墙了)，不再新创造body");
                    break; //退出，不然只是蛇头不再新创造，身体还会继续创造
                }

                if (i == 0) { //测试输出蛇头的位置
                    console.log("地图边界：" + maxX1, maxY1);
                    console.log("蛇头位置：" + obj.x, obj.y);
                    console.log("map.offsetWidth =" + map.offsetWidth + ", map.offsetHeight=" + map.offsetHeight);
                }
            }
        }

        //为原型添加方法--小蛇动起来
        Snake.prototype.move = function (food, map) {

            //坐标最大值
            var maxX = parseInt(map.offsetWidth / this.width);
            var maxY = parseInt(map.offsetHeight / this.height);
            //小蛇的头的坐标
            var headX = this.body[0].x;
            var headY = this.body[0].y;

            // console.log('(map)maxX=', maxX, '--- (snake Mv)headX=', headX);
            // console.log('(map)maxY=', maxY, '--- (snake Mv)headY=', headY);
            // console.log("map.offsetWidth ="+map.offsetWidth + ", map.offsetHeight="+map.offsetHeight);
            // console.log(headX, headY);

            //改变小蛇位置，先改变身体，后改变头
            //改变小蛇的身体坐标位置
            var i = this.body.length - 1; //下标
            for (; i > 0; i--) {
                this.body[i].x = this.body[i - 1].x;
                this.body[i].y = this.body[i - 1].y;
            }

            //判断方向--改变小蛇的头的坐标
            switch (this.direction) {
                case "right":
                    this.body[0].x += 1;
                    break;
                case "left":
                    this.body[0].x -= 1;
                    break;
                case "top":
                    this.body[0].y -= 1;
                    break;
                case "bottom":
                    this.body[0].y += 1;
                    break;
            }


            //判断有没有吃到食物
            //小蛇的头的坐标和食物的坐标一致时，即为吃到
            var headX = this.body[0].x * this.width;
            var headY = this.body[0].y * this.height;
            //食物的坐标
            console.log("对比x值" + headX + "(snake)====(food)" + food.x);
            console.log("对比y值" + headY + "(snake)====(food)" + food.y);

            // //旧版，只能删除gm创造的那个食物
            // if (headX == food.x && headY == food.y) {
            //
            //     console.log("吃到了");
            //     // alert("吃到了");
            //
            //     //小蛇身体加长
            //     var last = this.body[this.body.length - 1];
            //     //把小蛇的最后一段复制一个，重新加入到body中
            //     this.body.push({ //直接用push添加
            //         x: last.x,
            //         y: last.y,
            //         color: last.color
            //     });
            //
            //     //把食物删掉，重新初始化食物
            //     RemoveFood2(food); //新版，删除map指定的食物
            //     // console.log("food="+food); //结果food=[object Object]
            //
            //     // 重新初始化食物(新建食物)
            //     food.init(map); //直接用food的init
            //
            //     //分数增加
            //     scoreCount++;// 记录分数
            //     // 更新当前的分数
            //     score.innerHTML = scoreCount;
            // }


            // 新版
            // 改用，判断当前头的x，y坐标值是否与食物数组中的相同，相同就为吃到了，返回过来true
            if (isEated(headX, headY) == true) { //为真时，就已经直接删掉了那个食物

                console.log("吃到了 xxxxxxxxxxx ");
                // alert("吃到了");

                //小蛇身体加长
                var last = this.body[this.body.length - 1];
                //把小蛇的最后一段复制一个，重新加入到body中
                this.body.push({ //直接用push添加
                    x: last.x,
                    y: last.y,
                    color: last.color
                });

                // 重新初始化食物(新建食物)
                var radn1 = parseInt(Math.random() * 100) % 7 + 1; //1-7之间
                console.log("食物是否过少的随机数radn1=" + radn1);
                console.log("foodNumCount=" + foodNumCount);

                if (foodNumCount <= radn1) {
                    var radn2 = parseInt(Math.random() * 100) % 15; //0-15之间

                    console.log("产生食物数量的随机数radn2=" + radn2);
                    for (var i = 0; i < radn2; i++) {
                        food.init(map); //直接用food的init
                    }
                }
                //分数增加
                scoreCount++;// 记录分数
                // 更新当前的分数
                score.innerHTML = scoreCount;
            }

        }

        //删除小蛇
        function RemoveSnake() {
            //获取数组
            var i = elementsSnake.length - 1;
            for (; i >= 0; i--) {
                //先从当前的子元素中找到改元素
                var ele = elementsSnake[i];
                //从地图上删除小蛇
                ele.parentNode.removeChild(ele);
                elementsSnake.splice(i, 1); //数组中删除小蛇
            }
        }

        //把Snake暴露给window，外部可以调用
        window.Snake = Snake;
    }());
