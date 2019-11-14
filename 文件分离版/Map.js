
    // 自调用函数 --地图
    (function () {
        var map = document.getElementById('map'); // 获取路径地图标签
        var rowNumber = 25;// 行数
        var columnNumber = 20;// 列数;
        var mapWidth = columnNumber * 20 + 'px';// 地图的宽
        var mapHeight = rowNumber * 20 + 'px';// 地图的高
        map.style.width = mapWidth;
        map.style.height = mapHeight;// 设置地图宽高
        var snakeDIVPosition = [];   // 创建一个二维数组,用来记录地图上的所有div的位置

        // 通过双层for循环来创建地图元素
        for (var i = 0; i < rowNumber; i++) {
            var rowDIV = document.createElement('div');
            rowDIV.className = 'row';
            // 将行div添加到路径地图map中
            map.appendChild(rowDIV);
            // 创建一个行级数组,用来存储当前行中的每个方块div
            var rowArray = [];
            for (var j = 0; j < columnNumber; j++) {
                var columnDIV = document.createElement('div');
                columnDIV.className = 'col';
                rowDIV.appendChild(columnDIV);
                // 同时将方块添加到行数组中
                rowArray.push(columnDIV);
            }
            // 当前内层循环结束,将行数组添加到二维数组中
            snakeDIVPosition.push(rowArray);
        }

    }());
