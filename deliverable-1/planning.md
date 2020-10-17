# WASTELESS
> _Note:_ This document is meant to evolve throughout the planning phase of your project.   That is, it makes sense for you commit regularly to this file while working on the project (especially edits/additions/deletions to the _Highlights_ section). Most importantly, it is a reflection of all the planning you work you've done in the first iteration. 
 > **This document will serve as a master plan between your team, your partner and your TA.**

## Product Details
 
#### Q1: What are you planning to build?

##### Problem & Motivation
Household food waste is a huge problem that contributes significantly to climate change. According to the National Zero Waste Council’s research on household food waste in Canada, almost 2.2 million tonnes of food is wasted each year (Source: https://www.toronto.ca/services-payments/recycling-organics-garbage/long-term-waste-strategy/waste-reduction/food-waste/#:~:text=According%20to%20the%20National%20Zero,waste%20has%20substantial%20environmental%20impacts). Food waste not only wastes the resources required to produce and distribute that food, but decomposing food in landfills also produces more greenhouse gases, like methane. A major cause for household food waste is simply lack of planning. This can lead to losing track of what food you still have in stock, which may result in overbuying. Similarly, losing track of when foods will expire results in an accumulation of spoiled foods. 

We are expanding the features of our project partner's existing mobile app with the objective of encouraging people to be conscious of their food waste, making it convenient for people to reduce the amount of food that they waste, and allowing them to quantify the environmental impact of their actions.  


##### Product Description
Specifically, we are developing a food inventory tracker, a shopping list tool, and a greenhouse gas (GHG) emissions metric tracker.

Our product will: 

* Keep a record of the food that the user has bought with their expected expiry dates, and notify the user close to the expiry date of any expiring food products that have not been used up yet
* Allow users to create a shopping list that will help them buy only what they need and reduce the chances of wasted food in the future
* Show users the impact that their specific food waste habits have on the environment, and track a user’s performance over time with respect to reducing food waste in their homes and show them the progress that they are making in reducing their GHG emissions

##### First Mock-Up of Product

The following is a link to a first mock-up. Note that the recipes and tips pages have already been implemented in our partner’s existing application, thus we did not include these in our mock-up demonstration. https://www.figma.com/proto/vqgLvz31CecYXUb1jzv71s/Wasteless?node-id=17%3A236&scaling=scale-down


#### Q2: Who are your target users?
   
##### General Description of Target Users
Our target users are people who want to make steps to becoming more eco-friendly starting with their own food consumption, but find it difficult to organize their food and grocery purchases within their busy everyday lives. 

##### Personas 

Miranda is a mother of two. Her goal is to live a sustainable life and have a healthy, happy family. She works during the week, so she usually does regular grocery trips once a week. She cooks for the family. Since she usually comes with meal ideas on the spot, she is not really tracking what foods she has on hand, except from what she can see by looking in the fridge. She is often finding spoiled milk that she does not even remember buying. 

Laura is a university student and avid environmentalist. She is working hard not only towards her degree, but also towards a greener lifestyle. She lives on her own and cooks for herself. Due to her heavy course load, she has trouble keeping track of when her food expires and finds, much to her chagrin, that she is constantly throwing out spoiled food. She is making an effort to change that, but she wants to see the progress that she is making and understand the way she is helping the environment. 

George is a proud father and foodie. He is often going on impromptu shopping trips on his way home from work. As he is making his way through the aisles, he is often asking himself, “Wait, do we have any more of this at home?” He never really creates a list and usually goes off his instincts, which is often to buy first. Unfortunately, he usually comes home realizing that he has double of half his inventory. He wants to reduce his carbon footprint and set a good example for his children. His main concern is controlling his purchases, but at the same time, he finds it too tedious to “plan” his grocery trips. 


#### Q3: Why would your users choose your product? What are they using today to solve their problem/need?

    
Our product will allow users to track their food inventory and update items as they are being consumed or wasted. Thus, it will allow them to see a real time overview of all the food items they have along with their expected expiry dates wherever and whenever they want. There are similar apps that offer this feature but our app will allow users to filter the foods that are expiring soon so that they can easily determine which foods they should use first. Further, since the app will send notifications to users about foods that are expiring soon, users can easily stay informed and avoid unnecessary food spoilage. In addition, when users add new items, our app will suggest an expected expiry date and the best storage method for that item. This will help clear misconceptions about how long foods last, especially for common foods without expiry dates (ex. produce, meats).

Current tools for making a grocery shopping list include using a note taking application or traditional pen and paper. This requires the user to manually cross reference their refrigerator and pantry. The user also needs to make the right decisions about what and how much to buy. Our shopping list feature is integrated with the inventory tracker so that when they try adding items to the shopping list that they still have in their inventory, the app will give a warning. It also stores a short history of the types and amounts of foods that the user has bought in the past but ended up wasting due to food spoilage. That way, the app will give a warning if they try to add the same food and quantity to their shopping list again. This builds on our partner's idea of predicting and preventing possible future food waste before it even gets to the consumer's home.

Another unique selling point of our product is that we automatically calculate the user’s greenhouse gas (GHG) emissions over time based on the items in their inventory that have expired. This allows users to measure their food waste and see the environmental impacts of their actions. We want to show that even if you are wasting a little food, it can build up over time. To put this into perspective, according to the City of Toronto website, “Canada’s 2.2 million tonnes of avoidable household food waste is equivalent to 9.8 million tonnes of CO2 and 2.1 million cars on the road.” (Source: https://www.toronto.ca/services-payments/recycling-organics-garbage/long-term-waste-strategy/waste-reduction/food-waste/#:~:text=According%20to%20the%20National%20Zero,waste%20has%20substantial%20environmental%20impacts). Conversely, users can see how they have progressed and how little improvements have big effects as well. We have not seen any existing alternatives that include this feature. 


#### Q4: How will you build it?

The existing app uses the MERN techstack (MongoDB, Express, React, Node), so we will also be using this. It is simpler to maintain the same stack so that we can focus on implementing new features rather than having to migrate existing work to another platform/technology. 

In order to implement the new features and improve the functionality of some of the existing features, we considered several additional aspects of the tech stack.

##### Storing Data

We will be using our database to storing data for the following reasons: 
 
First is to keep track of information about items in the user’s inventory. 
Our plan for keeping track of the user's inventory involves designing a data structure that will outline the necessary fields of information. The following fields should be included in the data structure representing each item in the inventory: 

 * Product name
 * Expiry date
 * Quantity 
 * Weight, volume, units 
 * Date the item was added
 * Tags (used to filter the inventory contents)
 
Another data structure would be required to store all the preset filter options that can be used to classify the various products that we add to the inventory. When adding an item to the inventory, the user can select from the list of available tags that will be fetched from the database. The tag will be added to the item description that we will store in the database.

Second is to keep track of a short history of the types and amounts of food that the user has wasted in the past (so that if they try to add it again in the future to their shopping list, they will receive a warning). 

Our plan for keeping track of the user's history of commonly wasted foods involves creating a MongoDB document that will list some fixed number of products that have been disposed of by the user. When an item expires, the user will receive a notification and the item will be removed from the inventory to an expired products section. From there, the user can inform the app if they disposed of the product, and the database will be updated accordingly. When a user attempts to add an item to their shopping cart, this list will be checked and if said item appears there, the user will be warned that they previously disposed of it due to spoilage. 

The data structure that represents the user will have a field corresponding to the items currently in the shopping cart. Before the database is updated, we check if the product is already in the user’s inventory and notify them if it is. The user can then choose how to proceed with the addition to the cart. When an item is added to the shopping cart, the additional field quantity can be specified.

Lastly, we need to keep track of the user’s GHG emissions caused by wasted food over the last 6 months (for example).
Our plan for keeping track of the user's history of GHG emissions/environmental impact caused by wasted food involves using the stored weights and quantities of items that get disposed of to calculate an estimate of their contribution to carbon emissions.

##### App Deployment

We also need to determine how we plan to deploy the app. Currently, we are considering deploying via Expo.

##### Testing Strategy

Our testing strategy will revolve around automated testing with the BDD approach. Since we know the specs of our app, we can design tests to check if our intended features work. For example, since our specifications include a shopping list, we can design tests to check if it renders and if adding a new item causes it to appear in the shopping list. This way, once a feature breaks, we will be able to quickly identify what the cause is. We will use Jest as our testing framework.

##### External APIs

We are planning to implement a scanner which will be able scan the expiry date on the tag of the product as well as scan whole products when users are adding new items to their inventory.To do this, we plan to use ML Kit Vision. ML Kit Vision is an API created and maintained by Google and  it makes use of Firebase’s machine learning kit. ML Kit has features such as text recognition, face detection, barcode scanning, and much more. The scanner will be able to scan the product’s expiry date label (if it has one) or it can also scan whole products. If the item scanned is a common food item, we can then automatically fill in an predicted expiry date.  

##### Other Considerations

We need to manually implement the GHG calculator using formulas, and manipulating data that we researched online. In addition, we will need to manually compile data found on the internet through various different websites to create a comprehensive shelf life estimating system for various food items. 


#### Q5: What are the user stories that make up the MVP?

##### User Stories

 * As an environmentalist, I want an easy way to keep track of expiry dates in order to prevent food waste and reduce my carbon footprint.
 * As an environmentalist, I want to be able to see my weekly progress with respect to how much food waste I’ve been able to reduce in order to evaluate the impact of my actions on the environment. 
 * As the person who plans meals in my family, I want to track all types of food items, including produce, packaged foods, leftovers in order to have a comprehensive view of what I have and make plans on the go.
 * As the main shopper in my house, I want to be able to easily check what items I still have at home and the quantity of those items so that I do not make duplicate purchases on my grocery trip.
 * As the person responsible for cooking meals, I want a way to be notified of foods that are expiring soon so that I can use the older ingredients before they go to waste.
 * As a consumer, I want an easy way to keep track of what types of food and how much of that food has been wasted in the past months so I would know which foods to buy less of next time. 
 
##### Acceptance Criteria by Feature

Inventory Tracker
 * Users need to able to add a variety of different types of items 
   * Manually add customs items (ex produce, meat) and expiry dates
   * Search a directory of common items (with preset expected expiry dates), but should be able to modify any entries 
   * Scan items they bought with a labelled expiry date
 * Users need to able to update items in their inventory
   * Different statuses are used or expired
   * Mark a certain quantity of food as used (ex. 1 out of 5 apples as eaten), and update inventory quantity to reflect changes
 * Users should be able to see different overviews of their inventory
   * View all items in inventory
   * View only the upcoming ones that will expire
   
Shopping List
 * Users need to be able to add items to their list 
   * Manually add items or search from a directory of common items
   * Displays a warning if an item that the user wants to add is in the inventory
   * Displays a warning if user adds an item with the same quantity that they bought in the past month that ended up expiring
 * Users should be able to check off items in their list once they buy them
   * Ask whether they want to add that item to their inventory 
   * Delete the item from the shopping list
   
GHG Calculator
 * Users need to be able to see how much GHG (in kg) that they have emitted
   * This will be based on how much food they have wasted in the past week
   * Display a graph depicting a history of their weekly emissions so they can see their improvement or deterioration over the past 6 months

----

## Process Details

#### Q6: What are the roles & responsibilities on the team?

We have defined 5 different types of roles: product manager, front end developer, backend developer, QA tester, and designer. The exact descriptions of the responsibilities associated with each role is linked here: https://www.notion.so/Guide-to-Roles-6582b2a02add42918cadb5468ba5b017

The following is a summary of the role of each member, as well as his/her strengths and weaknesses. The technical responsibilities associated with each role can be found in the link above. However, any other non-software related responsibilities are listed below. 

##### Jenny Zhang

She is assigned the roles of product manager, designer, and QA tester. Additional responsibilities include monitoring the workspace to ensure that tasks are being completed by assigned deadlines, checking in with other team members, leading meeting discussions, and sending weekly summary reports to our partner. 
	
Her strengths include having experience in UX/UI and user-centric design, and having a strong background in graphic design and art. She will take advantage of this in her role as a designer to design a user-friendly and modern UI, and then setting clear requirements for frontend developers to implement. Her experience in user testing will also be useful. Another strength is having experience setting up a SQLite, and doing queries with SQL. She will assist in setting up the database even though we are using a noSQL database.

Her weaknesses include lacking experience with Node.js or Express.js, and MongoDB. Further, she also does not have extensive knowledge regarding setting up an effective CI/CD pipeline. She has some experience with React, but has not worked with React Native.

##### Doreen Huang

She is assigned the roles of designer and frontend developer. In addition, she will be taking meeting minutes every other week and aiding with TA and partner communication. 

Her strengths include having experience with React and React Native, and having a background in visual arts. She will use these skills to design and implement an eye-catching UI. She also has some knowledge of CSS, which will be useful when developing the frontend of the application. 

Her weaknesses include lack of familiarity with JavaScript, Node.js, Express.js, and setting up a CI/CD pipeline. Moreover, her only knowledge of databases is from a course she is currently taking.

##### Jianyi Chen

He has been assigned the roles of backend and frontend developer. One of his key responsibilities is ensuring a good communication channel between client and server. 

His strengths include having experience with React and multiple React libraries, such as libraries for state management. He also has experience with unit testing with React using Jest and React-Testing-Library. 

His weaknesses include only having basic knowledge of databases from a different course and having no experience with MongoDB. He is also unfamiliar with machine learning, which will be used for the scanner feature of the application. He also is not familiar with integration testing in React.

##### Vassilisa Gotcheva

She has been assigned the roles of backend developer and QA tester. Her main focus will be setting up the database. In addition, she will assist with setting up the CI/CD pipeline. 

Her strengths include a basic understanding of setting up a backend with Flask, which will help when tackling the Express backend. She is currently taking an Introduction to Machine Learning course and has some basic knowledge regarding the topic, which may help with the expiry date scanner.

Her weaknesses include lacking experience with parts of the technology stack that was used to build the current version of the app, such as MongoDB and Express. She is also unfamiliar with the testing framework, Jest, and with developing the CI/CD pipeline.

##### William Chu

He has been assigned the roles of frontend and backend developer. In addition, he will be responsible for recording meeting minutes on alternating weeks with Doreen. 

His strengths include experience in Javascript, HTML, and CSS. He has experience with setting up a backend with Flask as well as making a basic CI/CD pipeline.

His weaknesses include a very shallow knowledge of databases, unfamiliarity with Node.js and Express.js, and a lack of experience with React and React Native. 

##### Jamin Yang

His assigned roles are QA tester and frontend developer. He is also flexible with assisting in the backend as required. His main responsibilities include using Jest to test out the features in our code.

His strengths include having experience with React and React Native, along with testing frameworks such as Jest and React Testing Library. Since he has made a basic backend using Express, he will be able to add helpful input to the development of our backend. 

His weaknesses include lacking experience with databases, CI/CD deployment, integration testing and the lack of in-depth knowledge with Node.


#### Q7: What operational events will you have as a team?

We plan to have weekly online meetings on Discord. We have these scheduled for every Saturday at 7 PM EST. The purpose of these meetings is to:
 * Act as a weekly sync, where we summarize what each team member has been working on in the past week, and then discuss, plan, and assign tasks for the upcoming week
 * Host a group coding session, which will give us an opportunity to detect and fix integration problems
 * Review pull requests

We also plan to set meetings as required to discuss and resolve any major issues that arise. To keep our partner up to date, we plan to send her weekly reports summarizing important tasks that we completed over that week, our plan for the upcoming week and any pending non-urgent questions. We have scheduled bi-weekly meetings which will take place on Discord on Sundays at 4-5 PM EST. In addition, since we have a Discord group chat with our partner, we will notify our partner of any major progress or milestones that we achieve between meetings. 

Thus far, we have had two meetings with our partner. The following are summaries of the discussion topics and outcomes for each meeting. 

##### Meeting 1: Oct. 4th 2020 

The main focus of our first meeting with our partner was to introduce ourselves and clarify some of the product requirements outlined in the project proposal. Since our partner already had a partially developed product, it was important that we got an idea of its current functionality. She gave us a demo of what she had. Together, we discussed possible modifications, improvements and additional features. By the end of the meeting, we managed to create a concrete list of the three most important features to be included with a solid understanding of their purpose and intent. We agreed to meet again the following week after our group had a chance to do some research to determine if it was feasible to implement the various features.

For reference, here is the link to the meeting minutes: https://docs.google.com/document/d/1RFdOI11VxtMUrMjiWGUKBkXYXzakQThC4EZEU0uEmeI/edit?usp=sharing

##### Meeting 2: Oct. 11th 2020

The first order of business for the second meeting was to discuss the results of our research. We reviewed options that we found for external APIs. We made some modifications to features, taking out aspects that were difficult to implement and were non-essential. We also reviewed the user stories, confirming with our partner that they accurately reflect the goals that she had in mind. In addition, we drafted concrete requirements for each feature, which our partner evaluated and ultimately gave us the go-ahead. Finally, we decided upon how regularly we would meet up with Karina as well as how to keep her updated on our progress between meetings.

For reference, here is the link to the meeting minutes: https://docs.google.com/document/d/1NPwjjqTdRQInILLJ0h7Str69y5EnuDIu_mnalfZym_w/edit?usp=sharing
 
  
#### Q8: What artifacts will you use to self-organize?

We have set up a team workspace on Notion to manage our tasks. We have a to-do/task board where we will track tasks by different levels of priority and completion status, as well as assign team members that will be responsible for completing the tasks. We have a calendar displaying all deadlines, scheduled meetings & events. We also have a section for recording all our meeting minutes/notes. During our weekly meetings, we will work as a team to determine what new tasks to add, modify the deadlines or priority levels for existing tasks, and delegate tasks to each team member. All of these will be recorded in our workspace. Members will be regularly updating the status of their assigned tasks as they get completed. Furthermore, we have a docs page, which includes everything from our objectives and personas, to our user stories and acceptance criteria. This way, we can refer to them easily when creating and planning tasks.

For reference, we have included a link with view-only permissions to our Notion workspace: https://www.notion.so/3a08b14d3e9d4418abe4752c05ac1013?v=c3a00f34f8dd4a309f7078f730ce8972 


#### Q9: What are the rules regarding how your team works?

##### Working Culture

Our team’s preferred working style is to break down large tasks into smaller ones, and then divide these amongst team members. We find it most effective to clearly define instructions and requirements for each task, and then allow each person to work independently on completing their assigned tasks. Then, we regroup to combine our work. 

##### Team Communication

Despite our modular approach, we expect to communicate frequently with the group to ensure that everyone is in agreement. We have a group Discord chat. Anytime that anyone makes a major update or completes a task, that person will notify the rest of the group. If anyone is having a major issue implementing some feature, is confused about any component of the code, or is having trouble fixing a bug, they will immediately notify the group. That way, we can work together to resolve the problem in a timely manner. 

##### Partner Communication

Our partner has expressed that she wishes to observe our workflow and progress. Thus, we plan to communicate with her through our Discord group chat (which has already been set up). This way, we can also quickly answer any questions that she has. For more formal questions or concerns, or if we wanted to schedule a longer meeting with her (outside of the planned meetings), we will send an email to our partner with a clearly written description of the problem, question, or reason for the meeting. 

##### Accountability

We have assigned a team member who will be responsible for monitoring the task board in our workspace, and checking up on how everyone is progressing with their tasks. This person will be responsible for ensuring that we are staying on schedule. If other members are not completing their tasks, they will investigate the reason why and see if that person needs any help. If we are having a serious accountability issue, we will consult the rest of the group to discuss other methods of resolution, including reassigning tasks. This assigned person will give a quick reminder to everyone of upcoming meetings in our group chat, and confirm everyone’s attendance beforehand. 

##### Conflict Resolution

Conflict 1: If indecision occurs, we will (depending on the severity of the problem) either schedule a meeting or use our Discord chat to discuss as a group the cause of the indecision, whether it is a method of implementation, design concept, etc. As a group, we will objectively weigh the pros and cons of the conflicting ideas. If after considering everyone's arguments, we are still unable to come to a consensus, we will consult our partner, especially if it is regarding product design choices as it relates to addressing users' needs, or the TA for more technical problems.

Conflict 2: With respect to unresponsiveness, we have built a fair policy to avoid this from the onset. If any of our team members know in advance that they have a busy week ahead of them and will be unresponsive, they will notify the group in advance so everyone can plan and allocate tasks accordingly. Also, if an emergency arises, the team member will let the others know at the earliest convenience so the rest of the team can accommodate their situation.

Conflict 3: If anyone has any doubts about how to code their part of the project, they will communicate with the rest of the group for feedback and ask for help as soon as possible. As there is more than one person per role, it is highly likely that the other team members with the same role will be able to help. If needed, we will also ask our project TA for further technical assistance.


----
### Highlights

##### Key Decision 1: Expanding the Shopping List Feature
Initially, when our partner told us that they wanted a shopping list feature, we were skeptical about the value that a shopping list brings to our user. The existing implementation that our partner has was a very simple list where you can add, remove and check off items. This can be easily done in any other note taking app, so we asked ourselves, what will be the unique selling point of our shopping list and how can we harmoniously integrate with the rest of the features of our app. Some ideas that we considered included: 

 * Give a warning when the user adds a item to the shopping list that is still in their inventory
 * Keep a record of buyer’s history of wasted foods, and warn them if they add it to their list
 * Custom shopping list templates for users who already have a predetermined set of products that they purchase on a regular basis, and the app automatically eliminate items you still have

Ultimately, we chose to add the first two functionalities, since it adds useful solutions to users’ problems without overcomplicating the overall app.

##### Key Decision 2: Making the Scanner An Extra Feature
We considered: how much time does scanning foods really save as opposed to simply entering information? The initial idea was to scan barcodes and automatically input expiry date information. Not only does this not work for a majority of foods (ex. produce and any non-packaged items), but we were not certain if this was possible due to the large variety of different barcodes. Alternatively, we discussed scanning whole items and based on the item scanned, determine the expiry date. We determined that this would require some form of machine learning or computer vision, which our team is not familiar nor comfortable working with. Furthermore, it came back to the notion that users would have to take about the same amount of time to scan their food as to enter in its name, so scanning does not provide that much more benefit except that it is just an interesting feature to have. The underlying motivation or service that we wish to provide is to predict expiry dates. Therefore, we ultimately decided to create a library of common food items that users can search by entering in the name of the item, and each item will have preset expected expiry dates. This eliminates the need for users to enter in expiry information, which works especially well for items without expiry labels. However, since the scanner might prove to be an enticing feature that will motivate people to track their foods’ expiry dates, we will implement it if time allows.

##### Key Decision 3: Choosing Manual Implementation over External API
Initially, we were planning to use an GHG calculator API to calculate the amount of greenhouse gas emitted based on the amount of food wasted. When we were doing research on this, we discovered that there is a limited amount of API’s that we could use. The ones that would work are behind a paywall and do not necessarily have the function that we are looking for. So after careful consideration, we decided to manually create our own calculator in the app using formulas and data that we found online. This is the same situation that we had when looking for APIs that would give us exhaustive information about the shelf life of various food products. Hence, we plan to internally store a library of food items and their expected shelf life, which will likely come from data from various internet sources.  

