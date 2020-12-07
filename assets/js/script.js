var descriptionArea = $(".text-wrapper");
var list = JSON.parse(localStorage.getItem("dayList"));

function updateDay() {
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));
}
function loadList() {
    if (list != null) {
        if (list[0].day == moment().format("MM-D-YY")) {
            list.forEach(item => {
                $("#" + item.time + " textarea").val(item.agendaItem);
            });
        } else {
            list = null;
            localStorage.setItem("dayList", "");
        }
    }
    var currentTime = moment().local().format("ha");
    var present = false
    $("textarea").each(function () {
        if(moment().local().isBefore(moment("9am", "ha"))){
            $(this).addClass("future");
       } else if (currentTime != $(this).data("slot")) {
            if(present){
                $(this).addClass("future");
            } else {
                $(this).addClass("past");
            }
        } else {
            $(this).addClass("present");
            present = true;
        }
    });
}

function saveChanges(slot) {
    var textarea = $("#" + slot + " textarea");
    $(textarea).data("change", "");
    $("#" + slot + " .save").empty();
    var item = { day: moment().format("MM-D-YY"), time: $(textarea).data("slot"), agendaItem: $(textarea).val() }
    if (list == null) {
        list = [item];
    } else {
        list.push(item);
    }
    localStorage.setItem("dayList", JSON.stringify(list));
}

$("textarea").keyup(function () {
    var slot = $(this).data("slot");
    $(this).data("change", "yes");
    if ($("#" + slot + " .save").html() == "") {
        $("#" + slot + " .save").append("<button class=\"saveBtn\" data-slot=\"" + slot + "\" >Save</button>");
    }
});

$("textarea").blur(function () {
    var slot = $(this).data("slot");
    if ($(this).data("change") == "yes") {
        var save = confirm("Would you like to save changes?");
        if (save) {
            saveChanges(slot);
        } else {
            $(this).data("change", "");
            $(this).val("");
            $("#" + slot + " .save").empty();
        }
    }
});


updateDay();
loadList();