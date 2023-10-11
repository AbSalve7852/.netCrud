/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready
$(document).ready(function () {
    loadData();
});

//Load Data function
function loadData() {
    $.ajax({
        url: "/Home/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.EmployeeID + '</td>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.Phone + '</td>';
                html += '<td>' + item.Email + '</td>';
                html += '<td>' + item.City + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.EmployeeID + ')">Edit</a> | <a href="#" onclick="Delele(' + item.EmployeeID + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Add Data Function 
function Add() {
 
    var res = validate();
    if (res == false) {
            return false;
    }
    var ans = confirm("Are you sure you want to Add this Record?");
    if (ans) {
        var empObj = {
            EmployeeID: $('#EmployeeID').val(),
            Name: $('#Name').val(),
            Phone: $('#Phone').val(),
            Email: $('#Email').val(),
            City: $('#City').val()
        };

        $.ajax({
            url: "/Home/Add",
            data: JSON.stringify(empObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                loadData();
                $('#myModal').modal('hide');

            },

            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    
    }
    
}

//Function for getting the Data Based upon Employee ID
function getbyID(EmpID) {
    $('#Name').css('border-color', 'lightgrey');
    $('#Phone').css('border-color', 'lightgrey');
    $('#Email').css('border-color', 'lightgrey');
    $('#City').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Home/getbyID/" + EmpID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#EmployeeID').val(result.EmployeeID);
            $('#Name').val(result.Name);
            $('#Phone').val(result.Phone);
            $('#Email').val(result.Email);
            $('#City').val(result.City);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//function for updating employee's record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var ans = confirm("Are you sure you want to Update this Record?");
    if (ans) {
        var empObj = {
            EmployeeID: $('#EmployeeID').val(),
            Name: $('#Name').val(),
            Phone: $('#Phone').val(),
            Email: $('#Email').val(),
            City: $('#City').val(),
        };
        $.ajax({
            url: "/Home/Update",
            data: JSON.stringify(empObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                loadData();
                $('#myModal').modal('hide');
                $('#EmployeeID').val("");
                $('#Name').val("");
                $('#Phone').val("");
                $('#Email').val("");
                $('#City').val("");
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

//function for deleting employee's record
function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Home/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

//Function for clearing the textboxes
function clearTextBox() {
    $('#EmployeeID').val("");
    $('#Name').val("");
    $('#Phone').val("");
    $('#Email').val("");
    $('#City').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
    $('#Phone').css('border-color', 'lightgrey');
    $('#Email').css('border-color', 'lightgrey');
    $('#City').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validate() {
    var isValid = true;
    var name = $('#Name').val().trim();
    var phone = $('#Phone').val().trim();
    var email = $('#Email').val().trim();
    var city = $('#City').val().trim();

    // Reset error messages
    $('#NameError').text("");
    $('#PhoneError').text("");
    $('#EmailError').text("");
    $('#CityError').text("");

    if (name === "") {
        $('#Name').css('border-color', 'Red');
        $('#NameError').text("Name is required");
        isValid = false;
    } else {
        $('#Name').css('border-color', 'lightgrey');
    }

    if (phone === "") {
        $('#Phone').css('border-color', 'Red');
        $('#PhoneError').text("Phone is required");
        isValid = false;
    } else {
        $('#Phone').css('border-color', 'lightgrey');
    }

    if (email === "") {
        $('#Email').css('border-color', 'Red');
        $('#EmailError').text("Email is required");
        isValid = false;
    } else {
        $('#Email').css('border-color', 'lightgrey');
    }

    if (city === "") {
        $('#City').css('border-color', 'Red');
        $('#CityError').text("City is required");
        isValid = false;
    } else {
        $('#City').css('border-color', 'lightgrey');
    }

    return isValid;
}