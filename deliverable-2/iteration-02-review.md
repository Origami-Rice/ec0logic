# WASTELESS

## Iteration 02 - Review & Retrospect

 * When: Wednesday Nov. 18th 2020 at 5:00 pm
 * Where: Online call via Discord
 * Description: We used a padlet board to collaborate and map out our ideas. That can be referred to [here](https://padlet.com/jzhangyuyu/1icdxcwkw3qy0ezx). To lead our discussion, each member was asked to provide feedback using the prompt “Describe a sunny side up egg, runny egg, hard boiled egg and scrambled egg of our entire process, methods and decisions.” (Refer to link for exact definitions), as well as to post any memes that best described their general feelings. 

## Process - Reflection


#### Q1. Decisions that turned out well

We unanimously agreed that the most successful decision that we made was to divide the team into two groups that would focus entirely on developing either the frontend or backend. Since we were working with an existing product, we were prescribed a tech stack: the MERN (MongoDB, Express, React Native, Node) tech stack. Unfortunately, our team was not very familiar with these technologies. Organizing the team into two groups from the very beginning proved to be more efficient as it reduced the amount of self-learning required from each individual. The backend group focused on Node, Express and MongoDB, while the frontend could familiarize themselves with UI design, React Native and making API requests. 

Our original plan outlines many features. However, another decision that proved to be effective was deciding to work on one feature at a time. As a team, we decided on the most important features that we wanted to implement and then broke these down into smaller, more feasible tasks. This allowed us to make regular, continuous progress during the development and implementation stage. In particular, the frontend team divided the inventory feature into tasks that would ideally take one or two days each, such as completing components or certain screens. We would have short meetings every few days to provide members with updates on what tasks were or were not completed. 

In order to keep everyone up to date and on track, we organized weekly team meetings as well as bi-weekly meetings with our partner. The meetings were at a fixed time each week, which worked well as every member attended every meeting. At our weekly syncs, we discussed what we completed in the last week and what our plan was for the following week so everyone was being held accountable for completing their assigned work. This also allowed us to coordinate with the other “end” of the team and ensure good communication between our two separate teams. Notion was used as an organizational tool to keep meeting minutes as well as make notes to plan general tasks or goals. [Here is a link to our meeting minutes page as an example.](https://www.notion.so/c7ddcd489bf5404c8919a5014cbcda9d?v=ad382d292f004faa9aad03e52bdf82ed)

#### Q2. Decisions that did not turn out as well as we hoped

Although all members attended every team meeting, we experienced other scheduling issues when attempting to balance the workload from our other classes and this project. As everyone was similarly inexperienced with the tech stack, starting to carry out our goals and plans was quite challenging, overwhelming and frustrating. Unfortunately, we did not plan out the learning process so everyone was attempting to learn everything individually. Had we divided the topics amongst ourselves and later taught what we had learned to our team, we could have eliminated a lot of the trial and error that each of us needed to individually go through. There was indeed a lack of collaboration at the beginning.

As we were all completely unfamiliar with the process of working with a partner or organization, we underestimated the amount of time that we would need in order to implement the desired features. We initially agreed to take on many different features that our partner desired, and so we dedicated an unnecessarily large amount of time researching how feasible it would be to implement them. Also, it was difficult to judge how much we were capable of completing in the provided time and may have set our partner’s expectations too high. For example, the camera scanner we were asked to implement proved to be more difficult to work with than we had previously thought. This caused our team some stress and loss of direction that was not conducive to our productivity.

#### Q3. Planned changes

First and most importantly, in order to avoid the scheduling issues that we experienced at the beginning of our teamwork, we have decided to create a detailed schedule of exactly what days each team member was available to dedicate to working on this project. That can be viewed on our [calendar page in Notion](https://www.notion.so/82c49c5d90c24217b7c95c519087b78b?v=abbb0231f37146a68a304bd0439fc0ea). This will be useful as each member will know exactly who they can reach out to for help should we encounter a problem we cannot resolve ourselves. The hope in doing so is that we can know what to expect earlier so that if there is a period of time where most team members will be busy, we can plan to complete certain tasks ahead of time.

Another issue we ran into was not defining explicitly enough our short term goals and a list of tasks that needed to be completed. When members completed their immediately assigned tasks, they did not have a sense of what else needed to be done. There was a lack of coordination and tasks were too vaguely described. To overcome this, we will be making a more detailed TO-DO list. Also, now that we have a sense of everyone’s workflow, we can make more concrete plans so that everyone in the team knows what direction we are heading in with various design and implementation details. Finally, we will more explicitly assign tasks to ensure that at no point is anyone unsure of what they should be currently working on.

## Product - Review

#### Q4. How was your product demo?

In preparation for our demo, we deployed our server and react native application to Heroku and Expo respectively. This made it easy to set up our demo and it also provided our partner with a way to test out the application herself if she wanted to via the following link: https://expo.io/@jen-z/projects/wasteless

We managed to demo the two key features that we completed for this deliverable: the food inventory and the shopping list. For the food inventory, we demonstrated adding items, filtering items that were expiring in the next week, and marking items as used or thrown out. For the shopping list, we demonstrated the actions of adding items, checking off items in the shopping list, and migrating checked off items to the inventory. We also showed the warning system that we have when a user tries to add an item to their shopping list that is still in their inventory.

Our partner accepted all the features and was generally very pleased with how they came out. She requested some minor changes, and our discussion was mostly centered around adding some more features. 

For adding items to the inventory, our partner requested that we change the default expiry dates for fruits and vegetables to 10 days since at the moment, our “dummy” data uses 4 days as the default. She also requested to change the “Expiring Soon” tab so that instead of displaying inventory foods that are expiring within the next week, it should display inventory foods that will expire within the next 3 days.

In addition, we discussed that our goal by that end of the project is to integrate our features with the existing code, add push notifications notifying users of expiring foods, and add the greenhouse gas tracker page. To our excitement, we learned that our partner hopes to deploy the finished product in the app store(s) by January in preparation for a green initiative that she is launching with other organizations. 
