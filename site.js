//========================================================================================//
// .............................NAVBAR CONTROL.............................
//========================================================================================//
var menulist = document.getElementById("menulist");
menulist.style.maxHeight = "0px";

// control code for navbar menulist on smaller screen device
function menutoggle() {
  if (menulist.style.maxHeight == "0px") {
    menulist.style.maxHeight = "100vh";
  } else {
    menulist.style.maxHeight = "0px";
  }
}

// fixed navbar when "scroll top" exceeds 50px
$(window).on("scroll", function () {
  if ($(window).scrollTop() > 50) {
    $(".top-header").addClass("fixed-navbar");
  } else {
    $(".top-header").removeClass("fixed-navbar");
  }
});

//========================================================================================//
// ...................................... CAROUSEL ......................................
//========================================================================================//

$(document).ready(function () {
  // Home Carousel
  $(".home-carousel").owlCarousel({
    loop: true,
    margin: 0,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 6000,
    autoplayHoverPause: true,
    navText: [
      "<i class = 'fa fa-chevron-left'></i>",
      "<i class = 'fa fa-chevron-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });

  // Room Carousel
  $(".room-carousel").owlCarousel({
    // autoplay: true,
    // loop: true,
    rewind: true,
    margin: 40,
    nav: true,
    dots: false,
    navText: [
      "<i class = 'fa fa-chevron-left'></i>",
      "<i class = 'fa fa-chevron-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },

      768: {
        items: 2,
        margin: 10,
      },
      1000: {
        items: 3,
      },
    },
  });

  // Gallery Carousel
  $(".gallery-carousel").owlCarousel({
    rewind: true,
    // loop: true,
    margin: 0,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    navText: [
      "<i class = 'fa fa-chevron-left'></i>",
      "<i class = 'fa fa-chevron-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 4,
      },
      1000: {
        items: 6,
      },
    },
  });
});

//========================================================================================//
// ............................ROOM SECTION & BOOKING ENGINE.............................
//========================================================================================//
// Scroll to room when "Book Now" button on "Navbar" or "Home page" is clicked
function scrollToRooms() {
  const roomsSection = document.getElementById("rooms");
  roomsSection.scrollIntoView();
}
// ----------------------------------------------------------> end

//----------ROOM CARD HIGHLIGHT EFFECT ON MOUSE ENTER & MOUSE LEAVE ----------//
// On mouse enter
function addCardHighlight() {
  const roomCards = document.querySelectorAll(".room-card");
  roomCards.forEach(function (roomCard) {
    roomCard.addEventListener("mouseenter", function (event) {
      roomCard.classList.add("room-card-effect");
    });
  });
}

// On mouse leave
function removeCardHighlight() {
  const roomCards = document.querySelectorAll(".room-card");
  roomCards.forEach(function (roomCard) {
    roomCard.addEventListener("mouseleave", function (event) {
      roomCard.classList.remove("room-card-effect");
    });
  });
}

// ----------------------------------------------------------> end

//--------------------------- BOOKING ENGINE IN MODAL ---------------------------//
// Get the booking engine modal to be opened
const bookingEngineModal = document.querySelector(".booking-engine-modal");
// get the buttons that should trigger the opening of the booking engine modal
const roomButtons = document.querySelectorAll(".primary-btn-rooms");
// get the button that closes the booking engine modal
const closeBookingEngineBtn = document.querySelector(".close");
// get the room type input of bookig engine
const roomType = document.getElementById("room-type");

// when user clicks on "book room" button, open booking engine
roomButtons.forEach(function (roomButton) {
  roomButton.onclick = function () {
    bookingEngineModal.style.display = "block";

    if (roomButton.value === "executive") {
      roomType.value = "Executive";
    } else if (roomButton.value === "suite") {
      roomType.value = "Suite";
    } else if (roomButton.value === "standard") {
      roomType.value = "Standard";
    } else if (roomButton.value === "standard mini") {
      roomType.value = "Standard Mini";
    }
  };
});

// when user clicks on "close" button, close booking engine
closeBookingEngineBtn.onclick = function () {
  bookingEngineModal.style.display = "none";
};

// when user clicks anywhere outside of the booking engine, "close" button, close booking engine
// window.onclick = function (event) {
//   if (event.target === bookingEngineModal) {
//     bookingEngineModal.style.display = "none";
//     console.log("booking engine off");
//   }
// };

// getting current date & disabling past date on booking engine date picker
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();

// copy-right year
const copyRightYear = document.querySelector(".year");
copyRightYear.innerHTML = year;
// ----------------------------------------------------------> end

//---------------------------PROCESSING OF THE BOOKING ENGINE FORM---------------------------//
window.addEventListener("DOMContentLoaded", function () {
  // get the form elements defined in your form HTML above
  var form = document.getElementById("booking-form");
  // get empty HTML form status
  var status = document.getElementById("status");

  // Success function for after the form is submitted successfully.
  function success() {
    form.reset();
    status.classList.add("success");
    status.innerHTML =
      "<p>Thanks! Availability to be emailed to you within 24hrs.</p>";
  }

  // Error function, where form was not successfully processed/submitted.
  function error() {
    status.classList.add("error");
    status.innerHTML =
      "<p>Oops! An error occured. Reload page & try again.</p>";
  }

  // handle the form submission event
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    // store or capture user input in the form of key-value pair, so that it can be sent using the ajax method
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

// helper function for sending an AJAX request
function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}
// ----------------------------------------------------------> end
