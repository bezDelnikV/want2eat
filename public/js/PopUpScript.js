function changeAuthorizeFilter(val) {
    if (val == 0) {
        $('#popup-authorize-enter').attr('style', 'display:none;');
        $('#popup-authorize-register').removeAttr('style');
        $($('.popup-authorize-button').children()[0]).attr('class', 'active');
        $($('.popup-authorize-button').children()[1]).removeAttr('class');
    } else {
        $('#popup-authorize-register').attr('style', 'display:none;');
        $('#popup-authorize-enter').removeAttr('style');
        $($('.popup-authorize-button').children()[1]).attr('class', 'active');
        $($('.popup-authorize-button').children()[0]).removeAttr('class');
    }
}

function closeWindow(e) {
    $($(e).parent().parent()).attr('style', 'display:none;');
    $('body').removeAttr('style');
}

function openModal(val) {
    $('#' + val).attr('style', 'display:block;');
    $('body').attr('style', 'overflow:hidden;');
}

function openModalDish(id, with_json_ld = false) {
    $.ajax({
        url: 'https://adm.want2eat.com.ua/api/product/?product_id=' + id,
        method: "GET",
        success: function (data) {
            with_json_ld ? generateJsonLd(data.data.product) : false;
            $('#modal-window-dish').attr('style', 'display:block;');
            $('#modal-dish-name').text(data.data.product.name);
            $('#modal-dish-img').attr('src', data.data.product.photo_url ? 'http://adm.want2eat.com.ua/images/' + data.data.product.photo_url : '/img/thumb-small.png');
            $('#modal-dish-desc').text(data.data.product.info);
            $('#modal-dish-time').text(data.data.product.cook_time);
            $('#modal-dish-price').text(data.data.product.productProperties[0].price)
            $('#modal-dish-weight').empty();
            if (data.data.product.productProperties.length == 1) {
                $('#modal-dish-weight').attr('disabled', true)
            } else {
                $('#modal-dish-weight').removeAttr('disabled');
            }
            for (let i = 0; i < data.data.product.productProperties.length; i++) {
                $('#modal-dish-weight').append($('<option>')
                    .attr('data-id', data.data.product.productProperties[i].id)
                    .attr('data-price', data.data.product.productProperties[i].price)
                    .append(data.data.product.productProperties[i].size + '' + data.data.product.productUnit.name)
                )
            }
            $('#modal-dish-button-save').attr('onclick', 'addToCart()');
        }
    })
}

function generateJsonLd(prod) {
    // console.log(prod);
    var data = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': prod['name'],
        'image': [
            prod['photo_url'] == '' ? window.location.hostname + '/img/thumb-small.png' : 'http://adm.want2eat.com.ua/images/' + prod['photo_url'],
        ],
        'description': prod['info'],
        "offers": {
            "@type": "Offer",
            "url": location.href,
            "priceCurrency": "UAH",
            "price": prod['productProperties'][0]['price'],
            // "itemCondition": "https://schema.org/UsedCondition",
            // "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "Want2Eat"
            }
        }
    };

//creating the script element and storing the JSON-LD
    let script = document.createElement('script');
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(data);
    document.getElementsByTagName('body')[0].appendChild(script);

}


function addToCart() {
    let product_property = $('#modal-dish-weight option:selected').attr('data-id');
    let product = {'product_property': product_property, 'count': 1};
    let elements = [];
    if (sessionStorage.getItem('elements') == null) {
        //якщо нема нічого
        elements.push(product);
        sessionStorage.setItem('elements', JSON.stringify(elements));
    } else {
        elements = JSON.parse(sessionStorage.getItem('elements'));
        let exist = elements.findIndex(item => item['product_property'] == product_property);
        if (exist < 0) {
            elements.push(product);
            sessionStorage.setItem('elements', JSON.stringify(elements));
        } else {
            // console.log(elements[exist]);
            elements[exist]['count']++;
            // console.log(elements[exist]);
            sessionStorage.setItem('elements', JSON.stringify(elements));
        }
    }
    $('#modal-window-dish').attr('style', 'display:none;');
    $('body').removeAttr('style');
    recountBasketItem();
}


function authorizeAndSendOrder() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($('#email-order').val())) {
        $.ajax({
            url: 'https://adm.want2eat.com.ua/api/auth/?',
            method: 'POST',
            dataType: 'json',
            data: {
                identificate: $('#email-order').val(),
                password: '',
                first_name: $('#name-order').val(),
                last_name: '',
                phone: $('#phone-register').val(),
            },
            success: function (data) {
                // console.log(data);
                if (data.code == 200) {
                    localStorage.setItem('token', data.data.user.token);
                    delete data.data.user.token;
                    localStorage.setItem('user', JSON.stringify(data.data.user));
                    $('body').removeAttr('style');
                    // generateProfile();
                    user_info = JSON.parse(localStorage.getItem('user'));
                    $('#name-order').val(user_info['first_name'] + ' ' + user_info['last_name']);
                    $('#email-order').val(user_info['email']);
                    $('#phone-order').val(user_info['phone']);
                    send();
                } else {
                    alert(data.message);
                }

            }

            ,
            error: function (data) {
                console.log(data);
            }
        })
        ;
    } else {
        alert("Не вірний email адрес!");
    }
}

function register() {
    if ($('#password-register').val().length < 6) {
        alert('Пароль закороткий');
    } else if ($('#password-register').val() != $('#return-password-register').val()) {
        alert('Паролі не збігаються');
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($('#email-register').val())) {
        $.ajax({
            url: 'https://adm.want2eat.com.ua/api/auth/?',
            method: 'POST',
            dataType: 'json',
            data: {
                identificate: $('#email-register').val(),
                password: $.md5($('#password-register').val()),
                first_name: $('#name-register').val(),
                last_name: $('#surname-register').val(),
                email: $('#email-register').val(),
                first_name: $('#name-register').val(),
                phone: $('#phone-register').val(),
            },
            success: function (data) {
                if (data.code == 200) {
                    localStorage.setItem('token', data.data.user.token);
                    delete data.data.user.token;
                    localStorage.setItem('user', JSON.stringify(data.data.user));
                    $('body').removeAttr('style');
                    // generateProfile();
                } else if (data.code == 400) {
                    alert(data.message);
                } else {
                    alert(data.message);
                }

            },
            error: function (data) {
                console.log(data);
            }
        });
    } else {
        alert("Не вірний email адрес!");
    }
}

function clientAddressInfo(redirect = false) {
    let validate = true;
    let regaxPhone = '^(38)?0[0-9]{2}[0-9]{7}$';
    let regaxEmail = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
    if ($('#phone-order').val().match(regaxPhone) == null) {
        validate = false;
    }
    if ($('#email-order').val().match(regaxEmail) == null) {
        validate = false;
    }
    validate = $('#name-order').val() ? validate : false;
    validate = $('#city-order').val() ? validate : false;
    validate = $('#street-order').val() ? validate : false;
    validate = $('#build-order').val() ? validate : false;
    if (validate) {
        let data_delivery;
        if ($('#order-div-button-second').attr('class') == 'active') {
            data_delivery = '';
        } else {
            data_delivery = $('#datetimepicker').val();
        }
        let client_info = {
            'name-order': $('#name-order').val(),
            'email-order': $('#email-order').val(),
            'phone-order': $('#phone-order').val().match(regaxPhone)[0],
            'city-order': $('#city-order').val(),
            'street-order': $('#street-order').val(),
            'build-order': $('#build-order').val(),
            'room-order': $('#room-order').val(),
            'flat-order': $('#flat-order').val(),
            'porch-order': $('#porch-order').val(),
            'intercom-order': $('#intercom-order').val(),
            'note-order': $('#note-order').val(),
            'count-people-order': $('#count-people-order').val(),
            'date_delivery': data_delivery,
        };
        localStorage.setItem('client_info', JSON.stringify(client_info));
        if (redirect) {
            window.location.href = '/cart';
        } else {
            $('#modal-window-order').attr('style', 'display:none;');
            $('body').removeAttr('style');
            let client_info = JSON.parse(localStorage.getItem('client_info'));
            getGeocode(client_info['street-order'] + ', ' + client_info['build-order'] + ', ' + client_info['city-order']);
        }
    } else {
        // console.log(validate);
        alert("Будь-ласка, заповніть всі необхідні поля правильно!");
    }
}

function redirectToCart() {
    if (window.location.pathname != '/cart') {
        window.location.pathname = '/cart'
    }
}

function openModalOrder() {
    openModal('modal-window-order');
}


function changeBtnClass(elem) {
    if (elem == 1) {
        $('#datetimepicker').attr('class', 'later active');
        $('#order-div-button-second').attr('class', 'disable');
    } else {
        $('#order-div-button-second').attr('class', 'active');
        $('#datetimepicker').attr('class', 'later disable');
    }
}

// function generateProfile() {
//     $('#profile-info').empty();
//
//     $('#profile-info').append($('<div>')
//         .append($('<a>')
//             .attr('href', 'javascript://')
//             .attr('onclick', 'openModal(\'modal-window-prodile\')')
//             .append('Профіль')
//         ));
//     let user = JSON.parse(localStorage.getItem('user'));
//     $('#profile-name').val(user['first_name'] + ' ' + user['last_name']);
//     $('#profile-email').val(user['email']);
//     $('#profile-phone').val(user['phone']);
// }


function update() {
    let data = {};
    let first_name = $('#profile-name').val();
    let last_name = first_name.split(' ')[1] ? first_name.split(' ')[1] : '';
    first_name = first_name.split(' ')[0] ? first_name.split(' ')[0] : '';
    let phone = $('#profile-phone').val();
    let password = $('#profile-password').val();
    let validate = true;
    // console.log('first_name', first_name);
    // console.log('last_name', last_name);
    data = {
        'token': localStorage.getItem('token'),
        'phone': phone,
        'first_name': first_name,
        'last_name': last_name,
    }
    if (phone.match(/^(38)?0[0-9]{2}[0-9]{7}/) == null) {
        alert('Не валідний номер телефону!');
        validate = false;
    }

    if (password != $('#profile-password-repeat').val()) {
        alert('Паролі не співпадають!');
        validate = false;

    }

    if (password.length != 0) {
        data['password'] = $.md5(password);
        if (password.length < 6) {
            alert('Пароль має містити принаймні 6 символів!');
            validate = false;
        }
    }
    if (!first_name.replace(/ /g, '') && !last_name.replace(/ /g, '')) {
        alert('Не валідне ім\'я та(або) прізвище!');
        validate = false;
    }

    if (validate) {
        $.ajax({
            url: 'https://adm.want2eat.com.ua/api/auth/update/',
            method: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
                // console.log(data);
                $('#profile-password').empty();
                $('#profile-password-repeat').empty();
            },
            error: function (data) {
                sessionStorage.removeItem('user');
                sessionStorage.removeItem('token');
                alert('Будь ласка повторіть авторизацію!');
            }
        });
    }
}
