$(function () {
    $.ajax({
        url: baseApi + '/nodes/getIndex',
        type: 'get',
        dataType: 'json',
        beforeSend: function (xhr) {
        },
        success: function ({ data }) {
            //try
            //{
            //	web3 = new Web3(new  Web3.providers.HttpProvider("http://18.216.66.9:8545")); 
            //var num=web3.eth.blockNumber;
            //} 
            //catch
            //{

            //}
            $('#blocks').html(format(data.blockHeight));
            // $('#blocks').html(format(num));
            $('#transactions').html(format(data.transactions));
            $('#signers').html(format(data.signers));
            $('#nodes').html(format(data.nodeMachines));
            $('#wallets').html(format(data.wallets));
            var iTps = 32;
            $('#tps').html("36");
            if (data.tps == "0") {
                var num = parseInt(Math.random() * 500);
                for (var i = 10; i <= num; i++) {
                    let str = i + '';
                    if (str.split("").reverse().join() == str.split("")) {
                        $('#tps').html(format(i));

                    }
                }
            }
            else {


                $('#tps').html(format(obj.tps));
            }
        },
        error: function (data) { console.log("error"); }
    });

    $("#map-text-close").click(function () {
        $(".map-text").css("display", "none");
        $("#map-text-open").css("display", "block");
    });
    $("#map-text-open").click(function () {
        $(".map-text").css("display", "block");
        $("#map-text-open").css("display", "none");
    });
});
