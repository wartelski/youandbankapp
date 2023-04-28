const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");
const welcomePage = document.querySelector(".welcome_page");

const btnLogin = document.querySelector(".sbm--login-form-app");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnLogout = document.querySelector(".app--exit");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const labelWelcome = document.querySelector(".welcome_user--heading");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const accounts = [account1, account2];
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Creating username with first letter of name+lastname
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((first_letter) => first_letter[0])
      .join("");
  });
};

createUsernames(accounts);

// Show Password
const showPassword = function () {
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

showPassword();

// Formats

const formatMovementDate = function (date, locale) {
  //Days passed
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date); //depend on location of the user
};

const formatCrrncy = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

// Movements
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = ""; //to remove previous data

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCrrncy(mov, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value movements__value--${type}">${formattedMov}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// Balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((accum, currentV) => accum + currentV, 0);

  const formattedMov = formatCrrncy(acc.balance, acc.locale, acc.currency);
  labelBalance.textContent = formattedMov;
};

// Summary
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCrrncy(incomes, acc.locale, acc.currency);

  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCrrncy(
    Math.abs(outcomes),
    acc.locale,
    acc.currency
  );

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCrrncy(
    interest,
    acc.locale,
    acc.currency
  );
};

const updateUI = function (acc) {
  //Display movements
  displayMovements(acc);

  //Display balance
  calcDisplayBalance(acc);

  //Display summary
  calcDisplaySummary(acc);
};

//Logged out timer
const startLogoutTimer = function () {
  const tick = function () {
    const minutes = String(Math.trunc(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");

    //In each call, print the remaining time to UI
    labelTimer.textContent = `${minutes}:${seconds}`;
    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      welcomePage.classList.remove("change");
      containerApp.classList.remove("change");
    }
    //Decrease 1s
    time--;
  };
  //Set time to 4 minutes
  let time = 700;
  //Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

/* Display the App */
let currentAccount, timer;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and welcome msg
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }!`;
    welcomePage.classList.add("change");
    containerApp.classList.add("change");

    // Current date according to location
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields after login
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // To avoid activation of two(or more, depends on the number of users) timers at the same time
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();

    updateUI(currentAccount);
  } else {
    alert("User does not exist. Please enter valid username and pin code.");
  }
});

// OPERATIONS

// Transfer money
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferTo.value = inputTransferAmount.value = "";
  inputTransferAmount.blur();

  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    //Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    recieverAcc.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);

    //Reset timer
    clearInterval(timer);
    timer = startLogoutTimer();
  } else {
    alert(
      "Please check the username and the amount you want to send. Note, that amount should be less or equal your current balance."
    );
  }
});

// Request Loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      //add the row with new amount
      currentAccount.movements.push(amount);

      //Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      //Update UI
      updateUI(currentAccount);

      //Reset timer
      clearInterval(timer);
      timer = startLogoutTimer();
    }, 2500);
  }
  inputLoanAmount.value = "";
});

// Close account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount?.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );

    //Delete account
    accounts.splice(index, 1);

    //Hide UI
    welcomePage.classList.remove("change");
    containerApp.classList.remove("change");
  } else {
    alert("Such user does not exist. Please try again.");
  }
  inputCloseUsername.value = inputClosePin.value = "";
});

btnLogout.addEventListener("click", function () {
  welcomePage.classList.remove("change");
  containerApp.classList.remove("change");
});
