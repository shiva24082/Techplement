document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.getElementById("menuToggle");
  const navMenu = document.getElementById("mobileMenu");
  const body = document.body;
  let menuOpen = false;

  mobileMenuBtn.addEventListener("click", function () {
    menuOpen = !menuOpen;

    if (menuOpen) {
      openMobileMenu();
    } else {
      closeMobileMenu();
    }
  });

  function openMobileMenu() {
    navMenu.classList.add("show");
    mobileMenuBtn.classList.add("open");
    body.style.overflow = "hidden";

    const menuItems = navMenu.querySelectorAll("li");
    const authButtons = navMenu.querySelector(".mobile-auth");

    menuItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateX(0)";
      }, index * 100 + 200);
    });

    setTimeout(() => {
      if (authButtons) {
        authButtons.style.opacity = "1";
        authButtons.style.transform = "translateX(0)";
      }
    }, menuItems.length * 100 + 300);
  }

  function closeMobileMenu() {
    const menuItems = navMenu.querySelectorAll("li");
    const authButtons = navMenu.querySelector(".mobile-auth");

    menuItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateX(-20px)";
    });

    if (authButtons) {
      authButtons.style.opacity = "0";
      authButtons.style.transform = "translateX(-20px)";
    }

    setTimeout(() => {
      navMenu.classList.remove("show");
      mobileMenuBtn.classList.remove("open");
      body.style.overflow = "";
      menuOpen = false;
    }, 300);
  }

  document.addEventListener("click", function (event) {
    const isClickInsideMenu =
      navMenu.contains(event.target) || mobileMenuBtn.contains(event.target);
    if (!isClickInsideMenu && menuOpen) {
      closeMobileMenu();
    }
  });

  document.querySelectorAll("#mobileMenu a").forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768 && menuOpen) {
        closeMobileMenu();
      }
    });
  });

  const courses = [
    {
      title: "Web Development Bootcamp",
      description:
        "Learn full-stack web development with HTML, CSS, JavaScript, and more.",
      image: "images/web-dev.jpg",
      duration: "8 Weeks",
      rating: "4.9",
      price: "$199",
    },
    {
      title: "Data Science Fundamentals",
      description:
        "Introduction to data analysis, visualization, and machine learning.",
      image: "images/data-science.jpg",
      duration: "6 Weeks",
      rating: "4.7",
      price: "$249",
    },
    {
      title: "UX/UI Design Masterclass",
      description: "Master user experience and interface design principles.",
      image: "images/ux-ui.jpg",
      duration: "4 Weeks",
      rating: "4.8",
      price: "$179",
    },
    {
      title: "Mobile App Development",
      description: "Build cross-platform mobile apps with React Native.",
      image: "images/mobile-app.jpg",
      duration: "5 Weeks",
      rating: "4.6",
      price: "$229",
    },
    {
      title: "Python Programming",
      description: "From basics to advanced Python programming concepts.",
      image: "images/python.jpg",
      duration: "7 Weeks",
      rating: "4.9",
      price: "$159",
    },
    {
      title: "Digital Marketing",
      description: "Learn SEO, social media marketing, and content strategy.",
      image: "images/digital-marketing.jpg",
      duration: "4 Weeks",
      rating: "4.5",
      price: "$149",
    },
  ];

  const courseGrid = document.querySelector(".course-grid");

  function renderCourses() {
    courses.forEach((course, index) => {
      const courseCard = document.createElement("div");
      courseCard.className = "course-card";
      courseCard.style.transitionDelay = `${index * 0.1}s`;

      courseCard.innerHTML = `
                <div class="course-image">
                    <img src="${course.image}" alt="${course.title}">
                </div>
                <div class="course-info">
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <div class="course-meta">
                        <span>${course.duration}</span>
                        <span class="rating"><i class="fas fa-star"></i> ${course.rating}</span>
                    </div>
                    <div class="course-price">${course.price}</div>
                    <button class="btn-primary">Enroll Now</button>
                </div>
            `;

      courseGrid.appendChild(courseCard);

      const enrollBtn = courseCard.querySelector(".btn-primary");
      enrollBtn.addEventListener("click", function () {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        setTimeout(() => {
          alert(`You've enrolled in ${course.title}!`);
          this.innerHTML = '<i class="fas fa-check"></i> Enrolled!';
          setTimeout(() => {
            this.innerHTML = "Enroll Now";
          }, 2000);
        }, 1000);
      });
    });
  }

  const testimonials = document.querySelectorAll(".testimonial");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let currentTestimonial = 0;
  let autoSlideInterval;

  function showTestimonial(index, direction = "right") {
    testimonials[currentTestimonial].classList.remove("active");
    testimonials[
      currentTestimonial
    ].style.animation = `testimonialOut${direction} 0.5s forwards`;

    currentTestimonial = (index + testimonials.length) % testimonials.length;

    setTimeout(() => {
      testimonials[currentTestimonial].classList.add("active");
      testimonials[
        currentTestimonial
      ].style.animation = `testimonialIn${direction} 0.5s forwards`;
    }, 500);
  }

  const style = document.createElement("style");
  style.innerHTML = `
        @keyframes testimonialInRight {
            from { opacity: 0; transform: translateX(50px) scale(0.95); }
            to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes testimonialOutRight {
            from { opacity: 1; transform: translateX(0) scale(1); }
            to { opacity: 0; transform: translateX(-50px) scale(0.95); }
        }
        @keyframes testimonialInLeft {
            from { opacity: 0; transform: translateX(-50px) scale(0.95); }
            to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes testimonialOutLeft {
            from { opacity: 1; transform: translateX(0) scale(1); }
            to { opacity: 0; transform: translateX(50px) scale(0.95); }
        }
    `;
  document.head.appendChild(style);

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      showTestimonial(currentTestimonial + 1, "right");
    }, 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  function setupSmoothScrolling() {
    document.querySelectorAll("nav a").forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        if (this.getAttribute("href").startsWith("#")) {
          e.preventDefault();
          const targetId = this.getAttribute("href");
          const targetElement = document.querySelector(targetId);
          const headerHeight = document.querySelector("header").offsetHeight;
          const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          if (window.innerWidth <= 768 && menuOpen) {
            closeMobileMenu();
          }
        }
      });
    });
  }

  function animateOnScroll() {
    const animateElements = document.querySelectorAll(
      ".course-card, .feature, .testimonial-slider, .cta .container"
    );
    const windowHeight = window.innerHeight;
    const triggerPoint = 100;

    animateElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;

      if (elementPosition < windowHeight - triggerPoint) {
        element.classList.add("animate");
      }
    });
  }

  function setupButtons() {
    const viewAllBtn = document.querySelector(".view-all");
    if (viewAllBtn) {
      viewAllBtn.addEventListener("click", function () {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        setTimeout(() => {
          alert("Loading all available courses...");
          this.innerHTML = "View All Courses";
        }, 1000);
      });
    }

    const ctaBtn = document.querySelector(".cta-button");
    if (ctaBtn) {
      ctaBtn.addEventListener("click", function () {
        this.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
        setTimeout(() => {
          alert("Redirecting to sign up page...");
          this.innerHTML = "Get Started Now";
        }, 1000);
      });
    }

    const loginBtns = document.querySelectorAll(".login");
    const signupBtns = document.querySelectorAll(".signup");

    loginBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        alert("Login form will appear here!");
      });
    });

    signupBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        alert("Sign up form will appear here!");
      });
    });
  }

  function setupSearch() {
    const searchInput = document.querySelector(".search-bar input");
    const searchButton = document.querySelector(".search-bar button");

    if (searchButton && searchInput) {
      searchButton.addEventListener("click", function () {
        if (searchInput.value.trim() !== "") {
          this.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Searching...';
          setTimeout(() => {
            alert(`Searching for: ${searchInput.value}`);
            this.innerHTML = '<i class="fas fa-search"></i> Search';
          }, 1000);
        } else {
          searchInput.focus();
          searchInput.style.animation = "shake 0.5s";
          setTimeout(() => {
            searchInput.style.animation = "";
          }, 500);
        }
      });

      searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          searchButton.click();
        }
      });
    }

    const shakeStyle = document.createElement("style");
    shakeStyle.innerHTML = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                20%, 60% { transform: translateX(-5px); }
                40%, 80% { transform: translateX(5px); }
            }
        `;
    document.head.appendChild(shakeStyle);
  }

  function init() {
    renderCourses();
    showTestimonial(currentTestimonial);
    startAutoSlide();
    setupSmoothScrolling();
    setupButtons();
    setupSearch();

    prevBtn.addEventListener("click", function () {
      showTestimonial(currentTestimonial - 1, "left");
      resetAutoSlide();
    });

    nextBtn.addEventListener("click", function () {
      showTestimonial(currentTestimonial + 1, "right");
      resetAutoSlide();
    });

    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll();
  }

  init();
});
