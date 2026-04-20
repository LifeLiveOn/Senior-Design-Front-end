# OverWatch (front-end)

This is where the agent can add and edit customers and their houses. A roof damage report can be view under each house once the roof images have been uploaded.

# Run the front-end locally
1. Change the back-end link to it's local address
    - Navigate to `website-react/src/constants.js`
    - Set **BACKEND-URL** equal to **"http://localhost:{PORT}"**
    - Change **{PORT}** to the port you chose for the backend (Default: 8000)
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