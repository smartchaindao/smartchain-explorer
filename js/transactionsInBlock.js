var pageSize = 500; //ҳ�ܼ�¼��
var rowCount = 0;  //������
var maxRow = 0;  //�������
var minRow = 0;  //��С���� 
var pages = 50;     //��ҳ��
var iPage = 1;     //��ǰҳ
var trans = [];
$(function () {
    var minBlock = getUrlParam('number');
    var maxBlock = minBlock;
    var apiUrl = baseApi + '/transaction/getTrxByBlock?blockNumber=' + minBlock;
    $.ajax(
        {
            url: apiUrl,
            type: 'get',
            dataType: 'json',
            beforeSend: function (xhr) {
            },
            headers: {
                'APIKey': '0x51d9a52d29c99b6bde0f118fdd829097d18a9f041fc6fa661ace13cb93b7f389'
            },
            success: function ({ data }) {
                trans = data;
                rowCount = trans.length;
                pages = pageTotal(rowCount, pageSize);
                $("#transactionsCount").html(' Transactions(' + rowCount + ' Transactions Found in Block ' + minBlock + ')')
                goPage("top");

            },
            error: function (data) { console.log("error"); }
        });


})
function goPage(iType) {
    //����
    if (iType == "top") {
        iPage = 1;
        maxRow = rowCount;
        minRow = maxRow - (pageSize - 1);
        if (minRow < 1) minRow = 1;
    }
    //���
    if (iType == "last") {
        iPage = pageTotal(rowCount, pageSize);
        minRow = 1;
        maxRow = minRow + (pageSize - 1);

    }
    //��һҳ
    if (iType == "down") {
        if (iPage == pages) return;
        iPage++;
        maxRow = maxRow - pageSize;
        minRow = maxRow - (pageSize - 1);
        if (minRow < 1) minRow = 1;
    }
    //��һҳ
    if (iType == "up") {
        if (iPage == 1) return;
        iPage--;
        maxRow = maxRow + pageSize;
        minRow = maxRow - (pageSize - 1);
        if (minRow < 1) minRow = 1;
    }
    $(".pageInfo").html(iPage + "/" + pages);

    //���������������
    var htmlList = "";

    for (var Idx = maxRow; Idx >= minRow; Idx--) {
        var iTran = trans[Idx - 1];
        var age = (Math.floor(Date.now() / 1000) - iTran.timestamp) % 60;
        if (iTran) {
            var istate = iTran.state == 1 ? "Success" : "Failed";
            htmlList += '<tr>\n';
            htmlList += '<td><span class="ellipsis hash-tag">' + iTran.hash + '</span></td>\n';
            htmlList += '<td>' + iTran.blockNumber + '</td>\n'
            htmlList += '<td>' + age + ' S</td>\n'
            htmlList += '<td><span class="ellipsis hash-tag">' + iTran.from + '</span></td>\n';
            htmlList += '<td><span class="ellipsis hash-tag">' + iTran.to + '</span></td>\n';
            htmlList += '<td>' + istate + '</td>\n';
            htmlList += '</tr>\n';
        }


    }
    if (htmlList == "") {
        htmlList += '<tr  >\n';
        htmlList += '    <td colspan="6">\n';
        htmlList += '        <div class="null flex flex-align-center flex-pack-center flex-column">\n';
        htmlList += '            <img src="images/null1.jpg"><br>No Transactions Found in Block\n';
        htmlList += '        </div>\n';
        htmlList += '    </td>\n';
        htmlList += '</tr>\n';
        $(".pageInfo").html("0/0");
    }
    //��������������� 
    $('#transactions_table_tbody').empty();
    $(htmlList).appendTo('#transactions_table_tbody').trigger('create');

} 