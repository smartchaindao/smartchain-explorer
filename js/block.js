
$(function () {
    var number = getUrlParam("number");
    $.ajax(
        {
            url: baseApi + '/blocks/getBlocksByNumber?number=' + number,
            type: 'get',
            dataType: 'json',
            beforeSend: function (xhr) {
            },
            headers: {
            },
            success: function ({ data }) {
                if (data) {
                    var obj = data;
                    var age = (Math.floor(Date.now() / 1000) - obj.time) % 60;

                    $('#blockNumber').html("Block   #" + obj.number);
                    $('#blockHeight').html(obj.number);
                    $('#timestamp').html(age + " mins ago");
                    $('#transactions').html(obj.txNum);
                    $('#signedby').html(obj.miner);
                    $('#difficalty').html(obj.difficalty);
                    $('#totalDifficulty').html(obj.totalDifficulty || "");
                    $('#size').html(obj.size);
                    $('#extraData').html(obj.extraData);
                    $('#hash').html(obj.hash);
                    $('#parentHash').html(obj.uncleHash);
                    $('.public-content').show();
                    $('.search-null').hide();
                } else {
                    $('.public-content').hide();
                    $('.search-null').show();
                }
            },
            error: function (data) { console.log("error"); $('.search-null').show(); }
        }
    );
})

