(function() {
    "use strict";

    function checkckb() {

        if (document.getElementById("price1c").checked == false &
            document.getElementById("price2c").checked == false &
            document.getElementById("price3c").checked == false) {

            document.getElementById("p1cerrc").innerText = "←1個はチェックがいるもふ！！";
            document.getElementById("p2cerrc").innerText = "←1個はチェックがいるもふ！！";
            document.getElementById("p3cerrc").innerText = "←1個はチェックがいるもふ！！";
    
        } else {

            document.getElementById("p1cerrc").innerText = "";
            document.getElementById("p2cerrc").innerText = "";
            document.getElementById("p3cerrc").innerText = "";
    
        }

    };

    function checkckb2() {

        if (document.getElementById("price1c").checked == true |
            document.getElementById("price2c").checked == true |
            document.getElementById("price3c").checked == true) {

            document.getElementById("p1cerrc").innerText = "";
            document.getElementById("p2cerrc").innerText = "";
            document.getElementById("p3cerrc").innerText = "";
    
        }

    };

    document.getElementById("mybtn1").onclick = function() {

        checkckb()

        const startDate = new Date(document.getElementById("date1").value);
        const endDate = new Date(document.getElementById("date2").value);

        const DAY_MILLION_SECOND = 24 * 60 * 60 * 1000;
        const dayPeriod = (endDate - startDate) / DAY_MILLION_SECOND;
        
        var Tprice = 0;
        const price1 = document.getElementById("price1");
        const price2 = document.getElementById("price2");
        const price3 = document.getElementById("price3");
    
        if (document.getElementById("price1c").checked == true) {
            Tprice = Tprice + Number(replaceNumberText(price1.value))
        }
        if (document.getElementById("price2c").checked == true) {
            Tprice = Tprice + Number(replaceNumberText(price2.value))
        }
        if (document.getElementById("price3c").checked == true) {
            Tprice = Tprice + Number(replaceNumberText(price3.value))
        }

        if (dayPeriod >= 0 & Tprice > 0) {
            Swal.fire({
                title: "結果発表もふ！！",
                confirmButtonText: 'もふ'
            });
            document.getElementById("result").innerText = dayPeriod+1;
            document.getElementById("Tprice").innerText = Math.round(Tprice/7*(dayPeriod+1));
        } else {

            Swal.fire({
                icon:"error",
                title: "入力がおかしいもふよ！",
                confirmButtonText: 'もふ'
              });

            document.getElementById("result").innerText = "-";
            document.getElementById("Tprice").innerText = "-";
        }

    }

    document.getElementById("mybtn2").onclick = function() {

        Swal.fire({
            title: '結果をすん？',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'もふ',
            cancelButtonText: 'のーもふ'
          }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                  '結果をすん♪',
                  '',
                  'success'
                )
                datacls()
            }
          });

    };

    window.onload = function () {

        datacls()

    };

    function chtoday(){

        //今日の日時を表示
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        
        const toTwoDigits = function (num, digit) {
            num += ''
            if (num.length < digit) {
            num = '0' + num
            }
            return num
        }
        
        const yyyy = toTwoDigits(year, 4)
        const mm = toTwoDigits(month, 2)
        const dd = toTwoDigits(day, 2)
        const ymd = yyyy + "-" + mm + "-" + dd;
        
        document.getElementById("date1").value = ymd;
        document.getElementById("date2").value = ymd;

    };

    function datacls(){

        document.getElementById("price1").value = "8,000";
        document.getElementById("price2").value = "9,000";
        document.getElementById("price3").value = "10,000";
        document.getElementById("price1c").checked = false;
        document.getElementById("price2c").checked = false;
        document.getElementById("price3c").checked = false;

        chtoday()

        document.getElementById("result").innerText = "";
        document.getElementById("Tprice").innerText = "";
        document.getElementById("p1cerr").innerText = "";
        document.getElementById("p2cerr").innerText = "";
        document.getElementById("p3cerr").innerText = "";
        document.getElementById("p1cerrc").innerText = "";
        document.getElementById("p2cerrc").innerText = "";
        document.getElementById("p3cerrc").innerText = "";
        document.getElementById("d1err").innerText = "";
        document.getElementById("d2err").innerText = "";

    };

    function replaceFormatNumber(numberText) {

        if (!numberText) {
          return '';
        }
        return String(numberText).replace(/\d+/, function (m) {
          return m.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
        });

    };

    function replaceNumberText(formatNumber) {

        if (!formatNumber) {
        return '';
        }
        return formatNumber.replace(/,/g, '');

    };

    function pricechange(pid, peid) {

        const numberT1 = Number(replaceNumberText(pid.value));

        if (numberT1 < 1000) {
            peid.innerText = "←安すぎもふ！！";
            pid.value = replaceFormatNumber(numberT1);
        } else if(numberT1 > 1000000) {
            peid.innerText = "←高すぎもふ！！";
            pid.value = replaceFormatNumber(numberT1);
        } else if(Number.isNaN(numberT1)) {
            peid.innerText = "←半角数字を入れてもふ！！";
        } else {
            pid.value = replaceFormatNumber(numberT1);
            peid.innerText = "";
        }

    };

    document.getElementById("price1").onchange = function(){

        pricechange(document.getElementById("price1"), document.getElementById("p1cerr"));

    };

    document.getElementById("price2").onchange = function(){

        pricechange(document.getElementById("price2"), document.getElementById("p2cerr"));

    };

    document.getElementById("price3").onchange = function(){

        pricechange(document.getElementById("price3"), document.getElementById("p3cerr"));

    };

    function datechange() {

        const ddiff = Number(new Date(document.getElementById("date2").value)
                            -new Date(document.getElementById("date1").value));

        if (ddiff < 0) {
            document.getElementById("d1err").innerText = "←開始日と終了日が逆転もふ！";
            document.getElementById("d2err").innerText = "←開始日と終了日が逆転もふ！";
        } else {
            document.getElementById("d1err").innerText = "";
            document.getElementById("d2err").innerText = "";
        }

    };

    document.getElementById("date1").onchange = function(){

        datechange();

    };

    document.getElementById("date2").onchange = function(){

        datechange();

    };

    document.getElementById("price1c").onchange = function(){

        checkckb2();

    };

    document.getElementById("price2c").onchange = function(){

        checkckb2();

    };

    document.getElementById("price3c").onchange = function(){

        checkckb2();

    };


    var trigger = document.querySelectorAll(".trigger");

    trigger.forEach(function(target) {

        target.addEventListener('mouseenter', function() {
            target.firstElementChild.style.display = 'block';
        });

        target.addEventListener('mouseleave', function() {
            target.firstElementChild.style.display = 'none';
        });

    });

})();
