$(document).ready(function(){
    let loader = $('.loader');

    const product = $('#product')
    const name = $('#name');
    const phone = $('#phone');
    const form = $('#order');
    const thanks = $('.thanks');
    const orderInfo = $('.action__order-info');

    $('.hero__action').click((e) => {
        $('#pies')[0].scrollIntoView({behavior: "smooth"});
    })

    $('.to-order').click((e) => {
        product.val($(e.target).parents('.card__box').prev('.card__title').text());
        form[0].scrollIntoView({behavior: "smooth"});
    })

    phone.keypress(function(event) {
        let number = event.key;
        if (isNaN(number)) {
            event.preventDefault();
        }
    });

    $('#submit').click(function () {
        let hasError = false;

        $('.error-input').hide();

        if(!product.val()) {
            product.next().show();
            product.css('border-color', 'red');
            hasError = true;
        } else {
            product.css('border-color', '#821328');
        }

        if(!name.val()) {
            name.next().show();
            name.css('border-color', 'red');
            hasError = true;
        } else {
            name.css('border-color', '#821328');
        }

        if(!phone.val()) {
            phone.next().show();
            phone.css('border-color', 'red');
            hasError = true;
        } else {
            phone.css('border-color', '#821328');
        }


        if (!hasError) {
            loader.css('display', 'flex');
            $.ajax({
                method: 'post',
                url: "http://testologia.ru/checkout",
                data: {product: product.val(), name: name.val(), phone: phone.val()}
            })
                .done(function (msg) {
                    loader.hide();
                    if (msg.success === 1) {
                        form.css('display', 'none');
                        orderInfo.css('display', 'none');
                        thanks.css('display', 'block');
                        form[0].reset();
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                    }
                });

        }

        setTimeout(() => {
            thanks.css('display', 'none');
            orderInfo.css('display', 'block');
            form.css('display', 'block');
        }, 5000)
    });
});