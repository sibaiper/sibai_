const element = document.querySelector(".animated-element");

function cubicBezier(t, p1x, p1y, p2x, p2y) {
  const cx = 3 * p1x;
  const bx = 3 * (p2x - p1x) - cx;
  const ax = 1 - cx - bx;

  const cy = 3 * p1y;
  const by = 3 * (p2y - p1y) - cy;
  const ay = 1 - cy - by;

  function sampleCurveX(t) {
    return ((ax * t + bx) * t + cx) * t;
  }

  function solve(t) {
    let x = t;
    for (let i = 0; i < 4; ++i) {
      const x2 = sampleCurveX(x) - t;
      if (Math.abs(x2) < 1e-6) return x;
      const d2 = (3 * ax * x + 2 * bx) * x + cx;
      if (Math.abs(d2) < 1e-6) break;
      x -= x2 / d2;
    }
    return x;
  }

  return ((ay * solve(t) + by) * solve(t) + cy) * solve(t);
}

function easeInOutCubic(t) {
  return cubicBezier(t, 0.87, 0.06, 0, 0.8); //working expo function
}

const sib = {
  increment: function (selector, settings) {
    let element = document.querySelector(selector);

    function animateElement(duration, targetCount) {
      const startTime = performance.now();

      const initCount = 0;

      function updatePosition(currentTime) {
        const elapsed = (currentTime - startTime) / 1000; // Convert to seconds

        if (elapsed < duration) {
          const progress = easeInOutCubic(elapsed / duration); // HERE IS THE EASE USE

          const decimalPlaces = 2; // Adjust the number of decimal places as needed
          // Calculate the new count based on progress
          //add one to the end outside the brackets if using my easing function
          const newCount = initCount + (targetCount - initCount) * progress;

          // Update the count and display it
          count = Math.round(newCount);
          element.innerText = count;

          if (count < targetCount) {
            requestAnimationFrame(updatePosition);
          }
        } else {
          // Ensure the final
          element.innerText = count;
        }
      }

      requestAnimationFrame(updatePosition);
    }
    animateElement(settings.duration, settings.to);

    if (settings.makeSure == true) {
      let added_time = 50;
      setTimeout(() => {
        element.innerText = settings.to;
        console.log("make sure us on + duration is: " + settings.duration);
      }, settings.duration * 1000 + added_time);
    } else {
      console.log("make sure is off");
    }
  },
};

var duration = 5;

document.documentElement.style.setProperty("--duration", duration + "s");
