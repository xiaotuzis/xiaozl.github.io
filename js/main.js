 var index = 0; //定义初始下标
        var banner = document.getElementsByClassName("banner")[0];
        var itemList = document.getElementsByClassName("item");
        var pagenationList = document.querySelectorAll(".pagenation>div");
        var pagenation = document.querySelector(".pagenation");
        itemList[0].style.opacity = 1;
        pagenationList[0].style.background = "blue" //初始第一张图对应的小圆点的颜色为蓝色
        var up = document.getElementsByClassName("div1")[0];
        var next = document.getElementsByClassName("div2")[0];
        //下一张图片（封装方便下面自动播放定时器调用）
        function nextFn() {
            index = index >= itemList.length - 1 ? 0 : ++index; //判断点击到了最后一张图片再次点击返回到第一张图
            for (var i = 0; i < itemList.length; i++) {
                itemList[i].style.opacity = 0; //图片透明度为0图片隐藏
                pagenationList[i].style.background = "white " //图片没显现小圆点的颜色为白色
            }
            itemList[index].style.transition = "opacity 1s ease .2s"
            itemList[index].style.opacity = 1; //图片透明度为1图片显现
            pagenationList[index].style.background = "blue" //图片显现小圆点的颜色为蓝色
        }
        next.onclick = nextFn; //下一张（点击事件）点击切换下一张图片
        up.onclick = function () { //上一张（点击事件）点击切换上一张图片
            index = index <= 0 ? itemList.length - 1 : --index; //判断点击到了第一张图片再次点击返回到最后一张图
            for (var i = 0; i < itemList.length; i++) {
                itemList[i].style.opacity = 0;
                pagenationList[i].style.background = "white"
            }
            itemList[index].style.transition = "opacity 1s ease .2s" //增加过渡效果
            itemList[index].style.opacity = 1;
            pagenationList[index].style.background = "blue"
        }
        //设置定时器，自动向下播放图片
        var t1 = setInterval(nextFn, 2000)
        banner.onmouseover = function () {
            clearInterval(t1);
        }
        banner.onmouseout = function () {
            t1 = setInterval(nextFn, 2000)
        }
        // 事件委托
        pagenation.onclick = function (event) {
            event = window.event || event
            console.log(event);
            if (event.target.className == "pagenation") {
                console.log("点击的是父元素");
            } else {
                var id = event.target.id;
                var photoIndex = null;
                for (var i = 0; i < pagenationList.length; i++) {
                    pagenationList[i].style.background = "white"
                    if (id.indexOf(i) >= 0) {
                        photoIndex = i;
                    }
                }
                event.target.style.background = "blue"
                index = photoIndex; // 将小圆点对应的下标与图片下标对应
                for (var i = 0; i < itemList.length; i++) {
                    itemList[i].style.opacity = 0;
                }
                itemList[index].style.transition = "opacity 1s ease .2s"
                itemList[photoIndex].style.opacity = 1;
            }
        }