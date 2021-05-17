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
        timer = 'none'; //清除定时器变量
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

    // 登录界面
    var login = document.querySelector('.signin');
    var mask = document.querySelector('.signin-bg');
    var link = document.querySelector('.top-sign_in');
    var closeBtn = document.querySelector('.close');
    var phone = document.querySelector('.phone');
    link.addEventListener('click', function () {
        mask.style.display = 'block';
        login.style.display = 'block';
    });
    closeBtn.addEventListener('click', function () {
        mask.style.display = 'none';
        login.style.display = 'none';
    });
    // 鼠标拖拽跟随移动
    var title = document.querySelector('.signin_top');
    // 鼠标按下获取鼠标在盒子内的坐标
    title.addEventListener('mousedown', function (e) {
        var x = e.pageX - login.offsetLeft;
        var y = e.pageY - login.offsetTop;
        // 鼠标移动
        document.addEventListener('mousemove', move)
        function move(e) {
            login.style.left = e.pageX - x + 'px';
            login.style.top = e.pageY - y + 'px';
        }
        // 鼠标弹起，使鼠标移动事件移除
        document.addEventListener('mouseup', function () {
            document.removeEventListener('mousemove', move);
        })
    });

    //锁住屏幕
    var unlock = document.querySelector('.sing_unlock');
    var lock = document.querySelector('.sing_lock');
    var player = document.querySelector('.player');
    unlock.addEventListener('click', function () {
        lock.style.display = 'block';
        unlock.style.display = 'none';
        player.style.bottom = '0';
    });
    lock.addEventListener('click', function () {
        unlock.style.display = 'block';
        lock.style.display = 'none';
        player.style.bottom = '-90px';
    })

    //登录接口
    var btn = document.querySelector('.signin_btn');
    var phonenum = document.querySelector('.phonenum');
    var password = document.querySelector('.password');
    let state = new XMLHttpRequest()
    phonenum.addEventListener('keyup', function () {
        var num = this.value;
    })
    password.addEventListener('keyup', function () {
        var pwd = this.value;
    })
    btn.addEventListener('click', function () {
        let http = new XMLHttpRequest()
        http.onreadystatechange = function () {
            if (http.readyState === 4 && http.status === 200) {
                console.log(JSON.parse(http.responseText))
            }
        }
        http.open("GET", `http://localhost:1220/login/cellphone?phone=num&password=pwd`, true);
        http.send();

        //登录状态
        state.onreadystatechange = function () {
            if (state.readyState === 4 && state.status === 200) {
                console.log(JSON.parse(http.responseText))
            }
        }
        state.open("GET", `http://localhost:1220//login/status`, true);
        state.send();
    })

    //播放器
    let audio = new XMLHttpRequest()
    audio.onreadystatechange = function () {
        if (audio.readyState === 4 && audio.status === 200) {
            console.log(JSON.parse(audio.responseText))
        }
    }
    audio.open("GET", `http://localhost:1220/lyric?id=1842728629`, true);
    audio.send();
    var audioUrl = document.querySelector('.audioUrl');
    var url1 = document.querySelector('.url1');
    var url2 = document.querySelector('.url2');
    var url3 = document.querySelector('.url3');
    var img = document.querySelector('.playerimg');
    var ername1 = document.querySelector('.singername1');
    var ername2 = document.querySelector('.singername2');
    var ername3 = document.querySelector('.singername3');
    var name1 = document.querySelector('.singname1');
    var name2 = document.querySelector('.singname2');
    var name3 = document.querySelector('.singname3');
    url1.addEventListener('click', function () {
        audioUrl.src = "https://music.163.com/song/media/outer/url?id=1843007757.mp3";
        img.src = "http://p2.music.126.net/yZli971pz305VVWf1G0jqQ==/109951165956509643.jpg?param=130y130";
        ername2.style.display = 'none';
        name2.style.display = 'none';
        ername3.style.display = 'none';
        name3.style.display = 'none';
        ername1.style.display = 'block';
        name1.style.display = 'block';
    })
    url2.addEventListener('click', function () {
        audioUrl.src = "https://music.163.com/song/media/outer/url?id=1842801269.mp3";
        img.src = "http://p2.music.126.net/EepVxZ_7Z0qAiW_UYcC7EA==/109951165954048759.jpg?param=130y130";
        ername1.style.display = 'none';
        name1.style.display = 'none';
        ername3.style.display = 'none';
        name3.style.display = 'none';
        ername2.style.display = 'block';
        name2.style.display = 'block';
    })
    url3.addEventListener('click', function () {
        audioUrl.src = "https://music.163.com/song/media/outer/url?id=1841521017.mp3";
        img.src = "http://p2.music.126.net/NRz7WPwThIt26IGwDzOPTg==/109951165956274445.jpg?param=130y130";
        ername1.style.display = 'none';
        name1.style.display = 'none';
        ername2.style.display = 'none';
        name2.style.display = 'none';
        ername3.style.display = 'block';
        name3.style.display = 'block';
    })
    audioUrl.autoplay = true;

    //播放列表
    var list = document.querySelector('.sing_list');
    var listfake = document.querySelector('.listfake');
    list.addEventListener('click', function () {
        listfake.style.display = 'block';
    })
    list.addEventListener('dblclick', function () {
        listfake.style.display = 'none';
    })
})