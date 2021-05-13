window.addEventListener('load', function () {

    //轮播图
    var focus = document.querySelector('.b_wrap_img');
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.wrap-nav');
    var focusWidth = focus.offsetWidth;
    // 点击小圆圈变色
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'selected';
            // 点击小圆圈移动图片 
            // ul移动的距离是小圆点索引号乘以图片宽度(负值)  
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'selected';
    // 克隆第一张图片li放大ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 点击右侧按钮，图片滚动一张
    var arrow1 = document.querySelector('.next');
    var arrow2 = document.querySelector('.prev');
    var num = 0;
    // circle控制小圆点的播放
    var circle = 0;
    var flag = true; //节流阀
    arrow1.addEventListener('click', function () {
        if (flag) {
            flag = false; //关闭节流阀
            // 走到最后一张图片时ul快速复原left为0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true; //打开节流阀
            });
            // 点击右侧按钮，小圆点跟随其一起变化
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 调用函数
            circleChange();
        }
    });
    // 左侧按钮
    arrow2.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // 走到最后一张图片时ul快速复原left为0
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            // 点击右侧按钮，小圆点跟随其一起变化
            circle--;
            circle = circle < 0 ? ol.children.length - 1 : circle;
            // 调用函数
            circleChange();
        }
    });
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'selected';
    }
    // 自动播放轮播图
    var timer = setInterval(function () {
        // 手动调用点击事件
        arrow1.click();
    }, 2000)
    // 鼠标经过停止
    focus.addEventListener('mouseenter', function () {
        clearInterval(timer);
        timer = none; //清除定时器变量
    })
    focus.addEventListener('mouseleave', function () {
        timer = setInterval(function () {
            // 手动调用点击事件
            arrow1.click();
        }, 2000)
    })

    // 返回顶部
    var goBack = document.querySelector('.backtop');
    goBack.addEventListener('click', function () {
        animate1(window, 0);
    });
    //动画函数
    function animate1(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var step = (target - window.pageYOffset) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (window.pageYOffset == target) {
                // 停止动画，即停止定时器
                clearInterval(obj.timer);
                // 回调函数
                callback && callback();
            }
            window.scroll(0, window.pageYOffset + step);
        }, 15);
    }
})