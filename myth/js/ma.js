var ma = ma || {};
ma.bottomAlert = function() {
    $("#sex_choice").on("click", function() {
        baseWap.getMask();
        $(".bottom-alert").show()
    });
    $(".bottom-alert .ba-cancel").on("click", function() { a() });
    $(".bottom-alert li").on("click", function() {
        var b = $(this).attr("id");
        $("#gender").attr("data-code", b);
        a();
        ma.saveGender()
    });


    function a() {
        $(".bottom-alert").hide();
        baseWap.closeMask()
    }
    if ($("#nickName").length > 0) { $("#nickName").on("click", function() { window.location.href = "nickName.html" }) }
    if ($("#modifyNickName").length > 0) { $("#modifyNickName").on("click", function() { ma.saveNickName() }) }
};
ma.avatar = function() {
    var a = $(".avatar img");
    var b = $(".avatar input");
    a.on("click", function() { b.click() });
    b.live("change", function() { ma.uploadHeadPic() })
};
ma.uploadHeadPic = function() {
    probeAuthStatus(function() {
        var img = $("#headPicInput").val();
        if (img == null || img == "") {
            baseWap.alertBox({ type: "mini", msg: "图片为空" });
            return false
        } else {
            if (img.substr(img.length - 4, 4).toLowerCase().match("^.jpg") == null && img.substr(img.length - 5, 5).toLowerCase().match("^.jpeg") == null && img.substr(img.length - 4, 4).toLowerCase().match("^.png") == null && img.substr(img.length - 4, 4).toLowerCase().match("^.gif") == null && img.substr(img.length - 4, 4).toLowerCase().match("^.bmp") == null) {
                baseWap.alertBox({ type: "mini", msg: "图片文件仅支持jpg/jpeg/png/gif/bmp格式" });
                return false
            }
        }
        var url = "http://my.suning.com/wap/uploadHeadPic.do";
        var imgurlbase = "http://image.suning.cn/uimg/cmf/cust_headpic/";
        $("#headPicForm").ajaxSubmit({
            url: url,
            success: function(json) {
                var data;
                try { data = eval("(" + json + ")") } catch (e) {
                    baseWap.alertBox({ type: "mini", msg: "图片文件大小不能超过5M。" });
                    return false
                }
                if (data.returnCode == "0") {
                    var timestamp = Date.parse(new Date());
                    var showUrl = imgurlbase + $("#custNumEncrypt").val() + "_00_120x120.jpg?timestamp=" + timestamp;
                    $(".avatar img").attr("src", showUrl)
                } else {
                    if (data.returnCode == -1) { baseWap.alertBox({ type: "mini", msg: "图片上传失败，请重新上传！" }) } else {
                        if (data.returnCode == -2) { baseWap.alertBox({ type: "mini", msg: "图片文件大小不能超过5M。" }) } else {
                            if (data.returnCode == -3) { baseWap.alertBox({ type: "mini", msg: "图片上传失败，请重新上传！" }) } else {
                                if (data.returnCode == "head_switch_off") { baseWap.alertBox({ type: "mini", msg: data.returnMsg }) } else {
                                    if (data.returnCode == "empty_error") { baseWap.alertBox({ type: "mini", msg: data.returnMsg }) } else {
                                        if (data.returnCode == "suffix_error") { baseWap.alertBox({ type: "mini", msg: data.returnMsg }) } else {
                                            if (data.returnCode == "size_error") { baseWap.alertBox({ type: "mini", msg: "图片尺寸太大" }) } else {
                                                if (data.returnCode == "upload_error") { baseWap.alertBox({ type: "mini", msg: data.returnMsg }) } else {
                                                    if (data.returnCode == "stream_error") { baseWap.alertBox({ type: "mini", msg: data.returnMsg }) } else { baseWap.alertBox({ type: "mini", msg: data.returnMsg }) }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                var $file = $(".avatar input").parent(".avatar");
                $("headPicInput").remove();
                $file.append('<input id="headPicInput" name="headPicInput" type="file" multiple = "multiple"/>')
            },
            error: function() { baseWap.alertBox({ type: "mini", msg: "上传图片失败！请确认图片规格" }) }
        })
    }, function() { ensureLogin(function() { ma.uploadHeadPic() }) })
};
ma.saveNickName = function() {
    var a = $.trim($("#uuid").val());
    var b = $.trim($(".wbox-flex input").val());
    if (!ma.checkNickName(b)) {
        return false
    }
    probeAuthStatus(function() {
        $.ajax({
            url: "http://my.suning.com/wap/modifyNickName.do",
            type: "post",
            async: false,
            data: { nickName: b, uuid: a },
            dataType: "json",
            success: function(c) {
                if (c.returnCode == 0) { window.location.href = "http://my.suning.com/wap/person.do" } else {
                    if (c.returnCode == "1") { baseWap.alertBox({ type: "mini", msg: "您不是企业会员，无法操作！" }) } else {
                        if (c.returnCode == "4") {
                            baseWap.alertBox({ type: "mini", msg: "您的操作已失效，请等页面自动刷新后操作！" });
                            setTimeout(function() { window.location.reload(true) }, 2000)
                        } else {
                            if (c.returnCode == "2") { baseWap.alertBox({ type: "mini", msg: c.returnMsg }) } else { baseWap.alertBox({ type: "mini", msg: "您的网络不给力哦，请稍后再试！" }) }
                        }
                    }
                }
            }
        })
    }, function() { window.location.reload(true) })
};
ma.checkNickName = function(d) {
    var a = /@/;
    var c = /(\s+)/;
    var b = /^[\u4e00-\u9fa5A-Za-z0-9_-]{2,20}$/;
    var e = getBusinessLenForUpdateUserInfo(d);
    if (d.length == 0) {
        baseWap.alertBox({ type: "mini", msg: "昵称不能为空" });
        return false
    } else {
        if (e < 4) {
            baseWap.alertBox({ type: "mini", msg: "昵称长度为4-20个字符" });
            return false
        } else {
            if (e > 20) {
                baseWap.alertBox({ type: "mini", msg: "昵称长度为4-20个字符" });
                return false
            } else {
                if (!hasFullChars(d)) {
                    baseWap.alertBox({ type: "mini", msg: "昵称不支持全角" });
                    return false
                } else {
                    if (a.test(d)) {
                        baseWap.alertBox({ type: "mini", msg: "用户昵称禁止使用“@”符号，请重新输入昵称" });
                        return false
                    } else {
                        if (!checkInvalidChar(d)) {
                            baseWap.alertBox({ type: "mini", msg: "请输入正确的昵称" });
                            return false
                        } else {
                            if (c.test(d)) {
                                baseWap.alertBox({ type: "mini", msg: "用户昵称不能含有空格" });
                                return false
                            } else {
                                if (isAllNumbers(d)) {
                                    baseWap.alertBox({ type: "mini", msg: "昵称不能是纯数字" });
                                    return false
                                } else {
                                    if (!b.test(d)) {
                                        baseWap.alertBox({ type: "mini", msg: "用户昵称格式不正确" });
                                        return false
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return true
};
ma.saveGender = function() {
    var b = $.trim($("#uuid").val());
    var a = $("#gender").attr("data-code");
    probeAuthStatus(function() {
        $.ajax({
            url: "http://my.suning.com/wap/modifyGender.do",
            type: "post",
            async: false,
            data: { gender: a, uuid: b },
            dataType: "json",
            success: function(c) {
                if (c.returnCode == 0) {
                    $("#uuid").val(c.returnObj);
                    $("#gender").html($("#" + a).attr("data-desc"))
                } else {
                    if (c.returnCode == "1") { baseWap.alertBox({ type: "mini", msg: "您不是企业会员，无法操作！" }) } else {
                        if (c.returnCode == "4") {
                            baseWap.alertBox({ type: "mini", msg: "您的操作已失效，请等页面自动刷新后操作！" });
                            setTimeout(function() { window.location.reload(true) }, 2000)
                        } else {
                            if (c.returnCode == "2") { baseWap.alertBox({ type: "mini", msg: c.returnMsg }) } else { baseWap.alertBox({ type: "mini", msg: "您的网络不给力哦，请稍后再试！" }) }
                        }
                    }
                }
            }
        })
    }, function() { window.location.reload(true) })
};
getBusinessLenForUpdateUserInfo = function(d) {
    var a = 0;
    for (var c = 0; c < d.length; c++) {
        var b = d.charCodeAt(c);
        if (19968 <= b && b <= 40869) { a += 2 } else { a++ }
    }
    return a
};
hasFullChars = function(b) {
    for (var a = 0; a < b.length; a++) {
        strCode = b.charCodeAt(a);
        if ((strCode > 65248) || (strCode == 12288)) {
            if (!isChinesepunctuation(b.substring(a, a + 1))) {
                return false
            }
        }
    }
    return true
};
checkInvalidChar = function(b, a) {
    var c;
    if (a && a.length > 0) { c = new RegExp(a) } else { c = new RegExp("[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]") }
    if (b.match(c)) {
        return false
    }
    return true
};
isAllNumbers = function(b) {
    var a = /^[0-9]*$/;
    if (a.test(b)) {
        return true
    }
    return false
};
$(function() {
    ma.bottomAlert();
    ma.avatar()
});
