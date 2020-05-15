var AllFullPrice = 0;
var ShopDeliveryInfo = [];
var RegionSettings = {'settings': '', 'location': '', 'formatted_address': ''};
var Client;
$(document).ready(function () {
    let elements = JSON.parse(sessionStorage.getItem('elements'));
    Client = sessionStorage.getItem('client');
    let elemIds = '';
    if (elements != null) {
        elements.forEach(element => elemIds = elemIds + element['product_property'] + ',');
        elemIds = elemIds.substring(0, elemIds.length - 1);
        generateContent(elemIds, elements);
    }

});

function recountAllFullPrice() {
    let price = 0;
    ShopDeliveryInfo.forEach(el => {
        el['is_delivery'] == 1 ? price += el['delivery_price'] : false;
        el['productProperties'].forEach(item => {
            price += (parseInt(item['price']) + parseInt(item['price_pack'])) * parseInt(item['count']);
        });
    });
    AllFullPrice = price;
    $('#all-price-delivery').text(price.toFixed(2));

}

function deliveryDistance(shop_address, client_address, region_address, category, iterator) {
    $.ajax({
        url: '/proxy.php?shop_address=' + shop_address + '&client_address=' + client_address + '&region_address=' + region_address + '&category=' + category,
        method: "GET",
        success: function (data) {
            let rout = JSON.parse(data)['routes'][0];
            let distance_delivery = 0;
            let delivery_min_distance = parseInt(RegionSettings['settings'].find(el => el['settings_key_id'] == 'delivery_min_distance')['value']);
            let delivery_min_price = parseInt(RegionSettings['settings'].find(el => el['settings_key_id'] == 'delivery_min_price')['value']);
            let delivery_price_for_km = parseInt(RegionSettings['settings'].find(el => el['settings_key_id'] == 'delivery_price_for_km')['value']);
            let delivery_price = 0;
            if (rout != undefined) {
                rout['legs'].forEach(el => {
                    distance_delivery += el['distance']['value'];
                });
                distance_delivery = distance_delivery / 1000;
                if (distance_delivery <= delivery_min_distance) {
                    delivery_price = delivery_min_price;
                } else {
                    delivery_price = delivery_min_price + ((distance_delivery - delivery_min_distance) * delivery_price_for_km);
                }
            }
            ShopDeliveryInfo[iterator]['delivery_start_price'] = delivery_price;
            let buttons = $('#delivery-button-shop-id-' + ShopDeliveryInfo[iterator]['id']).parent().children();
            $(buttons[0]).attr('class', 'active-btn');
            $(buttons[0]).attr('disabled', false);
            $(buttons[1]).attr('class', 'disable-btn');
            ShopDeliveryInfo[iterator]['is_delivery'] = 1;
            $('#btn-delivery-span-id-' + ShopDeliveryInfo[iterator]['id']).text(delivery_price.toFixed(2));
            if (ShopDeliveryInfo.length - 1 > iterator) {
                shopSettingsRecount(ShopDeliveryInfo[iterator]['id']);
                iterator += 1;
                deliveryDistance(ShopDeliveryInfo[iterator]['street'] + ', ' + ShopDeliveryInfo[iterator]['build'] + ', ' + ShopDeliveryInfo[iterator]['city'] + ", Рівненська область,33000", client_address, region_address, 13, iterator);
            } else {
                shopSettingsRecount(ShopDeliveryInfo[iterator]['id'], true);
            }
        }
    });
}

function getGeocode(address, end_address = false) {
    $.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&language=uk&sensor=false&key=AIzaSyDzXAzUwHGGt1msT_VUpU5te1GI2_iPLG0',
        method: "GET",
        success: function (data) {

                RegionSettings['formatted_address'] = data['results'][0]['formatted_address'];
                RegionSettings['location'] = data['results'][0]['geometry']['location'];
            if (data['status'] != 'ZERO_RESULTS') {
                if (ShopDeliveryInfo.length > 0) {
                    let full_shop_address = ShopDeliveryInfo[0]['street'] + ', ' + ShopDeliveryInfo[0]['build'] + ', ' + ShopDeliveryInfo[0]['city'] + ", Рівненська область,33000";
                    deliveryDistance(full_shop_address, full_shop_address, RegionSettings['formatted_address'], 13, 0);
                }
            } else {
                ShopDeliveryInfo.forEach(el => {
                    let buttons = $('#delivery-button-shop-id-' + el['id']).parent().children();
                    $(buttons[0]).attr('class', 'disable-btn');
                    $(buttons[0]).attr('disabled', true);
                    $(buttons[1]).attr('class', 'active-btn');
                    el['delivery_price'] = 0;
                    el['delivery_start_price'] = 0;
                    el['is_delivery'] = 0;
                });
                recountAllFullPrice();
            }
        }

    });
}

function getRegion() {
    $.ajax({
        url: 'https://adm.want2eat.com.ua/api/settings/client/?region_id=1',
        method: "GET",
        success: function (data) {
            RegionSettings['settings'] = data.data.settings;
            getGeocode(data.data['settings'][0]['value'], true);
        }
    });
}

function shopSettingsRecount(shop_id, recount = false) {
    let shop = ShopDeliveryInfo.find(el => el['id'] == shop_id);
    let settings = shop['shopSetting'];
    // console.log('shop:', shop);
    if (settings['is_delivery_free'] == 1) {
        if (settings['delivery_free_sum_min'] != null && shop['full_price_products'] >= settings['delivery_free_sum_min']) {
            shop['delivery_price'] = 0;
        } else if (settings['delivery_half_free_sum_min'] != null && shop['full_price_products'] >= settings['delivery_half_free_sum_min']) {
            let onePercent;
            onePercent = shop['delivery_start_price'] / 100 * settings['delivery_half_free_value'];
            if (settings['delivery_half_free_limit'] == null || onePercent <= settings['delivery_half_free_limit']) {
                shop['delivery_price'] = shop['delivery_start_price'] - onePercent;
            } else {
                shop['delivery_price'] = shop['delivery_start_price'] - settings['delivery_half_free_limit'];
            }
        }
    } else {
        shop['delivery_price'] = shop['delivery_start_price'];
    }

    if (shop['is_delivery'] == 1) {
        $('#p-shop-id-' + shop_id).text((shop['full_price_products'] + shop['delivery_price']).toFixed(2));
    } else {
        $('#p-shop-id-' + shop_id).text(shop['full_price_products']);
    }
    if (recount) {
        recountAllFullPrice();
    }
}

function generateContent(elements, storage) {
    $.ajax({
        url: 'https://adm.want2eat.com.ua/api/product-property/from-order/?product_property_ids=' + elements,
        method: "GET",
        success: function (data) {
            // console.log(data);
            let shops = data.data['shopFromPropertyProducts'];
            shops.forEach(shop => {
                let element = JSON.parse(sessionStorage.getItem('elements'));
                shop['productProperties'].forEach(el => {
                    el['count'] = element.find(item => item['product_property'] == el['product_property_id'])['count'];
                });
                let fullPrice = 0;
                shop['productProperties'].forEach(prod => {
                    let ItemsPrice = (parseInt(prod['price']) + parseInt(prod['price_pack'])) * prod['count'];
                    fullPrice = parseInt(fullPrice) + parseInt(ItemsPrice);
                });
                shop['full_price_products'] = fullPrice;
                shop['is_delivery'] = 1;
                ShopDeliveryInfo.push(shop);
                $('#basket-container').append($('<div>')
                    .attr('class', 'container-for-item')
                    .append($('<div>')
                        .attr('class', 'basket-container-item')
                        .append($('<div>')
                            .attr('class', 'basket-container-item-header')
                            .append($('<img>')
                                .attr('src', 'http://adm.want2eat.com.ua/images/' + shop.photo_url))
                            .append($('<h4>').append(shop.name)))
                        .append($('<div>')
                            .attr('class', 'basket-container-item-content')
                            .attr('id', 'shop-container-' + shop.id)
                        )
                        .append($('<div>')
                            .attr('class', 'basket-container-suma')
                            .append($('<p>').attr('id', 'p-red-full-price-' + shop.id).append(fullPrice))
                        )
                    )
                    .append($('<div>')
                        .attr('class', 'basket-shop-suma')
                        .append($('<button>')
                            .attr('class', 'active-btn')
                            .attr('id', 'delivery-button-shop-id-' + shop.id)
                            .attr('onclick', 'changeBtn(this,' + shop.id + ')')
                            .append('Доставка = ')
                            .append($('<span>').append('0').attr('id', 'btn-delivery-span-id-' + shop.id))
                            .append(' грн')
                        )
                        .append($('<button>')
                            .attr('class', 'disable-btn')
                            .attr('onclick', 'changeBtn(this,' + shop.id + ')')
                            .append('Самовивіз')
                        )
                        .append($('<p>').attr('id', 'p-shop-id-' + shop.id).append(fullPrice))
                    )
                );
                getProducts(shop);
            });
            getRegion();
        }
    })
}

function getProducts(shop) {
    let elements = JSON.parse(sessionStorage.getItem('elements'));
    let products = shop['productProperties'];

    products.forEach(element => {
            $('#shop-container-' + shop.id).append($('<div>')
                .attr('class', 'dish-info-item')
                .append($('<div>')
                    .attr('class', 'close-dish-info-item')
                    .append($('<button>').attr('onclick', 'deleteProd(this,' + element['product_property_id'] + ')')))
                .append($('<div>')
                    .attr('class', 'content-dish-info-item')
                    .append($('<div>')
                        .attr('class', 'info-dish-price')
                        .append($('<h4>').append(element.name))
                        .append($('<p>')
                            .append(element['size'] + ' ' +
                                element['product_unit_name'] + ' / ' +
                                element['price'] + ' грн'))
                        .append($('<div>')
                            .attr('class', 'content-dish-info-item-buttons')
                            .append($('<button>')
                                .attr('onclick', 'reductionCount(' + shop.id + ',' + element['product_property_id'] + ')')
                                .append("-"))
                            .append($('<input>')
                                .attr('readonly', true)
                                .attr('value', elements.find(item => item['product_property'] == element['product_property_id'])['count'])
                                .attr('id', 'input-prod-id-' + element['product_property_id'] + '-shop-id-' + shop.id)
                            )
                            .append($('<button>')
                                .attr('onclick', 'incrementCount(' + shop.id + ',' + element['product_property_id'] + ')')
                                .append("+"))
                        )
                        .append($('<p>')
                            .attr('id', 'p-prod-id-' + element['product_property_id'] + '-shop-id-' + shop.id)
                            .append(parseInt(element.price) * parseInt(elements.find(item => item['product_property'] == element['product_property_id'])['count']))))
                    .append($('<div>')
                        .attr('class', 'dish-info-pack')
                        .append($('<h4>').append('Упаковка'))
                        .append($('<p>').append('1ш. / ' + element['price_pack'] + ' грн'))
                        .append($('<p>').attr('id', 'id-pack-price-' + element['product_property_id']).append(parseInt(element['price_pack']) * parseInt(elements.find(item => item['product_property'] == element['product_property_id'])['count'])))
                    )
                )
            )
        }
    );


}

function reductionCount(shopId, prodId) {
    let element = JSON.parse(sessionStorage.getItem('elements'));
    let id = element.findIndex(elem => elem['product_property'] == prodId);
    let shop = ShopDeliveryInfo.find(el => el['id'] == shopId);
    if (element[id]['count'] > 1) {
        element[id]['count'] = parseInt(element[id]['count']) - 1;
        shop['productProperties'].find(el => el['product_property_id'] == prodId)['count'] -= 1;
        $('#input-prod-id-' + prodId + '-shop-id-' + shopId).attr('value', element[id]['count']);
        sessionStorage.removeItem('elements');
        sessionStorage.setItem('elements', JSON.stringify(element));
        recountShopPrice(shopId);
        recountRedPrice(shopId);
        shopSettingsRecount(shopId, true);
        recountProdPrice(prodId, shopId);
    }
}

function incrementCount(shopId, prodId) {
    let element = JSON.parse(sessionStorage.getItem('elements'));
    let id = element.findIndex(elem => elem['product_property'] == prodId);
    let shop = ShopDeliveryInfo.find(el => el['id'] == shopId);
    // console.log(shop['productProperties'].find(el => el['product_property_id'])['count']);
    shop['productProperties'].find(el => el['product_property_id'] == prodId)['count'] += 1;

    element[id]['count'] = parseInt(element[id]['count']) + 1;
    $('#input-prod-id-' + prodId + '-shop-id-' + shopId).attr('value', element[id]['count']);
    sessionStorage.removeItem('elements');
    sessionStorage.setItem('elements', JSON.stringify(element));
    recountShopPrice(shopId);
    recountRedPrice(shopId);
    shopSettingsRecount(shopId, true);
    recountProdPrice(prodId, shopId);
}

function changeBtn(element, shop_id) {
    let buttons = $(element).parent().children();
    let shop = ShopDeliveryInfo.find(el => el['id'] == shop_id);
    if (buttons[0] == element) {
        ShopDeliveryInfo.find(el => el['id'] == shop_id)['is_delivery'] = 1;
        $(buttons[1]).attr('class', 'disable-btn');
        $(buttons[0]).attr('class', 'active-btn');
    } else {
        ShopDeliveryInfo.find(el => el['id'] == shop_id)['is_delivery'] = 0;
        $(buttons[0]).attr('class', 'disable-btn');
        $(buttons[1]).attr('class', 'active-btn');
    }
    shopSettingsRecount(shop_id, true);
}

function deleteProd(btn, prodId) {
    // console.log(ShopDeliveryInfo);
    let shop = ShopDeliveryInfo.find(el => el['productProperties'].find(item => item['product_property_id'] == prodId) != undefined);
    let product_index = shop['productProperties'].findIndex(el => el['product_property_id'] == prodId);
    shop['productProperties'].splice(product_index, 1);
    if (shop['productProperties'].length == 0) {
        ShopDeliveryInfo.splice(ShopDeliveryInfo.findIndex(el => el['id'] == shop['id']), 1);
        $($(btn).parent().parent().parent().parent().parent()).remove();
    } else {
        $($(btn).parent().parent()).remove();
        recountShopPrice(shop['id']);
        recountRedPrice(shop['id']);
    }
    let elements = JSON.parse(sessionStorage.getItem('elements'));
    let elemId = elements.findIndex(item => item['product_property'] == prodId);
    elements.splice(elemId, 1);
    sessionStorage.removeItem('elements');
    sessionStorage.setItem('elements', JSON.stringify(elements));

    recountAllFullPrice();
}


function send() {
    let validate = true;
    let regaxPhone = '[3,8]{2}?0[0-9]{2}[0-9]{7}$';
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
    clientAddressInfo();
    if (validate) {
        let client_info = JSON.parse(localStorage.getItem('client_info'));
        let order = [];
        ShopDeliveryInfo.forEach(el => {
            let products = [];
            el['productProperties'].forEach(item => {
                delete item['info'];
                delete item['photo_url'];
                products.push(item);
            })
            let shop = {
                'shop_id': el['id'],
                'productOrders': el['productProperties'],
                'delivery_price': el['delivery_price'],
                'is_delivery': el['is_delivery'],
                'is_cash': '0',
                'is_paid': '0'
            };
            order.push(shop);
        });
        let date_delivery = "";
        if (client_info['date_delivery'] != "") {
            date_delivery = moment(client_info['date_delivery'], 'DD-MM-YYYY HH:mm').unix();
        }
        $.ajax({
            url: 'https://adm.want2eat.com.ua/api/order/create/',
            method: 'POST',
            dataType: 'json',
            data: {
                token: localStorage.getItem('token'),
                city: client_info['city-order'],
                street: client_info['street-order'],
                build: client_info['build-order'],
                order: JSON.stringify(order),
                is_address_confirmed: '0',
                entrance: client_info['porch-order'],
                domophone_code: client_info['intercom-order'],
                level: client_info['flat-order'],
                room: client_info['room-order'],
                note: client_info['note-order'],
                person_count: client_info['count-people-order'],
                date_delivery: date_delivery,
            },
            success: function (data) {
                // console.log(data);
                if (data['code'] == 200) {
                    $('#popup-result-span').empty();
                    $('#popup-result-span').append(data.data.order.id);
                    $('#modal-window-result').attr('style', 'display:block;');
                    $('body').attr('style', 'overflow:hidden;');
                    sessionStorage.removeItem('elements');

                }
                if (data['code'] == 400) {
                    alert(data.message);
                }
            },
            error: function (data) {
                sessionStorage.removeItem('user');
                sessionStorage.removeItem('token');
                alert('Будь ласка повторіть авторизацію!');
            }
        })
    }
}

function recountShopPrice(shopId) {
    let shop = ShopDeliveryInfo.find(el => el['id'] == shopId);
    let price = 0;
    if (shop['is_delivery'] == 1) {
        price += shop['delivery_price'];
    }
    shop['productProperties'].forEach(el => {
        price += (parseInt(el['price']) + parseInt(el['price_pack'])) * parseInt(el['count']);
    });
    $('#p-shop-id-' + shopId).text(price);
}

function recountRedPrice(shopId) {
    let shop = ShopDeliveryInfo.find(el => el['id'] == shopId);
    let price = 0;
    shop['productProperties'].forEach(el => {
        price += (parseInt(el['price']) + parseInt(el['price_pack'])) * parseInt(el['count']);
    });
    shop['full_price_products'] = price;
    $('#p-red-full-price-' + shopId).text(price);
}

function recountProdPrice(propertyId, shopId) {
    let shop = ShopDeliveryInfo.find(el => el['id'] == shopId);
    let product = shop['productProperties'].find(el => el['product_property_id'] == propertyId);
    let price_product = parseInt(product['price']) * parseInt(product['count']);
    let price_pack = parseInt(product['price_pack']) * parseInt(product['count']);
    $('#p-prod-id-' + propertyId + '-shop-id-' + shopId).text(price_product);
    $('#id-pack-price-' + propertyId).text(price_pack);
}

function closeResult() {
    $('#modal-window-result').attr('style', 'display:none');
    $('body').removeAttr('style');
    window.location.href = "/";
}

function generateBreadBasketWindow() {
    let jsonBreadcrumb = {
        '@context': "https://schema.org",
        '@type': "BreadcrumbList",
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Доставка їжі Рівне. Піца, суші та інші страви з ресторанів - Хочу Їсти',
                'item': '',
            }
        ]
    };
}
