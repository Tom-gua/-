var bindEvents = function() {
    bindEventLArrow()
    bindEventRArrow()
    bindEventText()
    bindEventImgs()
    bindEventSubmit()
    bindEventDelete()
}

var bindEventLArrow = function() {
    $('.l-arrow').on('click',function(event) {
        var target = $(event.target)
        console.log(target)
        console.log('点击了左边按钮')
        if (target.hasClass('gua-left-arrow')) {
            var position = '200px'
            var className = '.gua-input-name'
            tabAction('left',className, position)
            // 把按钮转换方向,并且加上相应的类
            $('.l-arrow').html('&lt;')
            $('.l-arrow').removeClass('gua-left-arrow')
        } else {
            var position = '0px'
            var className = '.gua-input-name'
            tabAction('left',className, position)
            $('.l-arrow').html('&gt;')
            $('.l-arrow').addClass('gua-left-arrow')
            var inputName = $('.gua-inputName-area').val()
            xingMing = inputName
            // 清空
            $('.gua-inputName-area').val('')
        }
    })
}

var bindEventRArrow = function() {
    $('.r-arrow').on('click',function(event) {
    var target = $(event.target)
    console.log(target)
    console.log('点击了右边按钮')
    if (target.hasClass('gua-right-arrow')) {
        var position = '-2px'
        var className = '.gua-select-img'
        tabAction('right',className, position)
        // 把按钮转换方向,并且加上相应的类
        $('.r-arrow').html('&gt;')
        $('.r-arrow').removeClass('gua-right-arrow')
    } else {
        var position = '-80px'
        var className = '.gua-select-img'
        tabAction('right',className, position)
        $('.r-arrow').html('&lt;')
        $('.r-arrow').addClass('gua-right-arrow')
        }
    })
}

var bindEventText = function() {
    $('.gua-text').on('keyup', function(event) {
        const allLength = 140
        var length = $('.gua-text').val().length
        var rest = allLength - length
        $('.gua-number').text(rest)
    })
}

var bindEventImgs = function() {
    $('.gua-imgs').on('click', function(event) {
        var target = $(event.target)
        var src = target.attr('src')
        ziYuan = `${src}`
        var position = '-80px'
        var className = '.gua-select-img'
        tabAction('right',className, position)
        $('.r-arrow').html('&lt;')
        $('.r-arrow').addClass('gua-right-arrow')
    })
}

var bindEventDelete = function() {
    $('.gua-all-comment').on('click','.gua-comment-main',function(event) {
        // 需要删除相对应的组件， 需要的点击的下标
        console.log('点击了删除按钮',event)
        var target = event.target
        if (target.classList.contains('gua-delete')) {
            var deleteUser = event.target.parentElement
            var index = indexOfElement(deleteUser)
            userInformation.splice(index, 1)
            saveUser()
            deleteUser.remove()
        }
    })
}

var indexOfElement= function(element) {
    var parent = element.parentElement
    for (var i = 0; i < parent.length; i++) {
        var a = parent[i]
        if (a === element) {
            return i
        }
    }

}

var bindEventSubmit = function() {
    $('.gua-submit-button').on('click', function() {
        var user = {
            name: `${xingMing}`,
            src: `${ziYuan}`,
            text: textOfClick(),
            date: date(),
        }
        console.log('user.src',user.src)
        userInformation.push(user)
        saveUser()
        console.log(userInformation)
        showMessage(user)
        $('.gua-text').val('')
        $('.gua-number').text('140')
    })
}

var tabAction = function(arrow, className, position) {
    if (arrow === "left") {
        $(className).animate({
            "left": position
        },"fast")
    } else {
        $(className).animate({
            "right": position
        },"fast")
    }
}

var showMessage = function(user) {
    var html = `
     <div class="gua-comment-main">
        <img class='gua-imgs img-circle' src=${user.src} alt=""/>
        <div class="gua-information">
            <div class="gua-content">
                <span>${user.name}:</span>
                <span>${user.text}<span>
            </div>
            <div class="gua-date">
                ${user.date}
            </div>
        </div>
        <span class="gua-delete">删除</span>
        <hr class="gua-dash-line"/>
      </div>

    `
    $('.gua-all-comment').append(html)
}

var nameOfClick = function() {
    var name = $('gua-inputName-area').val()
    return name
}

var date = function() {
    var time = dateOfMake()
    return time
}

var dateOfMake = function() {
    var d = new Date()
    var year = d.getFullYear()
    var month = d.getMonth()  + 1
    var day = d.getDate()
    return `${year}年${month}月${day}日`
}

var textOfClick = function() {
    var message = $('.gua-text').val()
    return message
}

var saveUser = function() {
    var s = JSON.stringify(userInformation)
    localStorage.userInformation = s
}

var loadUser = function() {
    var s = localStorage.userInformation
    return JSON.parse(s)
}

var initUsers = function() {
    userInformation = loadUser()
    console.log('初始化', userInformation)
    for (var i = 0; i < userInformation.length; i++) {
        var user = userInformation[i]
        console.log('user',user)
        showMessage(user)
    }
}

var __main = function() {
    bindEvents()
    initUsers()
}

var userInformation = []
var xingMing = ''
var ziYuan = ''
__main()
