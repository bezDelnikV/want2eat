@extends('layouts.HeaderAndFooter')

@push('css')
    <link href="{{ asset('/css/BasketStyle.css') }}" rel="stylesheet">
@endpush
@section('main')
    @include('pop-up.result')
    <div class="tool-bar">
        <a href="/">
            <img src="/img/home.svg">
        </a>
        <a href="/shops">Заклади</a>
        <a href="/cart/">Оформлення замовлення</a>
    </div>
    <div class="main-basket">
        <div class="main-basket-container">
            <h1>Оформлення замовлення</h1>
            <div id="basket-container" class="basket-container">
                <p class="change-address" onclick="openModalOrder()"><span></span> Змінити адресу</p>
                {{--                /* <div class="container-for-item">--}}
                {{--                    <div class="basket-container-item">--}}
                {{--                        <div class="basket-container-item-header">--}}
                {{--                            <img src="http://adm.want2eat.com.ua/images/72a1fdf27f2f67ade1c05c6739e681d6.jpg">--}}
                {{--                            <h4>Name</h4>--}}
                {{--                        </div>--}}
                {{--                        <div class="basket-container-item-content">--}}
                {{--                            <div class="dish-info-item">--}}
                {{--                                <div class="close-dish-info-item">--}}
                {{--                                    <button></button>--}}
                {{--                                </div>--}}
                {{--                                <div class="content-dish-info-item">--}}
                {{--                                    <div class="info-dish-price">--}}
                {{--                                        <h4>Вареник з картоплею</h4>--}}
                {{--                                        <p>0/7 л. / 1400 грн</p>--}}
                {{--                                        <div class="content-dish-info-item-buttons">--}}
                {{--                                            <button>-</button>--}}
                {{--                                            <input readonly value="1">--}}
                {{--                                            <button>+</button>--}}
                {{--                                        </div>--}}
                {{--                                        <p>37.00</p>--}}
                {{--                                    </div>--}}
                {{--                                    <div class="dish-info-pack">--}}
                {{--                                        <h4>Упаковка</h4>--}}
                {{--                                        <p>1ш. / 5 грн</p>--}}
                {{--                                        <p>5</p>--}}
                {{--                                    </div>--}}
                {{--                                </div>--}}
                {{--                            </div>--}}
                {{--                        </div>--}}
                {{--                        <div class="basket-container-suma">--}}
                {{--                            <p>93</p>--}}
                {{--                        </div>--}}
                {{--                    </div>--}}
                {{--                    <div class="basket-shop-suma">--}}
                {{--                        <button class="disable-btn" onclick="changeBtn(this)">Доставка = 0 грн</button>--}}
                {{--                        <button class="active-btn" onclick="changeBtn(this)">Самовивіз</button>--}}
                {{--                        <p>134</p>--}}
                {{--                    </div>--}}
                {{--                </div>*/--}}
            </div>
        </div>
        <div class="suma-all-delivery">
            <h3>Загальна сума замовлення</h3>
            <p id="all-price-delivery"></p>
            <button onclick="send()">оформити замовлення</button>
        </div>
    </div>

@endsection
@push('js')
    <script src="{{ asset('/js/BasketScript.js') }}"></script>

@endpush
