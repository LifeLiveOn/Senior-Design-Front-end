# OverWatch (front-end)

The goal of OverWatch is to allow insurance companies to diagnose roof damage without human interaction. This repository containts the website in which insurance agents can add and edit customers, houses, and view the detailed roof damage report generated using machine learning.

# Website Layout

### Login Page

This page only contains the login button, which the agent will use to sign in to their google account.

### Customer Page

Once the agent is logged in, they will be presented with the customer page. This page contains the customer table, search bar, and the button to add customers.

- **Customer Table:** Lists every customers name, email, number, and the date they were added. To keep things simpole, the table is divided into pages. You can use the arrows under the table to navigate through them. You can also click on one of the column headers to sort the table by that column. Clicking on a customer reveals their container. Here, you can view their house cards, add new ones, and edit customer details using the "Edit customer details" button at the top right of the container. Each house card diaplays the information nessesary to identify it. When you click on a house card, it will take you to the **Report Page** to view the detailed roof damage report.

- **Search Bar:** This is were you can search for customers by name, email, or phone number. Use the dropdown to select the search type. Once you type in the search bar, click the search button to filter the customer table.

- **Add Customer Button:** Clicking this button will bring up the "Add Customer" popup. Here, you can enter in the new customers information and add it to your customer table.

### Report Page

The report page is where tha agent can view the roof damage report for the selected house. This page contains the customer and house information, damage summary, an upload section, and model settings.

- **Customer/House Information:** Displays all of the relevant customer and house information. To edit the house information, click on the "Edit house details" button.

- **Damage Summary:** This section is split up into three boxes: severity, damage type, and estimate. The severity box tells you how severe the damage is on a scale from 0 to 5 (5 being the worst), along with a short description. The damage type box identifies and describes each type of damage. The estimate box shows the cost of repair based on the roof type and the total amount of damage.

- **Upload Section:** Here, you can view all upload images aswell as add them. Once you upload an image, it will run it through the model and update the report.

- **Model Settings:** Under the customer/house information, you'll find a button labled "Model settings & report generation". When clicked, it will bring up setting that can be tweaked to adjust the machine learning model. After you make some adjustments, you can click the "Generate" button to run the image through the model again with the new settings.


# Instructions

Here are step by step instrucations on how to run the website locally. For the front-end to work properly, the back-end also needs to be running. If you don't have that set up already, visit [github.com/LifeLiveOn/Senior-Design](https://github.com/LifeLiveOn/Senior-Design).

1. Change the back-end link to it's local address
    - Navigate to `website-react/src/constants.js`
    - Set **BACKEND-URL** equal to **"http://localhost:{PORT}"**
    - Replace **{PORT}** with the port number you chose for the backend (Default: 8000)
2. Set the front-end port
    - Navigate to `website-react/.env`
    - Set **PORT** equalt to your desired port (Default: 8080)
3. Make sure you have Node.js installed ([nodejs.org](https://nodejs.org/en))
4. In the top directory of the project `SENIOR-DESIGN-FRONT-END`, run the following commands in the terminal:
    ```bash
    cd website-react
    npm install
    npm start dev
    ```
5. Once it starts, it should automatically open in your browser
    - Both the local and network addresses should show up in the terminal
    - Ex:
        ```
        Local:            http://localhost:8080
        On Your Network:  http://10.111.111.111:8080
        ```
    - To access the website from another device, use the **On Your Network** address
6. Stopping the website
    - In the terminal, press **ctrl + c**
    - You should see `Terminate batch job (Y/N)?`
    - type **y**, the press **enter** to terminate