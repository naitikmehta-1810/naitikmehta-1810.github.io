function setupScrollTriggerAnimation() {
  gsap.registerPlugin(ScrollToPlugin);

  var tl = gsap.timeline({
    scrollTrigger: {
      start: "4% 6%",
      end: "6%,5%",
      scrub: 1,
      pin: true,
    },
  });

  tl.to(".nav", {
    backdropFilter: "blur(5px)",
    height: "70px",
    overflow: "hidden",
    backgroundColor: "#000",
  });
}

// Detect if a link's href goes to the current page
function getSamePageAnchor(link) {
  if (
    link.protocol !== window.location.protocol ||
    link.host !== window.location.host ||
    link.pathname !== window.location.pathname ||
    link.search !== window.location.search
  ) {
    return false;
  }

  return link.hash;
}

// Scroll to a given hash, preventing the event given if there is one
function scrollToHash(hash, e) {
  const elem = hash ? document.querySelector(hash) : false;
  if (elem) {
    if (e) e.preventDefault();
    gsap.to(window, { scrollTo: elem });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Initialize ScrollTrigger animation
  setupScrollTriggerAnimation();

  // Initialize cursor
  let mouseCursor = document.querySelector(".cursor");
  gsap.set(mouseCursor, {
    xPercent: -50,
    yPercent: -50,
    transformOrigin: "center center",
  });
  gsap.to(mouseCursor, { opacity: 1 });

  // Event delegation for click events
  document.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      scrollToHash(getSamePageAnchor(e.target), e);
    }
  });

  // File type validation
  function acceptFileType() {
    var inputElement = document.getElementById("file-upload");
    var files = inputElement.files;
    if (files.length == 0) {
      alert("Please choose a file first...");
      return false;
    } else {
      var filename = files[0].name;
      var extension = filename.substr(filename.lastIndexOf("."));
      var allowedExtensionsRegx = /(\.png|\.jpeg|\.pdf|\.jpg)$/i;
      var isAllowed = allowedExtensionsRegx.test(extension);
      if (isAllowed) {
        alert("File type is valid for upload");
      } else {
        alert("Invalid file type.");
        return false;
      }
    }
  }

  // Initialize ParticleJS
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#fff",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#fff",
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: "img/github.svg",
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 1,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#fff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  });

  // Card hover effect
  const bugElements = document.querySelectorAll(".bug-a");

  bugElements.forEach((element) => {
    element.addEventListener("click", function () {
      bugElements.forEach((otherElement) => {
        if (otherElement !== this) {
          otherElement.classList.remove("hovered");
        }
      });

      this.classList.toggle("hovered");
    });
  });
});
