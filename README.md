# You&Bank App - responsive banking website with an app to transfer money, request loan and checking balance.

## Description

You&Bank is a *fictional* bank that provides a realistic user experience: using special credentials, user can login to a banking app, transfer money, request a loan, check the balance, or close the account. 

## Demo

### You&Bank Website
![Website](https://github.com/wartelski/youandbankapp/blob/main/Demo/WebsiteDemo.gif)

**SignUp Form**
![SignUp Form](https://github.com/wartelski/youandbankapp/blob/main/Demo/DemoSignUpForm.png)

**Login Form**
![Login Form](https://github.com/wartelski/youandbankapp/blob/main/Demo/DemoLoginForm.png)

### You&Bank App
![App](https://github.com/wartelski/youandbankapp/blob/main/Demo/AppDemo.gif)

## Mobile/Tablet support
You&Bank is a responsive website with responsive app that is possible to view using a browser on different devices, such as mobile or tablet.

![ResponsiveWebsiteTablet](https://github.com/wartelski/youandbankapp/blob/main/Demo/WebsiteDemoTabletSize.gif)
![ResponsiveWebsiteMobile](https://github.com/wartelski/youandbankapp/blob/main/Demo/WebsiteDemoMobileSize.gif)

![ResponsiveApp](https://github.com/wartelski/youandbankapp/blob/main/Demo/AppHomeDemoMobileSize.png)
![ResponsiveApp](https://github.com/wartelski/youandbankapp/blob/main/Demo/DemoAppMobileSize.png)

## Installation

```
git clone https://github.com/wartelski/youandbankapp.git
```

## How to use
As there is no database, but could be considered in the future, I created a separate file with two users' data. <br>

App login form credentials:<br>
```
Username: af 
Password: 1111

Username: nr 
Password: 1212
```
*Note: The login form on the website accepts any username and password. That could be upgraded in the future creating server with database and implementing secure user authentication.*

**Example #1**: transfer money to another account Natasha Rostova (nr).
![transfer](https://github.com/wartelski/youandbankapp/blob/main/Demo/DemoTransferFeatureP1.png)

The user can see changes in the balance after money was sent to another account.
![transfer](https://github.com/wartelski/youandbankapp/blob/main/Demo/DemoTransferFeatureP2.png)

A user who has received money can view it in their balance.
![transfer](https://github.com/wartelski/youandbankapp/blob/main/Demo/DemoTransferFeatureP3.png)

**Example #2**: request a loan<br>
Add needed amount of money
![loan](https://github.com/wartelski/youandbankapp/blob/main/Demo/DemoLoanFeatureP1.png)

Amount of money in the balance also has changed:
![loan](https://github.com/wartelski/youandbankapp/blob/main/Demo/DemoLoanFeatureP2.png)

**Example #3**: close the account <br>
After entering the username and pin code of the present user (check **How to use** section for credentials) the account will be closed and no longer accessible
![close](https://github.com/wartelski/youandbankapp/blob/main/Demo/DemoCloseAccount.png)


## Tech Stack
**Client**: JavaScript, HTML, CSS

- Created parallax hover effect on credit card element using Tilt.js 
- Used regular expressions to validate form
- Used modern, up-to-date JavaScript (ES6+)

## App Flowchart

## Quality Tests

As the app is fairly simple and can be upgraded to more functional project, I didn't add any tests for now. <br>
But if to do so, I would do it using [TestRigor](https://testrigor.com/)
