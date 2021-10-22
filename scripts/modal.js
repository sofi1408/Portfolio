$(document).ready(function () {
  // MODAL
  var modalText = {
    realtor: {
      title: "Let your dreams come true",
      tag: "BUY YOUR OWN HOME",
      detail:
        "Nexter is an application that will help you to buy your dream home and provide you the ultimate personal freedom",
      link: "https://getyourdreamhome.netlify.app/",
    },
    tours: {
      title: "Book your tours online",
      tag: "LIVE ADVENTURES LIKE YOU NEVER HAVE BEFORE.",
      detail:
        "Gear up for the exiciting trips and adventures that you ever thought off. We are here to provide you a single point to do all the bookings hassle free.",
      link: "https://packyourbags.netlify.app/",
    },
    forkify: {
      title: "Get all the tasty recipes",
      tag: "MAKE FOOD THAT EVERYONE LOVES",
      detail:
        "Take your cooking skill to next level by trying these awesome recipes",
      link: "https://forkify-v2.netlify.app/",
    },
    reactFood: {
      title: "Order your favourite food",
      tag: "FOOD ORDERING",
      detail:
        "Choose your favorite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home.",
      link: "https://react-food-order.netlify.app/",
    },
    getallresources: {
      title: "Get All Resources",
      tag: "GET ALL THE RESOURCES FROM THE INTERNET AT ONE PLACE",
      detail:
        "This is website where you can get all the free and paid resources for any technology that you want to learn at one place.",
      link: "https://getallresources.com/",
    },
    myprefectcv: {
      title: "MyPerfectCv",
      tag: "CREATE THE PERFECT CV ONLINE.",
      detail:
        "Myperfectcv is an online resume building website which helps you to create the best resume as per your profile.",
      link: "https://www.myperfectcv.co.uk/",
    },
    livecareer: {
      title: "LiveCareer",
      tag: "CREATE THE BEST CV HERE.",
      detail:
        "Livecareer is an online resume building website which helps you to create the best resume as per your profile.",
      link: "https://www.livecareer.co.uk/",
    },
    carrefour: {
      title: "Carrefour",
      tag: "Online Shopping.",
      detail:
        "Carrefour is an online shopping website like amazon which is active in middle eastern countries.",
      link: "https://www.carrefouruae.com/",
    },
    themall: {
      title: "The Mall",
      tag: "PEER GUIDED SHOPPING.",
      detail:
        "The Mall is a place to follow the latest fashion purchases of your friends and favorite celebrities. Built with Node.js and Handlebars. Features the ability to import thousands of top brands products into one shopping site.",
    },
  };

  $("#gallery .button").on("click", function () {
    fillModal(this.id);
    $(".modal-wrap").addClass("visible");
  });

  $(".close").on("click", function () {
    $(".modal-wrap, #modal .button").removeClass("visible");
  });

  $(".mask").on("click", function () {
    $(".modal-wrap, #modal .button").removeClass("visible");
  });

  var carousel = $("#carousel"),
    slideWidth = 700,
    threshold = slideWidth / 3,
    dragStart,
    dragEnd;

  setDimensions();

  $("#next").click(function () {
    shiftSlide(-1);
  });
  $("#prev").click(function () {
    shiftSlide(1);
  });

  carousel.on("mousedown", function () {
    if (carousel.hasClass("transition")) return;
    dragStart = event.pageX;
    $(this).on("mousemove", function () {
      dragEnd = event.pageX;
      $(this).css("transform", "translateX(" + dragPos() + "px)");
    });
    $(document).on("mouseup", function () {
      if (dragPos() > threshold) {
        return shiftSlide(1);
      }
      if (dragPos() < -threshold) {
        return shiftSlide(-1);
      }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      slideWidth = $(window).innerWidth();
    }
    $(".carousel-wrap, .slide").css("width", slideWidth);
    $(".modal").css("max-width", slideWidth);
    $("#carousel").css("left", slideWidth * -1);
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass("transition")) return;
    dragEnd = dragStart;
    $(document).off("mouseup");
    carousel
      .off("mousemove")
      .addClass("transition")
      .css("transform", "translateX(" + direction * slideWidth + "px)");
    setTimeout(function () {
      if (direction === 1) {
        $(".slide:first").before($(".slide:last"));
      } else if (direction === -1) {
        $(".slide:last").after($(".slide:first"));
      }
      carousel.removeClass("transition");
      carousel.css("transform", "translateX(0px)");
    }, 700);
  }

  function fillModal(id) {
    $("#modal .title").text(modalText[id].title);
    $("#modal .detail").text(modalText[id].detail);
    $("#modal .tag").text(modalText[id].tag);
    if (modalText[id].link)
      $("#modal .button")
        .addClass("visible")
        .parent()
        .attr("href", modalText[id].link);

    $.each($("#modal li"), function (index, value) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($("#modal .slide"), function (index, value) {
      $(this).css({
        background:
          "url('/img/slides/" + id + "-" + index + ".jpg') center center/cover",
        backgroundSize: "cover",
      });
    });
  }
});
