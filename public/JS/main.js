document.addEventListener("DOMContentLoaded", function () {
  let loaderEl = document.querySelector(".loader");
  gsap.to(loaderEl, {
    yPercent: -300,

    duration: 0.5,
    ease: "expo.inOut",
  });

  setTimeout(() => {
    document.body.removeChild(loaderEl);
  }, 600);

  new Splide(".splide", {
    gap: "3rem",
    drag: false,
  }).mount();

  const slider_container_ = document.querySelector(".slider_slider");
  let notClicked = true;
  slider_container_.addEventListener("mousedown", () => {
    notClicked = false;
  });

  setTimeout(() => {
    if (notClicked) {
      // GSAP Timeline
      var tl = gsap.timeline();

      tl.to(".slider-container", {
        duration: 1, // Animation duration in seconds
        boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.5)", // Final box-shadow value
        ease: "power2.inOut", // Easing function
      });
      tl.to(".slider-container", {
        duration: 1, // Animation duration in seconds
        boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0)", // Final box-shadow value
        ease: "power2.inOut", // Easing function
      });
    }
  }, 3000);

  let item = document.querySelector(".item");
  const draggable = Drag.init(".item", {
    bounds: {
      element: ".container",
      type: "circle",
    },
    threshold: 5,
    onClick: () => {
      if (item.classList.contains("scaled")) {
        return;
      }
      item.classList.add("scaled");
      setTimeout(() => {
        item.classList.remove("scaled");
      }, 1250);
    },
    onDragStart: () => {
      if (item.classList.contains("scaled")) {
        item.classList.remove("scaled");
      }

      item.classList.add("noRound");
    },
    onDragEnd: () => {
      item.classList.remove("noRound");

      // document.documentElement.style.setProperty('--bgc-spacing', 160 + 'px');
    },
    // onDrag: () => {document.documentElement.style.setProperty('--bgc-spacing', Math.floor((Math.pow(d, 1.3)*2)) + 'px')}
    onDrag: () => {
      // gsap.to('.dragstuff_h2', { filter: `blur(${Math.floor(d/20)}px)` });
      gsap.to(".dragstuff_h2", {
        filter: `blur(${clamp(0, 200 / 20, Math.floor(d / 20))}px)`,
      });
    },
  });

  //handle increment
  const inc_slide = document.querySelector(".increment_slide");
  const inc_val = document.querySelector("#inc_val");

  inc_val.addEventListener("input", function () {
    if (inc_val.value > 200) {
      inc_val.value = 200;
    } else if (inc_val.value < 10) {
      inc_val.value = 10;
    }
  });

  inc_slide.addEventListener("click", () => {
    sib.increment("#counter", {
      duration: duration,
      to: inc_val.value,
      // ease: "easeInOutExpo",
      makeSure: true,
    });
  });
});
