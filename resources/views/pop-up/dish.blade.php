<div class="modal" id="modal-window-dish" style="display: none;">
    <div class="popup-dish-container">
        <button class="close" onclick="closeWindow(this)">×</button>
        <div class="popup-dish-header">
            <img id="modal-dish-img" src="/img/thumb-small.png">
            <h3 id="modal-dish-name"></h3>
        </div>
        <div class="popup-dish-content">
            <p id="modal-dish-desc">макрель, огірок, сир для суші, майонез гострий, кунжут</p>
            <p id="modal-dish-time" class="popup-dish-content-time"></p>
            <div class="popup-dish-content-weight-container">
                <p>Вага:</p>
                <select id="modal-dish-weight" class="popup-dish-content-weight">
                </select>
            </div>
        </div>
        <div class="popup-dish-footer">
            <p id="modal-dish-price"></p>
            <button id="modal-dish-button-save">У кошик</button>
        </div>
    </div>
</div>
