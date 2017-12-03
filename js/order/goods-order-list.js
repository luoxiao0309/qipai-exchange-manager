var table = document.getElementById("table");

//分页变量
var isFirstPage = -1;
var isLastPage = -1;
var pageIndex = 0;
var pageSize = -1;
var totalPages = -1;
var totalRecords = -1;
var operateId = "";

requestOnePage(pageIndex, 8);
function requestOnePage(index, size) {
    var params = {
        "apiName": "GoodsOrder_QueryList_Api",
        "pageIndex": index,
        "pageSize": size
    }
    var xmlhttp = post(params);

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //console.log(xmlhttp.responseText);
            var json = JSON.parse(xmlhttp.responseText);

            var tbody = document.getElementById("tbody");
            for (var i = 0; i < json.data.length; i++) {

                var tr = appendTr(tbody);


                if ((i % 2) != 0) {
                    tr.style.backgroundColor = "#f4f4f4";
                    tr.setAttribute("data-even-marker", "0");
                } else {
                    tr.setAttribute("data-even-marker", "1");
                }

                tr.onmouseover = function () {
                    this.style.backgroundColor = "#4FC3F7";
                };
                tr.onmouseout = function () {
                    if (this.getAttribute("data-even-marker") == "0") {
                        this.style.backgroundColor = "#f4f4f4";
                    }
                    if (this.getAttribute("data-even-marker") == "1") {
                        this.style.backgroundColor = "#ffffff";
                    }

                };


                var imgBox = appendTdAndData(tr, "");
                var img = document.createElement("img");

                console.log(json.data[i].pictures);
                if (json.data[i].pictures.length > 0) {
                    img.setAttribute("src", JSON.parse(json.data[i].pictures));
                }


                img.style.width = "50px"
                img.style.height = "50px"

                imgBox.appendChild(img);

                appendTdAndData(tr, json.data[i].name);
                appendTdAndData(tr, json.data[i].price);
                appendTdAndData(tr, json.data[i].vipPrice);
                appendTdAndData(tr, json.data[i].goldVipPrice);
                appendTdAndData(tr, "-");
                appendTdAndData(tr, json.data[i].stock);
                appendTdAndData(tr, "-");
                appendTdAndData(tr, new Date(json.data[i].dtCreate).Format("yyyy-MM-dd"));
                var cell = appendTd(tr);
                var show = document.createElement("a");
                var edit = document.createElement("a");
                edit.style.margin = "8px";
                var del = document.createElement("a");

                show.setAttribute("href", "javascript:void(0)");
                edit.setAttribute("href", "javascript:void(0)");
                del.setAttribute("href", "javascript:void(0)");


                show.innerHTML = "查看";
                edit.innerHTML = "编辑";
                del.innerHTML = "删除";
                cell.appendChild(show);
                cell.appendChild(edit);
                cell.appendChild(del);

                show.setAttribute("data-opeate", json.data[i].id);
                edit.setAttribute("data-opeate", json.data[i].id);
                del.setAttribute("data-opeate", json.data[i].id);

                show.onclick = function () {
                    console.log(this.getAttribute("data-opeate"));
                    operateId = this.getAttribute("data-opeate");
                    layer.open({
                        type: 1
                        , area: ['800px', '600px']
                        , title: '商品详情'
                        , shade: 0.6
                        , maxmin: false
                        , anim: 1
                        , content: $(".modal-detail")
                    });

                    showDetail();
                }
                edit.onclick = function () {
                    //alert(this.getAttribute("data-opeate"));
                    operateId = this.getAttribute("data-opeate");
                    layer.open({
                        type: 1
                        , area: ['800px', '600px']
                        , title: '商品编辑'
                        , shade: 0.6
                        , maxmin: false
                        , anim: 1
                        , content: $(".modal-detail")
                    });

                    showDetailBeforeUpdate();
                }
                del.onclick = function () {
                    //alert(this.getAttribute("data-opeate"));
                    operateId = this.getAttribute("data-opeate");
                    var dialogDel = document.getElementById("dialog-del");
                    dialogDel.style.display = "block";

                }

            }

            isFirstPage = json.pager.isFirstPage;
            isLastPage = json.pager.isLastPage;
            pageIndex = json.pager.pageIndex;
            pageSize = json.pager.pageSize;
            totalPages = json.pager.totalPages;
            totalRecords = json.pager.totalRecords;

            updatePageMarkers();
        }
    }
}






