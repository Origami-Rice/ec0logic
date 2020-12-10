# WASTELESS

## Description

Food waste continues to be a huge problem around the world. A major cause for consumer food waste is simply the lack of planning. This includes forgetting what food you currently have in stock, buying too much of something that you still have, and losing track of expiry dates which ultimately leads to unnecessary spoilage. Our application currently includes a food inventory tracker that will help users keep track of their food’s expiry dates and foods that are specifically expiring soon. Our shopping list tool also reminds users not to buy items that are still remaining in their inventory, which will help them reduce the chance of unintentional duplicate purchases.

## Key Features

The two key features that we implemented in our application are the food inventory tracker and the shopping list tool, each having a subset of allowed actions.

Food Inventory Tracker:

- Users include an expiry date for each item that they add to the inventory.
- Users can manually enter an expiry date, or they can search our library of common foods that will auto generate an estimated expiry date. This will help users determine the shelf life of items such as fresh produce and meats.
- Users can filter their inventory so that they can easily find items that will expire within the next week.
- Users can update items in their inventory based on whether they were used or thrown out. They can specify how much of an item has been finished or wasted which could be the entire remaining quantity or simply a portion.

Shopping List Tool:

- Users can manually add items to their list, and have the option of specifying a quantity.
- A warning will be shown if the item that the user wants to add to their shopping list is currently in their inventory. The goal is to prevent duplicate purchases.
- Allow the user to check off items in their shopping list to signify that they have been acquired.
- Users can directly import items that have been checked off to their inventory. An example usage would be when a user has completed their grocery trip, they do not have to re-enter all the items in the inventory section.

## Instructions

The deployed application can be accessed [here](https://expo.io/@jen-z/projects/wasteless).
Instructions below specify two methods for running the app from the linked page.

### Running the App on a Mobile Device

Note that this only works Android devices. First, install the [Expo Client app](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_CA&gl=US) from the Google Playstore on your device. Then, scan the QR code from within the Expo Client app.

### Running the App From the Browser

From the linked page, click “Open project in the browser”. A pop-up will appear, click “Open Project”. This will load an emulator. Click “Tap to Play”, then when the page loads, scroll down and tap on “Open Project Using Expo” to start the application. If you see a pop up with the header “Hello there, friend!”, simply tap the “x” button on the top right. When you enter the application, all features can be accessed without an account.

### Feature 1: Inventory Tracker

Initially, you will see a screen titled “My Inventory”. This screen displays all the food currently in your inventory. Directly under the “My Inventory” header are two buttons labelled “All Foods” and “Expiring Soon”. You can click each to switch between viewing all the food currently in your inventory or only the foods that are expiring within the next week.

#### Adding food to your inventory

1. On the “My Inventory” screen, tap on the round plus button near the bottom of the screen.
2. A new screen will pop up that allows you to either add a new food item fully manually or by selecting a food item in our database.
   1. To enter in a new food item manually, type in the name of the food in the “Enter New Food Item” text box. Enter the quantity of the item that you would like to add in the “Amount” text box and select a unit of measurement from the dropdown next to it (Note: There is currently a bug with this screen that prevents you from scrolling through the list of options in the dropdown). Then, select an expiry date using the date picker under “Select Expiry Date”. When you are finished, tap on the “Confirm” button at the bottom to add the item to your inventory. Tap on the “x” button at the top right if you want to cancel.
   2. To select a food item in our library of predefined common food items, tap on the “s” button at the top left of the screen. Search for the name of the food in the “Search Common Foods” text box and tap on the item that you are looking for. If you cannot find your item, tap on the “x” button on the top right and refer to part a) above to enter in your food item manually. If you select an item from the library, you can proceed to enter the amount of this item you have in the “Amount” text box. You will see an estimate for the expiry date, but you can also manually select a new expiry. When you are finished, tap on the “Confirm” button at the bottom to add the item to your inventory.

#### Updating food in your inventory

1. If you tap on the small grey circle at the bottom right of each item in the inventory page, an alert will pop up asking you to mark the item as used or thrown out. Choose the option that best describes what you would like to do.
2. On the next screen, enter the amount that was used/threw out. At the bottom of this screen are two grey buttons. Tap on the “Confirm” button to make the update or the “Cancel” button to cancel.

### Feature 2: Shopping List Tool

Navigate to the shopping list using the navigation bar at the bottom of the screen.

#### Adding items to your shopping list

1. Tap on the round button with the plus icon near the bottom left of the screen.
2. Enter the name of the item you would like to add to your list by typing it into the “Enter New Food Item” text box.
3. If you would like to specify a quantity for this item, enter it in the “Amount” text box and select a unit of measurement from the dropdown next to it (though there is currently a bug with the dropdown).
4. When you are finished, tap the “Confirm” button at the bottom to add the item to your shopping list. Tap on the “x” button at the top right if you want to cancel the addition.
5. A pop up will appear if you attempt to add an item that is still in your inventory. If this happens, you can tap on “Continue Anyways” if you would like to add the item to your shopping list anyway or “Go Back” to edit the item or cancel the addition.

#### Checking off items in your shopping list

1. If you tap the small grey circle on an item, the text in the box will change to a faded colour. This means that you have successfully checked off the item.
2. You can tap on the circle again to uncheck the item.
3. If you would like to add the checked off items in your shopping list to your inventory, tap on the round button with the up arrow icon near the bottom right of the screen. You can see the changes made in your inventory by returning to the inventory tab.

## Development requirements

The following defines the requirements and steps to follow for running the app locally.

1. Install Node.js which can be found [here](https://nodejs.org/en/download/) (the latest version is recommended and it comes with Node Package Manager).
2. Ensure that Git is installed. Instructions can be found [here](https://git-scm.com/downloads).
3. Install Expo CLI with the command `npm install -g expo-cli`
4. Open a terminal window.
5. Clone this git repository via HTTPS in your chosen directory with the command `git clone https://github.com/csc301-fall-2020/team-project-5-ec0logic.git`

### Running the server

6. Navigate to directory team-project-5-ec0logic/back-end and enter the command `npm install` in order to install all the dependencies.
7. Install nodemon with the command `npm install -g nodemon` (should you encounter permission restrictions on linux or macOS then try installing nodemon as an administrator with `sudo npm install -g nodemon`).
8. In order to run and listen to the express server during development, enter the command `nodemon start.js` in the terminal.

### Running the frontend application

Note that since the server has already been deployed on Heroku, steps 6-8 are not required to start up the frontend react native app. 9. Next, navigate to directory team-project-5-ec0logic/front-end and once again install any dependencies using command `npm install` 10. Enter the command `npm start`. A new window/tab will open in your browser. (Note: If you run into any issues, run `expo start -c` instead).

#### Running the application on your device

To run on a physical phone, you need to download the Expo client app. This can be downloaded from the Play Store for Android or from the App Store for iOS.

Once the app is downloaded, open the app and sign in or create a free Expo Client account. On iOS, use the phone’s camera app to scan the QR code from the terminal or on the browser tab (from Step 10). On Android, scan it from the Expo Client app. This will begin running the application (it might take 1-2 minutes to build).

#### Running the application using a simulator

You can install an iOS simulator or Android emulator to run the app directly on your computer. To start, follow the instructions for setting up the iOS simulator [here](https://docs.expo.io/versions/latest/workflow/ios-simulator/) or the Android emulator [here](https://docs.expo.io/versions/latest/workflow/android-studio-emulator/). The iOS simulator only runs on macOS, but Android emulators run on any major operating system. You must have the emulator or simulator open and running on your computer. Then, return to the browser tab (from Step 10) and press the "run on IOS simulator" or "run on Android emulator" button. It might take 1-2 minutes to build before the app starts running.

#### Running Backend Tests

The following are the steps for running the tests for the backend,

1. Open a new terminal, and navigate to directory team-project-5-ec0logic/back-end
2. Jest and Supertest should have been installed already along with the other dependencies, however if they are not, then run command `npm install` once more.
3. In order to run the tests enter one of the following commands `npm run test` or `npm run test:watch`.
4. Enter `a` to run all tests.

## Deployment and Github Workflow

### Workflow

Since we decided to split into backend and frontend teams, we created two different branches on git. This allowed us to work on our respective tasks without having to worry about what was happening on the other end. Once features on both ends were mostly completed and functional, we discussed as a team how we would set up communication between the two ends. This worked well as it allowed us to easily merge the two branches since no overlapping code meant no conflicts. At this point, Jenny, our product manager, was responsible for creating the pull requests for each of the two branches to the master branch, but this was reviewed by the members of the respective teams before merging.

The frontend team also used https://snack.expo.io/ to test out specific layouts and features. After a team member completed a feature or screen, they would send the snack link to the other frontend team member for review. The code would be added to the repository after we verified that everything was working as expected. This was great for testing immediate changes and quickly finding bugs in the UI.

### Deploying Server on Heroku

We decided to host our express backend server on Heroku. It runs on 'https://powerful-scrubland-01586.herokuapp.com'

The specific steps that we took to set this up are as follows:

1. In Git repository:
   - Make a new file called “Procfile” with line <ins>web: node ./back-end/start.js</ins>
   - In package.json add <ins>"heroku-postbuild": "npm install"</ins> to “scripts”
1. Create a new app on Heroku.
1. Set our Heroku deployment method as GitHub.
1. Connect to Github repository and set up automatic deployment for the master branch.

Heroku will redeploy the backend application every time someone pushes to master. This way, we can interact with our database without having to create a local server on our computers. This also makes it more straightforward to make API requests from the frontend.

### Deploying React Native App Using Expo

We used the expo publish feature to deploy our frontend application following these steps:

1. Create an expo account.
2. Run the terminal command `expo publish` in the front-end folder of our project.
3. This published our app to a remote server, which can be accessed via [this link](https://expo.io/@jen-z/projects/wasteless).

## Licenses

Our partner asked us not to apply a license to our codebase, which means that the default copyright laws will apply. Note that the previous team selected the MIT license. However, it appears that our partner does not plan to make the project open-source, so it was not the suitable choice. At the moment, since our team is working exclusively on this project, and since the GitHub repository has been made private, the decision to omit a license will not affect our development and codebase. Our partner made this choice because she plans to use the application in a business accelerator. She also expressed that she prefers to take down the GitHub repository after the project has been completed, emphasizing that she wishes to keep the code private.
