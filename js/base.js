$(function () {
    var right = $('.menu-btn');
    var bg = $('.bgDiv');
    var rightNav = $('.nav');
    showNav(right, rightNav, "right");
    function showNav(btn, navDiv, direction) {
        btn.on('click', function () {
            bg.css({
                display: "block",
                transition: "opacity .5s"
            });
            if (direction == "right") {
                navDiv.css({
                    right: "0px",
                    transition: "right 1s"
                });
            }

        });
    }
    bg.on('click', function () {
        hideNav();
    });
    function hideNav() {
        rightNav.css({
            right: "-50%",
            transition: "right .5s"
        });
        bg.css({
            display: "none",
            transition: "display 1s"
        });
    }
});



$(function () {
    $(".search").click(function () {
        if ($(this).hasClass("click_off")) {
            $(this).removeClass("click_off");
            $("body").removeClass("on");
        } else {
            $(this).addClass("click_off");
            $("body").addClass("on");
            $("#searchKey").focus();
        }
    });

    $("#searchKey").blur(function () {

        $(".search").removeClass("click_off");
        $("body").removeClass("on");

    });
    $("#submitSearch").click(function () {
        if ($("#searchKey").val() != "") {
            window.location.href = "search.html?key=" + $("#searchKey").val();
        }
    });
    $("#searchKey").keyup(function (event) {
        if (event.keyCode == 13) {
            if ($("#searchKey").val() != "") {
                window.location.href = "search.html?key=" + $("#searchKey").val();

            }
        }
    });

})


//���ָ�ʽ��ǧ�ַ�
function format(num) {
    return (num + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');

}
//**
//* ��ҳ��@param����������ÿҳ��������
//*
function pageTotal(rowCount, pageSize) {

    if (rowCount == null || rowCount == "") {
        return 0;
    } else {
        if (pageSize != 0 &&
            rowCount % pageSize == 0) {
            return parseInt(rowCount / pageSize);
        }
        if (pageSize != 0 &&
            rowCount % pageSize != 0) {
            return parseInt(rowCount / pageSize) + 1;
        }
    }
}
// ��ȡurl����
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // ����һ������Ŀ��������������ʽ����

    var r = window.location.search.substr(1).match(reg); // ƥ��Ŀ�����

    if (r != null)
        return unescape(r[2]);
    return null; // ���ز���ֵ

}

function getInervalHour(startDate, endDate) {
    var ms = endDate.getTime() - startDate.getTime();
    if (ms < 0) return 0;
    return Math.floor(ms / 1000 / 60 / 60);
}
