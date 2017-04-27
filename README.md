# DIARE

Heroku URL: https://diare.herokuapp.com/

BugTrackingURL: https://github.com/SirAlternate/DIARE/issues


### Project Overview:
DIARE, *or Digital Interpretation of Analog Rapid-logging Entries*, is a digital implementation of the Bullet Journal productivity framework designed by Ryder Carroll. For a more detailed description of the project please refer to the Project Summary below.


### Team Members:
Erik Saulnier,
Natasha Ragubir,
Erica Braunschweig,
Solomon Mori,
Graigor Pierre-Noel

## How To Start Working On The Project: 
This is a private repository, so you must first ask the project team to grant you access.

Make sure you have angular-cli installed. Angular CLI is discussed in the readme of the angular2-client directory

`git clone https://github.com/SirAlternate/DIARE.git`

`npm install` from the top level directory to install the necessary packages for the Node server; `npm start` from this directory to run this server on port 4000

`cd angular2-client` and then `npm install` to install the necessary packages for the Angular 2 client side of the application; assuming that you have Angular CLI installed, `ng serve --dev` to run a development server on port 4200 and `ng build --prod --aot` to generate a production build of the project

All of the important code for the front end is in angular2-client/src/app. The directories that start with a _ in this folder provide support functionality, while the directories that don’t start with a _ in this folder represent pages of the site. The directories that represent site pages contain more directories which hold individual Angular 2 components.

All of the code for the backend is in expressjs-server . The server.js file holds all of the base server functionality. The controllers folder define server routes and link those routes to services. The services folder holds the aforementioned services, which provide server functionality and perform actions on MongoDB data.

## Project Summary: 
For this project our team was inspired by the productivity framework Bullet Journal. Bullet Journal is an analog system (a physical notebook) designed to be a to-do list, diary, notebook, and sketchbook. However, this system does not efficiently utilize time, materials, or space. It costs money to purchase materials, requires time to set up the journal, is limited to the size of the journal, and can be a hassle to carry around. We believe a digital interpretation of this analog system would create a powerful online tool.

Our solution was to create a well-designed, production-ready web application based on the Bullet Journal’s analog system. Our goal was to allow users to have enhanced features to boost their productivity. These include: search functionality, ability to prioritize tasks and notes, easily create and edit Journals, Pages, and Bullets, as well as have up to data content. Along with these features we outlined four non-functional requirements: usability, scalability, performance, and a mobile-friendly design. In order to execute our solution well, we had to develop a high performance application that efficiently accommodates different workflows, supports a large number of simultaneous users, and is highly usable on mobile devices. Overall, we wanted to preserve the main features of Bullet Journal, while modernizing the system. Our modified features and design choices reflect these decisions.

We used the Agile methodology to complete this project. Our sprints were one week long. We had meetings weekly on Wednesdays to prioritize and assign task, and testing was conducted as new features were added. Additionally, we effectively used GitHub issues for tracking and collaboration. Utilizing both Agile and Github allowed us to work well together as a team, and as a result our project was developed smoothly. 

### Future Improvements:
While we are very happy with the way the application turned out, we also realize that the site is not perfect. There are several improvements that we would like to make to DIARE in the future:

- Enhanced Search Capabilities: Right now, a user can search through all of their bullets (across all journals) to find bullets that contain a specified query string. In the future, we’d like to add more options to the search functionality. For example, a user would be able to search on bullets of a certain type, or only from specific journals.

- Smart Journal Pages: Right now, the only pages that exist in a journal are the ones that a user manually creates. In the future, we’d like to establish some default, auto-generated pages for the user. For example, there would be an Events page that displays all event bullets for a given journal, and a Favorites page which would display all starred bullets from a journal.

- Customizable Hotkey Shortcuts:  Our site is meant to be as easy and efficient as possible for people to use, and some users would have a more efficient site experience if they were able to customize hotkeys. We believe that hotkeys would play to the needs of site superusers.

This list of improvements is not all encompassing, as there is always room for new ideas and improvements.

### Overall Thoughts On The Project:
As a team, overall we believe that we were successful in our implementation of DIARE. This application not only simplifies and speeds up the traditional note taking & journaling process, but also brings analog rapid logging into the 21st century. We were able to execute our solution extremely well and create an application with the main functionalities and requirements we originally proposed. 

In addition, we were very happy with the project methodology we chose to work with as a team. By using Agile and Github we were able to work together efficiently, and fulfill our project requirements in a timely manner. 

Lastly, we know that after implementing some of the above future improvements, DIARE can become an even more efficient and powerful tool for users. We feel as though this project can be expanded to become a leading contender for users seeking an online productivity tool.
