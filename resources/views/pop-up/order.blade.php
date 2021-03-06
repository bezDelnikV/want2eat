<div class="modal order-modal" id="modal-window-order" style="display: none;">
    <div class="popup-dish-container">
        <button class="close" onclick="closeWindow(this)">×</button>
        <h4>Інформація для доставки</h4>
        <h5>Персональна інформація</h5>
        <div class="modal-order-personal-info">
            <div class="modal-order-personal-labels">
                <div>
                    <input required type="text" name="name" id="name-order" placeholder=" ">
                    <span>Ім'я Прізвище</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.32757 11.5279L3.88477 8.59349L4.82277 7.587L7.12834 9.55224L11.0422 4.63396L12.1649 5.44952L7.32757 11.5279Z"
                            fill="#C4C4C4"></path>
                        <path
                            d="M8 16C6.41784 16 4.8712 15.5309 3.55566 14.6519C2.24011 13.7729 1.21473 12.5236 0.609166 11.0619C0.00360378 9.60026 -0.154944 7.99183 0.15357 6.44004C0.462083 4.88825 1.2238 3.46278 2.34242 2.34388C3.46103 1.22498 4.8863 0.46289 6.43801 0.153974C7.98972 -0.154942 9.59819 0.00318901 11.06 0.608372C12.5219 1.21355 13.7714 2.23861 14.6507 3.55393C15.5301 4.86925 15.9996 6.41576 16 7.99793C15.9978 10.1192 15.1543 12.1529 13.6546 13.6531C12.1548 15.1532 10.1212 15.9973 8 16ZM8 1.34683C6.68454 1.34683 5.39862 1.73691 4.30485 2.46774C3.21108 3.19857 2.35859 4.23733 1.85519 5.45266C1.35178 6.66799 1.22007 8.0053 1.4767 9.29549C1.73333 10.5857 2.36679 11.7708 3.29696 12.701C4.22714 13.6311 5.41225 14.2646 6.70244 14.5212C7.99262 14.7779 9.32994 14.6461 10.5453 14.1427C11.7606 13.6393 12.7994 12.7868 13.5302 11.6931C14.261 10.5993 14.6511 9.31339 14.6511 7.99793C14.6489 6.23462 13.9475 4.54416 12.7006 3.29731C11.4538 2.05047 9.76331 1.34902 8 1.34683Z"
                            fill="#C4C4C4"></path>
                    </svg>
                </div>
                <div>
                    <input required pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" type="text" name="email" id="email-order" placeholder=" ">
                    <span>Email</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.32757 11.5279L3.88477 8.59349L4.82277 7.587L7.12834 9.55224L11.0422 4.63396L12.1649 5.44952L7.32757 11.5279Z"
                            fill="#C4C4C4"></path>
                        <path
                            d="M8 16C6.41784 16 4.8712 15.5309 3.55566 14.6519C2.24011 13.7729 1.21473 12.5236 0.609166 11.0619C0.00360378 9.60026 -0.154944 7.99183 0.15357 6.44004C0.462083 4.88825 1.2238 3.46278 2.34242 2.34388C3.46103 1.22498 4.8863 0.46289 6.43801 0.153974C7.98972 -0.154942 9.59819 0.00318901 11.06 0.608372C12.5219 1.21355 13.7714 2.23861 14.6507 3.55393C15.5301 4.86925 15.9996 6.41576 16 7.99793C15.9978 10.1192 15.1543 12.1529 13.6546 13.6531C12.1548 15.1532 10.1212 15.9973 8 16ZM8 1.34683C6.68454 1.34683 5.39862 1.73691 4.30485 2.46774C3.21108 3.19857 2.35859 4.23733 1.85519 5.45266C1.35178 6.66799 1.22007 8.0053 1.4767 9.29549C1.73333 10.5857 2.36679 11.7708 3.29696 12.701C4.22714 13.6311 5.41225 14.2646 6.70244 14.5212C7.99262 14.7779 9.32994 14.6461 10.5453 14.1427C11.7606 13.6393 12.7994 12.7868 13.5302 11.6931C14.261 10.5993 14.6511 9.31339 14.6511 7.99793C14.6489 6.23462 13.9475 4.54416 12.7006 3.29731C11.4538 2.05047 9.76331 1.34902 8 1.34683Z"
                            fill="#C4C4C4"></path>
                    </svg>
                </div>
                <div>
                    <input required pattern="(38)?0[0-9]{2}[0-9]{7}" min="10" type="text" name="phone" id="phone-order" placeholder=" ">
                    <span>Телефон</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.32757 11.5279L3.88477 8.59349L4.82277 7.587L7.12834 9.55224L11.0422 4.63396L12.1649 5.44952L7.32757 11.5279Z"
                            fill="#C4C4C4"></path>
                        <path
                            d="M8 16C6.41784 16 4.8712 15.5309 3.55566 14.6519C2.24011 13.7729 1.21473 12.5236 0.609166 11.0619C0.00360378 9.60026 -0.154944 7.99183 0.15357 6.44004C0.462083 4.88825 1.2238 3.46278 2.34242 2.34388C3.46103 1.22498 4.8863 0.46289 6.43801 0.153974C7.98972 -0.154942 9.59819 0.00318901 11.06 0.608372C12.5219 1.21355 13.7714 2.23861 14.6507 3.55393C15.5301 4.86925 15.9996 6.41576 16 7.99793C15.9978 10.1192 15.1543 12.1529 13.6546 13.6531C12.1548 15.1532 10.1212 15.9973 8 16ZM8 1.34683C6.68454 1.34683 5.39862 1.73691 4.30485 2.46774C3.21108 3.19857 2.35859 4.23733 1.85519 5.45266C1.35178 6.66799 1.22007 8.0053 1.4767 9.29549C1.73333 10.5857 2.36679 11.7708 3.29696 12.701C4.22714 13.6311 5.41225 14.2646 6.70244 14.5212C7.99262 14.7779 9.32994 14.6461 10.5453 14.1427C11.7606 13.6393 12.7994 12.7868 13.5302 11.6931C14.261 10.5993 14.6511 9.31339 14.6511 7.99793C14.6489 6.23462 13.9475 4.54416 12.7006 3.29731C11.4538 2.05047 9.76331 1.34902 8 1.34683Z"
                            fill="#C4C4C4"></path>
                    </svg>
                </div>
            </div>
        </div>
        <h5>Інформація про адресу</h5>
        <div class="modal-order-personal-info">
            <div class="modal-order-personal-labels">
                <div>
                    <input required type="text" name="city" id="city-order" placeholder=" ">
                    <span>Місто</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.32757 11.5279L3.88477 8.59349L4.82277 7.587L7.12834 9.55224L11.0422 4.63396L12.1649 5.44952L7.32757 11.5279Z"
                            fill="#C4C4C4"></path>
                        <path
                            d="M8 16C6.41784 16 4.8712 15.5309 3.55566 14.6519C2.24011 13.7729 1.21473 12.5236 0.609166 11.0619C0.00360378 9.60026 -0.154944 7.99183 0.15357 6.44004C0.462083 4.88825 1.2238 3.46278 2.34242 2.34388C3.46103 1.22498 4.8863 0.46289 6.43801 0.153974C7.98972 -0.154942 9.59819 0.00318901 11.06 0.608372C12.5219 1.21355 13.7714 2.23861 14.6507 3.55393C15.5301 4.86925 15.9996 6.41576 16 7.99793C15.9978 10.1192 15.1543 12.1529 13.6546 13.6531C12.1548 15.1532 10.1212 15.9973 8 16ZM8 1.34683C6.68454 1.34683 5.39862 1.73691 4.30485 2.46774C3.21108 3.19857 2.35859 4.23733 1.85519 5.45266C1.35178 6.66799 1.22007 8.0053 1.4767 9.29549C1.73333 10.5857 2.36679 11.7708 3.29696 12.701C4.22714 13.6311 5.41225 14.2646 6.70244 14.5212C7.99262 14.7779 9.32994 14.6461 10.5453 14.1427C11.7606 13.6393 12.7994 12.7868 13.5302 11.6931C14.261 10.5993 14.6511 9.31339 14.6511 7.99793C14.6489 6.23462 13.9475 4.54416 12.7006 3.29731C11.4538 2.05047 9.76331 1.34902 8 1.34683Z"
                            fill="#C4C4C4"></path>
                    </svg>
                </div>
                <div>
                    <input required type="text" name="street" id="street-order" placeholder=" ">
                    <span>Вулиця</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.32757 11.5279L3.88477 8.59349L4.82277 7.587L7.12834 9.55224L11.0422 4.63396L12.1649 5.44952L7.32757 11.5279Z"
                            fill="#C4C4C4"></path>
                        <path
                            d="M8 16C6.41784 16 4.8712 15.5309 3.55566 14.6519C2.24011 13.7729 1.21473 12.5236 0.609166 11.0619C0.00360378 9.60026 -0.154944 7.99183 0.15357 6.44004C0.462083 4.88825 1.2238 3.46278 2.34242 2.34388C3.46103 1.22498 4.8863 0.46289 6.43801 0.153974C7.98972 -0.154942 9.59819 0.00318901 11.06 0.608372C12.5219 1.21355 13.7714 2.23861 14.6507 3.55393C15.5301 4.86925 15.9996 6.41576 16 7.99793C15.9978 10.1192 15.1543 12.1529 13.6546 13.6531C12.1548 15.1532 10.1212 15.9973 8 16ZM8 1.34683C6.68454 1.34683 5.39862 1.73691 4.30485 2.46774C3.21108 3.19857 2.35859 4.23733 1.85519 5.45266C1.35178 6.66799 1.22007 8.0053 1.4767 9.29549C1.73333 10.5857 2.36679 11.7708 3.29696 12.701C4.22714 13.6311 5.41225 14.2646 6.70244 14.5212C7.99262 14.7779 9.32994 14.6461 10.5453 14.1427C11.7606 13.6393 12.7994 12.7868 13.5302 11.6931C14.261 10.5993 14.6511 9.31339 14.6511 7.99793C14.6489 6.23462 13.9475 4.54416 12.7006 3.29731C11.4538 2.05047 9.76331 1.34902 8 1.34683Z"
                            fill="#C4C4C4"></path>
                    </svg>
                </div>
                <div>
                    <input required type="text" name="build" id="build-order" placeholder=" ">
                    <span>Будинок</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.32757 11.5279L3.88477 8.59349L4.82277 7.587L7.12834 9.55224L11.0422 4.63396L12.1649 5.44952L7.32757 11.5279Z"
                            fill="#C4C4C4"></path>
                        <path
                            d="M8 16C6.41784 16 4.8712 15.5309 3.55566 14.6519C2.24011 13.7729 1.21473 12.5236 0.609166 11.0619C0.00360378 9.60026 -0.154944 7.99183 0.15357 6.44004C0.462083 4.88825 1.2238 3.46278 2.34242 2.34388C3.46103 1.22498 4.8863 0.46289 6.43801 0.153974C7.98972 -0.154942 9.59819 0.00318901 11.06 0.608372C12.5219 1.21355 13.7714 2.23861 14.6507 3.55393C15.5301 4.86925 15.9996 6.41576 16 7.99793C15.9978 10.1192 15.1543 12.1529 13.6546 13.6531C12.1548 15.1532 10.1212 15.9973 8 16ZM8 1.34683C6.68454 1.34683 5.39862 1.73691 4.30485 2.46774C3.21108 3.19857 2.35859 4.23733 1.85519 5.45266C1.35178 6.66799 1.22007 8.0053 1.4767 9.29549C1.73333 10.5857 2.36679 11.7708 3.29696 12.701C4.22714 13.6311 5.41225 14.2646 6.70244 14.5212C7.99262 14.7779 9.32994 14.6461 10.5453 14.1427C11.7606 13.6393 12.7994 12.7868 13.5302 11.6931C14.261 10.5993 14.6511 9.31339 14.6511 7.99793C14.6489 6.23462 13.9475 4.54416 12.7006 3.29731C11.4538 2.05047 9.76331 1.34902 8 1.34683Z"
                            fill="#C4C4C4"></path>
                    </svg>
                </div>
                <div class="order-first-build-info">
                    <div>
                        <input type="text" name="room" id="room-order" placeholder=" ">
                        <span>Квартира/офіс</span>
                    </div>
                    <div>
                        <input type="text" name="porch" id="porch-order" placeholder=" ">
                        <span>Під`їзд</span>
                    </div>
                </div>
                <div class="order-second-build-info">
                    <div>
                        <input type="text" name="flat" id="flat-order" placeholder=" ">
                        <span>Поверх</span>
                        </svg>
                    </div>
                    <div>
                        <input type="text" name="intercom" id="intercom-order" placeholder=" ">
                        <span>Домофон</span>
                    </div>
                </div>
            </div>
        </div>
        <h5>Додаткова інформація</h5>
        <div class="modal-order-personal-info">
            <div class="modal-order-personal-labels">
                <div>
                    <input type="text" name="note" id="note-order" placeholder=" ">
                    <span>Примітка...</span>
                </div>
                <div>
                    <input type="text" name="count-people" id="count-people-order" placeholder=" ">
                    <span>Кількість персон</span>
                </div>
                <h5>На коли доставити?</h5>
                <div class="order-div-button">
                    <div id="order-div-button">
                        <input class="later disable" id="datetimepicker" onclick="changeBtnClass(1)" placeholder="На потім">
                        <button class="active" onclick="changeBtnClass(2)" id="order-div-button-second">На зараз
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <button class="btn-send-deliver" id="modal-order-confirm-send" onclick="authorizeAndSendOrder()">Далі</button>
    </div>
</div>

