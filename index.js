$(document).ready(function () {
    console.log("Script Loaded")
    function getDetails(firstName, lastName, description, address, city, state, zip) {
        $('#info-content').css({ "display": "block" })

        $('#user-name').html(firstName + " " + lastName)
        $('textarea').html(description)
        $('#address').html(address)
        $('#city').html(city)
        $('#state').html(state)
        $('#zip-code').html(zip)
    }
    function createTableData(id, firstName, lastName, email, phoneNumber, description, address, city, state, zip, pos) {
        var tableRow = $("<tr>").attr("class", "data-row")

        var column_1 = $("<td>").attr("class", "column1").html(id)
        var column_2 = $("<td>").attr("class", "column2").html(firstName)
        var column_3 = $("<td>").attr("class", "column3").html(lastName)
        var column_4 = $("<td>").attr("class", "column4").html(email)
        var column_5 = $("<td>").attr("class", "column5").html(phoneNumber)

        tableRow.append(column_1)
        tableRow.append(column_2)
        tableRow.append(column_3)
        tableRow.append(column_4)
        tableRow.append(column_5)

        $("tbody").append(tableRow)

        tableRow.click(function () {
            $(".data-row").removeClass("active")
            tableRow.addClass("active")
            getDetails(firstName, lastName, description, address, city, state, zip);

        })
    }
    $.ajax({
        type: "GET",
        url: "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D",
        success: function (response) {
            var TableData = response
            for (var i = 0; i < TableData.length; i++) {
                createTableData(TableData[i].id,
                    TableData[i].firstName,
                    TableData[i].lastName,
                    TableData[i].email,
                    TableData[i].phone,
                    TableData[i].description,
                    TableData[i].address.streetAddress,
                    TableData[i].address.city,
                    TableData[i].address.state,
                    TableData[i].address.zip, i)
            }
        },
    })
    $("#search-box").on('keyup', function (eObj) {
        var value = $(this).val().toLowerCase()
        searchData(value)
        //highlight(value)
    });

    function searchData(value) {
        $('#table-data table tr').each(function () {
            var found = 'false';
            $(this).each(function () {
                if ($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                    found = 'true'
                }
            });
            if (found == 'true') {
                $(this).show();
            }
            else {
                $(this).hide();
            }
        })
    }

})
// function highlight(value) {
//     var content = $("tbody").text()
//     var contentReg = new RegExp(value, "ig");
//     var matches = content.match(contentReg)
//     // console.log(contentReg,matches)
//     if (matches) {
//         $('td').html(content.replace(contentReg, function (match) {
//             return "<span class='mark'>" + match + "</span>";

//         }))
//     }
//     else {
//         $(".mark").removeClass("mark")
//     }
// }

/*
https://codepen.io/sdyx/pen/WNpNbbK

*/