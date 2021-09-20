# GymTracker React Frontend Code

Description of the Views

### Login Page

The GymTracker UI starts off with a login page that allows users to login: either as "admin" or "user". It also contains a button to the page to Create a Gym Member account. If the username isn't in the system, it returns "This user does not exist in the database", if the username is in the database, it returns "Sorry, that was the incorrect password", and takes user to Admin Home Page or standard Home Page depending on the role of the user.
 
 ## Standard User Views
 
### Create a Gym Member Page

Allows website viewer to add their details to create an account in the database

### Home Page

The Home Page states the name of the user along with the text "Home Page" at the top, then has a button to see the Occupation Status of Machines view and View Latest Statistics for Lifts view, then displays the inputted Machine usage data of the user specifying the exercise, weight, name of the machine, sets left, and date of the record. Then there are two buttons to the Add Lifting Data View and another to return the login screen

### Occupation Status of Machines Page

This view is meant congregate the lifting records of the users in the system by displaying whether a particular machine is occupied or not based on the most recent lifting record of a user using that machine, which would be available if the sets left is 0x0 sets by reps and occupied otherwise, as well as the date-time of that record. Also has a button to return to the Home Page

### View Latest Statistics Page

This view shows the latest sets by reps and weight for each exercise as well as the date-time of the latest record. Also has a button to return to the home page.

### Add Lifting Data Page

This view allows user to update the lifting record list with the most recent one by inputting exercise, sets by reps left, weight, machine name, and measured date time of the record. Also has button to return to the home page.

## Admin User Views

### Admin Home Page

The Admin Home Page displays the Occupation Status of Machine data directly on the home page as well the list of Gym Member information in the system. Contains buttons to the Add Gym Member view and one to return to the Login Screen.

### Add Gym Member Page

Similar to the Create a Gym Member Page but admins are allowed to define the user role, while accounts created through the Create a Gym Member Page are given 'user' role privilege by default.

Link to GUI Screenshots: [GymTracker Frontend Screenshots](https://github.com/sashankk824/GymTrackerFrontend/blob/master2/GymTracker%20FrontEnd%20Screenshots.pdf) 
