var nowChangeFileNameEvent;
var isChangeFileName;
var mouseFlag;//鼠标按下标识
var beforeMoveX;
var beforeMoveY;

function init() {
    var now = 0;
    var nowMouseRightX = 0;
    var nowMouseRightY = 0;
    var nowMouseRightWidth = 0;
    var nowMouseRightHeight = 0;

    document.body.oncontextmenu = function () {//禁用浏览器自带的右键功能
        return false;
    }

    //给body注册点击事件处理器
    document.body.addEventListener("mousedown", function (event) {
        if (event.button == 2) {//鼠标右键
            nowMouseRightX = event.clientX;
            nowMouseRightY = event.clientY;
            var style = "display:block;left:" + nowMouseRightX + "px;" +
                "top:" + nowMouseRightY + "px";
            document.getElementById("mouseRight").style = style;
        }
        else if (event.button == 0) {//鼠标左键
            nowMouseRightWidth = document.getElementById("mouseRight").clientWidth;
            nowMouseRightHeight = document.getElementById("mouseRight").clientHeight;

            var mostLeft = nowMouseRightX + nowMouseRightWidth;
            var mostBottom = nowMouseRightY + nowMouseRightHeight;
            if (event.clientX > nowMouseRightX && event.clientX < mostLeft && event.clientY > nowMouseRightY &&
                event.clientY < mostBottom) {//点击区域是右键弹出的菜单

            } else {//点击区域超出右键功能菜单
                notDisMouseRightHtml();

                if (isChangeFileName) {
                    if (nowChangeFileNameEvent) {
                        changeFileName(nowChangeFileNameEvent, true);
                        isChangeFileName = false;
                        nowChangeFileNameEvent = null;
                    }
                }
            }
        }


    }, false);

    //切换背景注册事件处理器
    document.getElementById("changeBackground").addEventListener("click", function (event) {
        now = parseInt(event.target.textContent);

        if (now) {
            document.body.style = "background-image: url('../src/img/" + now + ".jpg')";
        }

        event.stopPropagation();//取消事件进一步捕获或冒泡

    }, false);
}

//不展示右键弹出的框
function notDisMouseRightHtml() {
    document.getElementById("mouseRight").style.display = "none";
}

//创建新的文件夹
function createFiles(event) {
    var x = event.clientX;
    var y = event.clientY;
    notDisMouseRightHtml();
    var filesHtml = "<div onmousedown='moveFiles(event)' class='createFiles' style='left:" + x + "px;top:" + y + "px;'>" +
        "<div><div><img src='../../src/img/createFiles.png' alt='新建文件夹'></div>" +
        "<div class='textCenter'><span ondblclick='openFileName(event)'>新建文件。</span></div></div></div>";//添加文件夹的html片段

    document.getElementById("filesArea").innerHTML += filesHtml;
}

/**
 * 移动文件夹
 */
function moveFiles(event) {
    var oBox = event.target.parentElement.parentElement.parentElement;
    var oBar = event.target.parentElement.parentElement;

    startDrag(oBar, oBox);
}


//打开文件夹名称输入框
function openFileName(event) {
    console.log(event);
    isChangeFileName = true;
    event.target.innerHTML = "<div><input placeholder='输入文件夹名' style='width: 100%;height: 27px; font-size: 12px;' onkeyup='changeFileName(event, false)'>"
}

//输入文件名称
function changeFileName(event, rightPress) {
    nowChangeFileNameEvent = event;
    if (rightPress) {
        event.target.parentElement.parentElement.innerText = event.target.value;
    }
    else {
        if (event.keyCode === 13) {//回车按键
            event.target.parentElement.parentElement.innerText = event.target.value;
            isChangeFileName = false;
        }
    }
}

init();