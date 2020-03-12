function changeStatus() {
    if ($('#header-menu').attr('class') == 'header-menu disable') {
        $('#header-menu').attr('class', 'header-menu');
        $('.header-btn').attr('class', 'header-btn close');
    } else {
        $('#header-menu').attr('class', 'header-menu disable');
        $('.header-btn').attr('class', 'header-btn');

    }
    console.log($('#header-menu').attr('class'));
}

$(document).ready(function () {
        recountBasketItem();
        let user_info;
        if (localStorage.getItem('client_info') != null) {
            user_info = JSON.parse(localStorage.getItem('client_info'));
            $('#name-order').val(user_info['name-order']);
            $('#email-order').val(user_info['email-order']);
            $('#phone-order').val(user_info['phone-order']);
            $('#city-order').val(user_info['city-order']);
            $('#street-order').val(user_info['street-order']);
            $('#build-order').val(user_info['build-order']);
            $('#room-order').val(user_info['room-order']);
            $('#flat-order').val(user_info['flat-order']);
            $('#porch-order').val(user_info['porch-order']);
            $('#intercom-order').val(user_info['intercom-order']);
            $('#note-order').val(user_info['note-order']);
            $('#count-people-order').val(user_info['count-people-order']);
            if (user_info['date_delivery'] != '') {
                $("#datetimepicker").datetimepicker({
                    date: moment(user_info['date_delivery'], 'DD-MM-YYYY HH:mm'),
                    locale: 'uk'
                });
                changeBtnClass(1);
            }

        } else if (localStorage.getItem('user')) {
            user_info = JSON.parse(localStorage.getItem('user'));
            $('#name-order').val(user_info['first_name'] + ' ' + user_info['last_name']);
            $('#email-order').val(user_info['email']);
            $('#phone-order').val(user_info['phone']);
        }
        if (localStorage.getItem('token') != null) {
            generateProfile();
        }
        $('#datetimepicker').datetimepicker({
            locale: 'uk',
            minDate: new Date()
        });
        generateWebSiteLD();
    }
);

function recountBasketItem() {
    let basket = JSON.parse(sessionStorage.getItem('elements'));
    let count = 0;
    $('#count-delivery-dish').empty();
    if (basket != null) {
        if (basket.length > 0) {
            console.log(basket);
            basket.forEach(el => count += parseInt(el['count']));
            $('#count-delivery-dish').append('(' + count + ')');
        } else {
            $('#count-delivery-dish').empty();

        }
    } else {
        $('#count-delivery-dish').empty();
    }

}

function generateWebSiteLD() {
    let webSite = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": location.href,
        "name": "Доставка їжі Рівне. Піца, суші та інші страви з ресторанів - Хочу Їсти",
        "description": ""
    }
    let script = document.createElement('script');
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(webSite);
    document.getElementsByTagName('body')[0].appendChild(script);
}


