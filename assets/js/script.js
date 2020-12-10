var storage = localStorage.getItem("dayList");
var list = null;
if(storage!=null && storage != ""){
    var list = JSON.parse(localStorage.getItem("dayList"));
}


// Update the current day on top of page
function updateDay() {
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));
}

//Load saved items, or clear saved items if first load of day
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

//Update color coding
    var currentTime = moment().local().format("ha");
    var present = false;
    $("textarea").each(function () {                            //For each text area
        if(moment().local().isBefore(moment("9am", "ha"))){     //If it is before 9am
            $(this).addClass("future");                         //Add class "future" (working day hasn't started yet)
       } else if (currentTime != $(this).data("slot")) {        //If not, if the current time is not equal to current timeslot
            if(present){                                        //And if loop has alreay reached the present timeslot
                $(this).addClass("future");                     //Then add class "future"  
            } else {                                            //If loop hasn't reached the present timeslot
                $(this).addClass("past");                       //Then add class "past"
            }                                                   
        } else {                                                //If current time is equal to current timeslot
            $(this).addClass("present");                        //Then add class "present"
            present = true;                                     //And indicate that the loop already reached the present timeslot
        }
    });
}

//On change, add save button and its click listener for saving
$("textarea").keydown(function () {
    var slot = $(this).data("slot");
    if ($("#" + slot + " .save").html() == "") {
        $("#" + slot + " .save").append("<button class=\"saveBtn\" data-slot=\"" + slot + "\" >Save</button>");
        $(".saveBtn").click(function () {
            var slot = $(this).data("slot");
            $("#" + slot + " .save").empty();
            var item = { day: moment().format("MM-D-YY"), time: slot, agendaItem:  $("#" + slot + " textarea").val() }
            list == null ? list = [item] : list.push(item);
            localStorage.setItem("dayList", JSON.stringify(list));
        });
    }
});

updateDay();
loadList();