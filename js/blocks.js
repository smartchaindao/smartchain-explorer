
var block_height = 0; //����߶�
var pageSize = 50; //ҳ�ܼ�¼��
var rowCount = 0;  //������
var maxBlock = 0;  //�������
var minBlock = 0;  //��С���� 
var pages = 0;     //��ҳ��
var iPage = 1;     //��ǰҳ;
$(function () {
    $.ajax(
        {
            url: baseApi + '/nodes/getIndex',
            type: 'get',
            dataType: 'json',
            success: function ({data}) {
                var obj = data;
                // web3 = new Web3(new  Web3.providers.HttpProvider("http://18.216.66.9:8545")); 
                //  var num=web3.eth.blockNumber;

                block_height = obj.blockHeight;
                // block_height=num;
                rowCount = block_height;//obj.block_height;  
                pages = pageTotal(rowCount, pageSize);
                $("#blocksCount").html('Blocks  (block height ' + format(block_height) + ')');

                goPage("top");
            },
            error: function (data) { console.log("error"); }
        }
    );
})
//$('#searchInput').change(initTable);   
function goPage(iType) {
    //����
    if (iType == "top") {
        iPage = 1;
        maxBlock = block_height;
        minBlock = maxBlock - (pageSize - 1);
    }
    //���
    if (iType == "last") {
        iPage = pageTotal(rowCount, pageSize);
        minBlock = 1;
        maxBlock = minBlock + (pageSize - 1);
    }
    //��һҳ
    if (iType == "down") {
        if (iPage == pages) return;
        iPage++;
        maxBlock = maxBlock - pageSize;
        minBlock = maxBlock - (pageSize - 1);
    }
    //��һҳ
    if (iType == "up") {
        if (iPage == 1) return;
        iPage--;
        maxBlock = maxBlock + pageSize;
        minBlock = maxBlock - (pageSize - 1);
    }
    var apiUrl = baseApi + `/blocks/getBlocks?currentPage=${iPage}&itemsPerPage=${pageSize}`;// 'http://13.210.52.1:7000/v1/block?fromBlock=' + minBlock + '&toBlock=' + maxBlock;
    $.ajax(
        {
            url: apiUrl,
            type: 'get',
            dataType: 'json',
            beforeSend: function (xhr) {
            },
            success: function ({ data }) {
                pages = data.pages
                $(".pageInfo").html(iPage + "/" + pages);

                var blocks = data.records;
                //$("#blocksCount").html('Blocks  (block height ' + format(data.total_records) + ')'); 

                //���������������
                var htmlList = "";
                for (var blockIdx = 0; blockIdx <= blocks.length - 1; blockIdx++) {
                    var iBlock = blocks[blockIdx];
                    if (iBlock) {
                        var age = iBlock.age;// Math.floor(Date.now() / 1000) - iBlock.time;
                        htmlList += '<tr>\n';
                        htmlList += '<td><a href="block.html?number=' + iBlock.number + '" style="color:#337ab7 !important">' + iBlock.number + '</a></td>\n';
                        htmlList += '<td>' + age + 's</td>\n';
                        // if (iBlock.tx_num != "0") {
                        htmlList += '<td><a href="transactionsInBlock.html?number=' + iBlock.number + '" style="color:#337ab7 !important">' + iBlock.txNum + '</a></td>\n';
                        //}
                        //else {
                        //    htmlList += '<td><a href="block.html?number=' + iBlock.number + '" style="color:#337ab7 !important">' + iBlock.tx_num + '</a></td>\n';
                        //}
                        htmlList += '<td><span class="ellipsis hash-tag">' + iBlock.miner + '</span></td>\n';
                        htmlList += '<td>' + iBlock.size + ' bytes</td>\n';
                        htmlList += '<td>' + iBlock.difficulty + '</td>\n';
                        htmlList += '</tr>\n';


                    }
                }
                //��������������� 


                $('#block_table_tbody').empty();
                $(htmlList).appendTo('#block_table_tbody').trigger('create');
            },
            error: function (data) { console.log("error"); }
        }
    );
}