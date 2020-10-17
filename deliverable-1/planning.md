# WASTELESS
> _Note:_ This document is meant to evolve throughout the planning phase of your project.   That is, it makes sense for you commit regularly to this file while working on the project (especially edits/additions/deletions to the _Highlights_ section). Most importantly, it is a reflection of all the planning you work you've done in the first iteration. 
 > **This document will serve as a master plan between your team, your partner and your TA.**

## Product Details
 
#### Q1: What are you planning to build?

##### Problem & Motivation
Household food waste is a huge problem that contributes significantly to climate change. According to the National Zero Waste Council’s research on household food waste in Canada, almost 2.2 million tonnes of food is wasted each year. Food waste not only wastes the resources required to produce and distribute that food, but decomposing food in landfills also produces more greenhouse gases, like methane. A major cause for household food waste is simply lack of planning. This can lead to losing track of what food you still have in stock, which may result in overbuying. Similarly, losing track of when foods will expire results in an accumulation of spoiled foods. 

We are expanding the features of our project partner's existing mobile app with the objective of encouraging people to be conscious of their food waste, making it convenient for people to reduce the amount of food that they waste, and allowing them to quantify the environmental impact of their actions. 


##### Product Description
We are expanding on our project partner's exisiting mobile app by adding new features, specifically an food inventory tracker, a shopping list tool, and a greenhouse gas emissions metric tracker. 
 
 * Be concrete. For example:
    * What are you planning to build? Is it a website, mobile app,
   browser extension, command-line app, etc.?      
    * When describing the problem/need, give concrete examples of common use cases.
    * Assume your the reader knows nothing about the problem domain and provide the necessary context. 
 * Focus on *what* your product does, and avoid discussing *how* you're going to implement it.  
   For example: This is not the time or the place to talk about which programming language and/or framework you are planning to use.
 * **Feel free (and very much encouraged) to include useful diagrams, mock-ups and/or links**.


#### Q2: Who are your target users?
   
##### General Description of Target Users
Our target users are people who want to make steps to becoming more eco-friendly starting with their own food consumption, but find it difficult to organize their food and grocery purchases within their busy everyday lives. 

##### Personas 

Miranda is a mother of two. Her goal is to live a sustainable life and have a healthy, happy family. She works during the week, so she usually does regular grocery trips once a week. She cooks for the family. Since she usually comes with meal ideas on the spot, she is not really tracking what foods she has on hand, except from what she can see by looking in the fridge. She is often finding spoiled milk that she does not even remember buying. 

Laura is a university student and avid environmentalist. She is working hard not only towards her degree, but also towards a greener lifestyle. She lives on her own and cooks for herself. Due to her heavy course load, she has trouble keeping track of when her food expires and finds, much to her chagrin, that she is constantly throwing out spoiled food. She is making an effort to change that, but she wants to see the progress that she is making and understand the way she is helping the environment. 

George is a proud father and foodie. He is often going on impromptu shopping trips on his way home from work. As he is making his way through the aisles, he is often asking himself, “Wait, do we have any more of this at home?” He never really creates a list and usually goes off his instincts, which is often to buy first. Unfortunately, he usually comes home realizing that he has double of half his inventory. He wants to reduce his carbon footprint and set a good example for his children. His main concern is controlling his purchases, but at the same time, he finds it too tedious to “plan” his grocery trips. 


#### Q3: Why would your users choose your product? What are they using today to solve their problem/need?

> Short (1 - 2 min' read max)
 * We want you to "connect the dots" for us - Why does your product (as described in your answer to Q1) fits the needs of your users (as described in your answer to Q2)?
 * Explain the benefits of your product explicitly & clearly. For example:
    * Save users time (how much?)
    * Allow users to discover new information (which information? And, why couldn't they discover it before?)
    * Provide users with more accurate and/or informative data (what kind of data? Why is it useful to them?)
    * Does this application exist in another form? If so, how does your differ and provide value to the users?
    * How does this align with your partner's organization's values/mission/mandate?
    
Our product will allow users to keep a record of their food inventory. This will allows them to see an overview of all the items they have on hand and their expected expiry dates that they have on hand wherever and whenever they want. There are other apps that also offer this feature of keeping track of list of food, but our app will allow users to filter the foods that are expiring soon, so that they can easily determine which foods they should eat/use first. Further, it will send notifications to users about foods that will expire soon, then users never have to worry about forgetting this and causing unnecessary food spoilage. In addition, when users add new items, the app will suggest an expected expiry date (at least for common food items) and best storage method. This will help with misconceptions or a lack of knowledge about how long foods last, especially foods without expiry dates (ex. produce, meats). 

Currently, the most common tools for making a grocery shopping list is using a notes application or traditional pen and paper. This requires the user to manually cross reference their refrigerator and pantry. This also depends on the user to make the right decisions about what and how much to buy. Our shopping list feature is integrated with the inventory tracker, so that when they add items to the shopping list that they already have at home, the app gives a warning. It also stores a short history of the types and amounts of foods that the user has bought in the past, but ended up expiring. That way, the app will give a warning if they try to add that to their shopping list again. This addresses the partner's idea of predicting and preventing possible future food waste before it even gets to the consumer's home. 

Another unique selling point of our product is the greenhouse gas (GHG) emissions calculator. This allows user to measure their food waste and see the impacts of their actions. This feature doesn't exist anywhere else. 



#### Q4: How will you build it?

> Short (1-2 min' read max)
 * What is the technology stack? Specify any and all languages, frameworks, libraries, PaaS products or tools. 
 * How will you deploy the application?
 * Describe the architecture - what are the high level components or patterns you will use? Diagrams are useful here. 
 * Will you be using third party applications or APIs? If so, what are they?
 * What is your testing strategy?

#### Q5: What are the user stories that make up the MVP?

 * At least 5 user stories concerning the main features of the application - note that this can broken down further
 * You must follow proper user story format (as taught in lecture) ```As a <user of the app>, I want to <do something in the app> in order to <accomplish some goal>```
 * If you have a partner, these must be reviewed and accepted by them
 * The user stories should be written in Github and each one must have clear acceptance criteria.
 
##### User Stories:
 * As an environmentalist, I want an easy way to keep track of expiry dates in order to prevent food waste and reduce my carbon footprint.
 * As an avid environmentalist, I want to be able to see my weekly progress with respect to how much food waste I’ve been able to reduce in order to evaluate the impact of my actions on the environment. 
 * As the person who plans meals in my family, I want to track all types of food items, including produce, packaged foods, leftovers etc in order to have a comprehensive view of what I have and make plans on-the-go.
 * As the main shopper in my house, I want to be able to easily check what items I still have at home and the quantity so that I don’t make duplicate purchases on my grocery trip
 * As the person responsible for cooking meals, I want a way to be notified of the expiry dates so that I can use the older ingredients before they go to waste.
 * As a consumer, I want an easy way to keep track of what types of food and how much of that food have been wasted in the past months, so I would know which foods to buy less of next time. 


----

## Process Details

#### Q6: What are the roles & responsibilities on the team?

Describe the different roles on the team and the responsibilities associated with each role. 
 * Roles should reflect the structure of your team and be appropriate for your project. Not necessarily one role to one team member.

List each team member and:
 * A description of their role(s) and responsibilities including the components they'll work on and non-software related work
 * 3 technical strengths and weaknesses each (e.g. languages, frameworks, libraries, development methodologies, etc.)

#### Q7: What operational events will you have as a team?

Describe meetings (and other events) you are planning to have. 
We plan to have weekly online meetings. We have these scheduled for every Saturday at 7 PM EST. The purpose of these meetings is to:
 * Act as a weekly sync, where we summarize what each team member has been working on in the past week, and then discuss, plan and assign tasks for the upcoming week
 * Host a group coding session, which will give us an opportunity to detect and fix integration problems
 * Review pull requests

We also plan to set meetings as required to discuss and resolve any major issues that arise. 

To keep our partner up to date, we plan to send her weekly reports summarizing important tasks that we completed over that week, our plan for the upcoming week and any pending non-urgent questions. In addition, since we have a discord group chat with our partner, throughout the week, we will notify our partner of any major progress or milestones that we achieve. 
 
 * Other events could be coding sessions, code reviews, quick weekly sync meeting online, etc.
 * You must have at least 2 meetings with your project partner (if you have one) before D1 is due. Describe them here:
   * What did you discuss during the meetings?
   * What were the outcomes of each meeting?
   * You must provide meeting minutes.
   * You must have a regular meeting schedule established by the second meeting.  
  
#### Q8: What artifacts will you use to self-organize?

List/describe the artifacts you will produce in order to organize your team.      

We have set up a team workspace on Notion to manage our tasks. It includes various pages including a To-Do list, a calendar displaying deadlines and all scheduled meetings & events, a task board where we can assign different levels of priority, completion status and team members responsible for completing the task. We also have a section for recording all our meeting minutes. During our weekly meetings, we will work as a team to determine the weekly tasks that will move us closer to our larger goals and product requirements, and assign tasks to each team member. 

 * Artifacts can be To-Do lists, Task boards, schedule(s), meeting minutes, etc.
 * We want to understand:
   * How do you keep track of what needs to get done?
   * How do you prioritize tasks?
   * How do tasks get assigned to team members?
   * How do you determine the status of work from inception to completion?

#### Q9: What are the rules regarding how your team works?

Describe your team's working culture.

**Communications:**
 * What is the expected frequency? What methods/channels are appropriate? 
 * If you have a partner project, what is your process (in detail) for communicating with your partner?
 
 
**Meetings:**
 * How are people held accountable for attending meetings, completing action items? Is there a moderator or process?
 We have given the product manager the role of moderating meetings and leading discussions. 
 
**Conflict Resolution:**
 * List at least three team scenarios/conflicts you discussed in lecture and how you decided you will resolve them. Indecisions? Non-responsive team members? Any other scenarios you can think of?
 
 * Conflict 1: If indecision occurs, we will (depending on the severity of the problem) either schedule a meeting or using chat discuss as group the cause of the indecision, whether it is a method of implementation, design concept, etc. As a group, we will weigh the pros and cons. If after considering everyone's arguments, we still aren't able to come to a consensus, we will consult our partner (especially if it is regarding product design choices as it relates to addressing users' needs) or the TA for more technical problems. 
 
 * Conflict 2: 




----
### Highlights

Specify 3 - 5 key decisions and/or insights that came up during your meetings
and/or collaborative process.

 * Short (5 min' read max)
 * Decisions can be related to the product and/or the team process.
    * Mention which alternatives you were considering.
    * Present the arguments for each alternative.
    * Explain why the option you decided on makes the most sense for your team/product/users.
 * Essentially, we want to understand how (and why) you ended up with your current product and process plan.
 * This section is useful for important information regarding your decision making process that may not necessarily fit in other sections. 

##### Key Decision 1: Expanding the Shopping List Feature
At least, we were skeptical about the value that a shopping list brings to our user. The exisitng implementation that our partner has was a very simple list where you can add, remove and check off items. 
