// Navigation Menu

const navigationMenu = function () {
  const dropdownItems = document.querySelectorAll(".dropdown-hover");

  if (window.innerWidth < 1000) {
    const menu = document.querySelector(".menu");
    const navbar = document.querySelector(".navbar");
    const dropdownLinks = document.querySelectorAll(".show-dropdown");
    const dropdownLinksBack = document.querySelectorAll(
      ".dropdown-heading-link"
    );

    menu.addEventListener("click", () => {
      navbar.classList.toggle("change");

      if (!navbar.classList.contains("change")) {
        document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
          dropdown.style.left = "-20rem";
        });
      }
    });

    dropdownLinks.forEach((link) => {
      link.addEventListener("click", () => {
        link.nextElementSibling.style.left = "0";
      });
    });

    dropdownLinksBack.forEach((headingLink) => {
      headingLink.addEventListener("click", () => {
        headingLink.parentElement.parentElement.style.left = "-20rem";
      });
    });
  } else {
    dropdownItems.forEach((dropdownItem) => {
      const wrapper = document.querySelector(".navbar-wrapper");

      dropdownItem.addEventListener("mouseover", () => {
        dropdownItem.lastElementChild.style.cssText =
          "opacity: 1; visibility: visible";
        wrapper.style.background =
          "linear-gradient(to right, #6c757d, #adb5bd, #6c757d)";
        dropdownItem.firstElementChild.firstElementChild.style.transform =
          "rotate(180deg)";
      });

      dropdownItem.addEventListener("mouseout", () => {
        dropdownItem.lastElementChild.style.cssText =
          "opacity: 0; visibility: hidden";
        wrapper.style.background = "none";
        dropdownItem.firstElementChild.firstElementChild.style.transform =
          "rotate(0)";
      });
    });
  }
};

navigationMenu();

window.addEventListener("resize", () => {
  window.location.reload();
});

// Tabbed Component
const tabsContainer = document.querySelector(".slider-tabs-container");
const tabs = document.querySelectorAll(".slider-btn");
const tabsContent = document.querySelectorAll(".slider-content");

tabsContainer.addEventListener("click", function (e) {
  const clickedEl = e.target.closest(".slider-btn");

  if (!clickedEl) return;

  // Remove active class
  tabs.forEach((tab) => tab.classList.remove("slider-btn-active"));
  tabsContent.forEach((text) => text.classList.remove("slider-content-active"));

  // Adding active class on clicked button
  clickedEl.classList.add("slider-btn-active");

  // Activate content area depend on chosen tab
  document
    .querySelector(`.slider-content--${clickedEl.dataset.tab}`)
    .classList.add("slider-content-active");
});

// Scroll Button
const btnScroll = document.querySelector(".scroll-btn");
const page = document.querySelector("html");

btnScroll.addEventListener("click", () => {
  page.style.scrollBehavior = "smooth";
  setTimeout(() => {
    document.querySelector("html").style.scrollBehavior = "unset";
  }, 1000);
});

// SignUp Form
const formSignUp = document.querySelector(".form--sign-up");
const formLogin = document.querySelector(".form--login");
const form = document.querySelector(".form");
const overlay = document.querySelector(".overlay");
const btnOpenSignUpForm = document.querySelector(".signup-btn");
const btnOpenLoginForm = document.querySelector(".login-btn");
const btnCloseForm = document.querySelector(".btn--close-form");

const btnCloseFormLogin = document.querySelector(".btn--close-form--login");
const btnCloseFormSignUp = document.querySelector(".btn--close-form--signup");

// Open/Close the SignUp Form
const clearValues = function () {
  const inputFields = document.querySelectorAll("input");
  inputFields.forEach((input) => (input.value = ""));
};
const openSignUpForm = function (e) {
  e.preventDefault();

  formSignUp.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

btnOpenSignUpForm.addEventListener("click", openSignUpForm);

const closeFormSignUp = function () {
  formSignUp.classList.add("hidden");
  overlay.classList.add("hidden");

  clearValues();
};

btnCloseFormSignUp.addEventListener("click", closeFormSignUp);
overlay.addEventListener("click", closeFormSignUp);

// Open/Close the Login Form
const openLoginForm = function (e) {
  e.preventDefault();
  formLogin.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

btnOpenLoginForm.addEventListener("click", openLoginForm);

const closeFormLogin = function () {
  formLogin.classList.add("hidden");
  overlay.classList.add("hidden");

  clearValues();
};

btnCloseFormLogin.addEventListener("click", closeFormLogin);
overlay.addEventListener("click", closeFormLogin);

// Validation Form

// Validation Email Input
const validationEmailForm = function (data) {
  const email = document.querySelector(".email");
  const text = document.querySelector(".inpt-text");
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (data.match(pattern)) {
    email.classList.add("valid");
    text.innerHTML = "Your Email Address is valid.";
    text.style.color = "#4f772d";
  } else {
    email.classList.remove("valid");
    text.innerHTML = "Please enter valid Email Address.";
    text.style.color = "#ff0000";
  }

  if (data === "") {
    formSignUp.classList.remove("valid");
    formSignUp.classList.remove("invalid");
    text.innerHTML = "";
    text.style.color = "#4f772d";
  }
};
// Show Password
const showPasswordSignUp = function () {
  const toggleBtn = document.querySelector(".toggleBtn");
  const passwordView = function () {
    const psswrd = document.querySelector(".password");
    if (psswrd.type === "password") {
      psswrd.setAttribute("type", "text");
      toggleBtn.classList.add("hide");
    } else {
      psswrd.setAttribute("type", "password");
      toggleBtn.classList.remove("hide");
    }
  };
  toggleBtn.addEventListener("click", passwordView);
};

showPasswordSignUp();

const showPasswordLogin = function () {
  const toggleBtnView = document.querySelector(".toggleBtnShow");
  const passwordView = function () {
    const psswrd = document.querySelector(".password-login");
    if (psswrd.type === "password") {
      psswrd.setAttribute("type", "text");
      toggleBtnView.classList.add("hide");
    } else {
      psswrd.setAttribute("type", "password");
      toggleBtnView.classList.remove("hide");
    }
  };
  toggleBtnView.addEventListener("click", passwordView);
};

showPasswordLogin();

// Validation Password Input
const validationPasswordForm = function (data) {
  let lowerCase = document.querySelector(".lower");
  let upperCase = document.querySelector(".upper");
  let number = document.querySelector(".numberCh");
  let specialChar = document.querySelector(".special");
  let lengthChar = document.querySelector(".length");

  const lower = new RegExp("(?=.*[a-z])");
  const upper = new RegExp("(?=.*[A-Z])");
  const digits = new RegExp("(?=.*[0-9])");
  const special = new RegExp("(?=.*[!@#$%^&*])");
  const lengthCh = new RegExp("(?=.{8,})");

  // Lower Case Validation check
  if (lower.test(data)) {
    lowerCase.classList.add("valid");
  } else {
    lowerCase.classList.remove("valid");
  }

  // Upper Case Validation check
  if (upper.test(data)) {
    upperCase.classList.add("valid");
  } else {
    upperCase.classList.remove("valid");
  }

  // Number Validation check
  if (digits.test(data)) {
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
  }

  // Special Character check
  if (special.test(data)) {
    specialChar.classList.add("valid");
  } else {
    specialChar.classList.remove("valid");
  }

  // Character Length min 8 check
  if (lengthCh.test(data)) {
    lengthChar.classList.add("valid");
  } else {
    lengthChar.classList.remove("valid");
  }
};

// Confirm Password

const confirmPassword = function (data) {
  let origPasswordInpVal = document.querySelector(".password").value;
  const detail_match = document.querySelector(".psswrd-match");

  if (origPasswordInpVal !== 0 && origPasswordInpVal !== "") {
    if (origPasswordInpVal === data) {
      detail_match.innerHTML = "Passwords match.";
      detail_match.style.color = "#4f772d";
    } else {
      detail_match.innerHTML = "Passwords does not match.";
      detail_match.style.color = "#ff0000";
    }
  } else {
    alert("Password input can't be empty.");
    detail_match.innerHTML = "Passwords does not match.";
  }
};
