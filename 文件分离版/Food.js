    //自调用函数 --食物
    (function () {

        var elements = []; //是用来保存每个小方块的食物的

        //食物对象，有宽，高，坐标和颜色
        function Food(x, y, width, height, color) {
            //横纵坐标
            this.x = x || 0; //默认为0，没有x时 就为默认的0
            this.y = y || 0; //默认为0，没有y时 就为默认的0
            //宽和高
            this.width = width || 20;
            this.height = height || 20;
            //背景颜色
            this.color = color || "green";
        }

        //为原型添加初始化的方法（作用：在页面上显示这个食物）
        //因为食物要在地图上显示，所以，需要地图的这个参数（map---就是页面上的.class=map的这个div）
        Food.prototype.init = function (map) {

            //创建div
            var div = document.createElement('div'); //创建元素
            // 把div加到map中
            map.appendChild(div);
            //设置div样式
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.backgroundColor = this.color;
            //先脱离文档流
            div.style.position = "absolute";
            //随机产生纵横坐标
            var randX = Math.random();
            var randY = Math.random();
            // this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width; //出现食物x越界情况（在地图外）
            // this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
            //易错点
            this.x = parseInt(randX * parseInt((map.offsetWidth / this.width))) * this.width; //注意需要两个parseInt,因为内层的是取最大整数倍，外层的是随机数（0-1间的数），只有内部的倍数不大于最大整数倍，两者的乘积才不会越界（因为随机数最大也不等于1）
            this.y = parseInt(randY * parseInt((map.offsetHeight / this.height))) * this.height;

            //测试输出
            // console.log("map.offsetWidth =" + map.offsetWidth + ", map.offsetHeight=" + map.offsetHeight);
            // console.log("this.width =" + this.width + ", this.height=" + this.height);
            // console.log("randX =" + randX + ", randY=" + randY);
            // console.log("(map.offsetWidth / this.width) =" + (map.offsetWidth / this.width) + ", (map.offsetHeight / this.height)=" + (map.offsetHeight / this.height));
            // console.log("食物x坐标px:" + this.x + " 食物y坐标px:" + this.y);
            // console.log("食物x坐标:" + (this.x / this.width) + " 食物y坐标:" + (this.y / this.height));

            console.log("生成食物");

            div.style.left = this.x + "px";
            div.style.top = this.y + 'px';
            //把div加入都elements中
            elements.push(div);
        };

        //--删除所有食物
        Food.prototype.Remove = function () {

            console.log("删除所有食物函数中:---> elements.length=" + elements.length);

            // elements数组中有这个食物
            for (var i = 0; i < elements.length; i++) {
                var ele = elements[i];
                // 找到这个子元素的父级元素，然后删除这个子元素
                ele.parentNode.removeChild(ele); //即地图上删除食物
                //再次把elements中的这个子元素也要删除 --数组中删除食物
                // elements.splice(i, 1); //splice是删除函数，只删一个

                console.log("删除地图中的所有食物函数中，i="+i+"，elements.length=" + elements.length);
            }

            elements.splice(0, elements.length); //splice是删除函数 ，全删
            console.log("删除数组值所有食物函数中，执行全删！，elements.length=" + elements.length);
        }


        function RemoveFood2(el) { //删除指定的食物（多个食物测试）
            // elements数组中有这个食物

            console.log("删除食物函数中，执行删除食物，elements.length=" + elements.length);

            for (var i = 0; i < elements.length; i++) {
                var ele = elements[i]; //数组中存的是div元素，对应的是style.left和style.top ，而el是对象直接用.x .y
                if (el.x == parseInt(ele.style.left) && el.y == parseInt(ele.style.top)) {

                    // 找到这个子元素的父级元素，然后删除这个子元素
                    ele.parentNode.removeChild(ele); //即地图上删除食物
                    //再次把elements中的这个子元素也要删除 --数组中删除食物
                    elements.splice(i, 1); //splice是删除函数

                    console.log("执行了删除食物，i=" + i);
                } else {
                    console.log("还未找到该食物，i=" + i + "，ele=" + ele + "，el=" + el);
                    // console.log("ele.x( style.left)=" + ele.style.left+", ele.y( style.top)="+ele.style.top+"; el.x=" + el.x+", el.y="+el.y);
                    // 将样式(字符串)转为整数，即去掉px
                    console.log("ele.x( style.left)=" + parseInt(ele.style.left) + ", ele.y( style.top)=" + parseInt(ele.style.top) + "; el.x=" + el.x + ", el.y=" + el.y);
                }
            }
        }

        // 判断是否属于数组中的食物
        function isEated(head_x, head_y) {
            var res = false; //
            var ele;

            console.log("判断是否吃到食物函数中，elements.length=" + elements.length);

            for (var i = 0; i < elements.length; i++) {
                ele = elements[i]; //数组中存的是div元素，对应的是style.left和style.top ，而el是对象直接用.x .y
                if (head_x == parseInt(ele.style.left) && head_y == parseInt(ele.style.top)) {
                    console.log("找到了同坐标的食物，i=" + i + ": head_x=" + head_x + ", head_y=" + head_y);

                    // 找到这个子元素的父级元素，然后删除这个子元素
                    ele.parentNode.removeChild(ele); //即地图上删除食物
                    //再次把elements中的这个子元素也要删除 --数组中删除食物
                    elements.splice(i, 1); //splice是删除函数

                    console.log("执行了删除此食物，i=" + i);

                    res = true;
                    break;

                } else {
                    console.log("还未找到同坐标的食物，i=" + i);
                    // console.log("ele.x( style.left)=" + ele.style.left+", ele.y( style.top)="+ele.style.top);
                    // 将样式(字符串)转为整数，即去掉px
                    console.log("ele.x( style.left)=" + parseInt(ele.style.left) + "(px), ele.y( style.top)=" + parseInt(ele.style.top) + "(px)");
                }
            }

            //更改食物数量标签
            fdNum.innerHTML = elements.length;
            foodNumCount = elements.length;
            console.log("赋值后foodNumCount=" + foodNumCount + "，elements.length=" + elements.length);

            //返回结果
            if (res) {
                console.log("吃到了一个食物");
                return true;
            } else {
                console.log("没吃到任何食物");
                return false;
            }
        }

        //把food暴露给windw,外部可以调用
        window.Food = Food;
        window.RemoveFood2 = RemoveFood2;
        window.isEated = isEated;
    }());

