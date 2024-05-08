
var transactions_height = 0; //??����������y
var block_height = 0;
var pageSize = 50; //��3����????��y
var rowCount = 0;  //����DD��y 
var pages = 1;     //������3��y
var iPage = 1;     //�̡�?�㨰3
var address = "";
$(function () {

    address = getUrlParam("address");
    goPage("top");

});

function goPage(iType) {
    //?��2?
    if (iType == "top") {
        iPage = 1;
    }
    //��?o��
    if (iType == "last") {
        iPage = pageTotal(rowCount, pageSize);

    }
    //??��?��3
    if (iType == "down") {
        if (iPage == pages) return;
        iPage++;

    }
    //��?��?��3
    if (iType == "up") {
        if (iPage == 1) return;
        iPage--;

    }




    var apiUrl = baseApi + '/transaction/rewardList';//?max_block=' + block_height + '&current_page=' + iPage + '&items_per_page=' + pageSize;
    var opt = { "address": address, "pageNum": iPage, "pageSize": pageSize };
    var jsonData = JSON.stringify(opt);

    $.ajax(
        {
            url: apiUrl,
            type: 'POST',
            dataType: "json",
            data: jsonData,
            contentType: "application/json; charset=UTF-8",
            beforeSend: function (xhr) {
            },
            success: function ({ data }) {
                const tem = data.data
                rowCount = tem.total;
                pages = tem.pages;
                $(".pageInfo").html(iPage + "/" + pages);


                var htmlList = '';
                const nodes = tem.records
                var len = nodes.length;
                for (idx = 0; idx < len; idx++) {
                    var iNode = nodes[idx];
                    if (iNode) {
                        htmlList += '<tr>\n';
                        htmlList += '    <td>' + iNode.txHash + '</span></a></td>\n';
                        htmlList += '    <td>' + iNode.quantity + '</td>\n';
                        htmlList += '    <td>' + iNode.sendTime + '</td>\n';
                        htmlList += '    <td>' + (iNode.status ? "success" : "failed") + '</td>\n';
                        htmlList += '</tr>\n';

                    }
                }

                //   $('#signersCount').html('Node Machines (total Node Machines ' + data[0] + ')')
                $('#signersCount').html('Address: ' + address + '(Total Transactions: ' + rowCount + ')');
                //?��DD��?o������?����y?Y
                $('#signers_table_tbody').empty();
                $(htmlList).appendTo('#signers_table_tbody').trigger('create');
                if (rowCount < 50) {
                    $(".pagination").hide();
                } else {
                    $(".pagination").show();
                }

            },
            error: function (data) { console.log("error"); }
        }
    );

} 