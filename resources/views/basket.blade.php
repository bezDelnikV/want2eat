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
            </div>
        </div>
        <div class="suma-all-delivery">
            <h3>Загальна сума замовлення</h3>
            <p id="all-price-delivery"></p>
            <button onclick="openModalOrder()">оформити замовлення</button>
        </div>
    </div>

@endsection
@push('js')
    <script src="{{ asset('/js/BasketScript.js') }}"></script>

@endpush
