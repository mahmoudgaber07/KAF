document.addEventListener('DOMContentLoaded', function () {
  document.querySelector(".loading").classList.add('d-none');

  let sliderswiper = new Swiper(".slider", {
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  
$("#sellectAll").click(function(){
    $('.services input:checkbox').not(this).prop('checked', this.checked);
});

function quantityControl() {
  document.querySelectorAll('.js-quantity-1').forEach((qty) => {
    const plus = qty.querySelector('.js-plus');
    const minus = qty.querySelector('.js-minus');
    const number = qty.querySelector('.js-number');
    const total = qty.querySelector('.js-total');

    const url = number.dataset['url'];
    const token = number.dataset['token'];
    if (plus) {
      plus.onclick = async function () {
        const quantity = parseInt(number.value) + 1;
        number.value = quantity;
        const totalValue = quantity * 300;
        total.value = totalValue;

        if (url && token) {
          await fetch(url, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': token,
            },
            body: JSON.stringify({
              newQty: quantity,
              newPrice:totalValue
            }),
          })
            .then((response) => response.json())
            .then(() => {
              location.reload();
            })
            .catch((e) => {
              throw new Error(e);
            });
        }
      };
    }

    if (minus) {
      minus.onclick = async function () {
        if (parseInt(number.value) !== 1) {
          const quantity = parseInt(number.value) - 1;
          number.value = quantity;
          const totalValue = quantity * 300;
          total.value = totalValue;
          if (url && token) {
            await fetch(url, {
              method: 'POST', 
              headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token,
              },
              body: JSON.stringify({
                newQty: quantity,
                newPrice:totalValue
              }),
            })
              .then((response) => response.json())
              .then(() => {
                location.reload();
              })
              .catch((e) => {
                throw new Error(e);
              });
          }
        }
      };
    }
  });
}
quantityControl();

})
