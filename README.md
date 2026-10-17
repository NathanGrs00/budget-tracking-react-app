<p align="center">
  <img src="https://github.com/user-attachments/assets/be627ab1-7152-4f92-90cd-286585fcf6a5" width="400" height="400"/>
</p>

# Personal Budget Tool

This application is a tool designed to track your spending, income and it visually shows you the remaining budget you have left each month.

**Live site:** https://nathangrs00.github.io/budget-tracking-react-app/

## Getting Started

These instructions will get you to run the application in a local environment.

### Prerequisites

The things you need before installing the software.

* Git Bash, your IDE's terminal or the command prompt/terminal from your OS.

### Installation

A step by step guide that will tell you how to get the development environment up and running.

Clone the repository using:
```
git clone https://github.com/NathanGrs00/budget-tracking-react-app.git
```
Navigate to the project in your terminal using:
```
cd budget-tracking-react-app
```
Run the following commands in the terminal:
```
npm install
npm run dev
```
After running these commands, Vite will give you a localhost link to open in a browser.

Other useful commands:
```
npm test        # run the tests
npm run lint    # check code style
npm run build   # build the site into dist/
```

### Deployment

Every push to `master` is built and published to GitHub Pages by `.github/workflows/deploy.yml`.
One-time setup: in the repository go to **Settings → Pages** and set **Source** to **GitHub Actions**.

## Features

- Add income and expenses per month, and switch between months.
- Mark income and expenses as **monthly** (recurring). They are copied into the next month automatically.
- A big "left to spend" number, a pie chart and a breakdown of every expense.
- History of all saved months with a bar chart and your monthly averages.
- Choose your currency.
- Everything is saved in your browser (localStorage), so it survives a page reload. Nothing is sent to a server.
- Export and import a backup file to move your data to another device.

## Usage
Open the localhost page.

Click on 'Start here' on the landing page. Use the arrows above each list to switch month.

![Image](https://github.com/user-attachments/assets/0c2d3448-4d44-4236-8c09-208916616ed8)

Fill in all your income for a month.

![Image](https://github.com/user-attachments/assets/0f174a2b-94a0-48ab-8ca6-49d8a7def5b3)

Click '+ Add income' for each row you need. Switch on 'Monthly' for income that comes back every month.

After filling in all the rows, click on 'Expenses' in the navigation bar on the top of the screen.

Fill in all the expenses you have each month.

![Image](https://github.com/user-attachments/assets/cef86b32-7b06-448e-b742-aaaaffd040ed)

Now you can view the pie-chart by navigating to 'Budget' on the navigation bar.

Under 'History' you can compare months and see your averages. Under 'Settings' you can change the currency, export or import a backup, or delete all data.

(The screenshots above are from an earlier version.)

![Image](https://github.com/user-attachments/assets/8f511e70-5829-4c6b-899e-03243f5717a1)

## Technologies Used

* React
* Vite
* Typescript
* Bootstrap
* MUI X Charts
* Vitest + Testing Library

## Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the repository.

2. Create a new branch:

```

  git checkout -b feature-name

```

3. Make your changes and commit:

```

  git commit -m "Add new feature"

```
4. Push to your fork:
```

  git push origin feature-name

```
5. Open a pull request.

## Roadmap

- [x] Function to add expenses and income.
- [x] Showing piechart with remaining budget for a month.
- [x] Save user input when reloading the page (stored in the browser).
- [x] Deploying the application (GitHub Pages).
- [x] Differentiate recurring expenses from non-recurring expenses.
- [x] Different elements to show budget information:
    - [x] Big title to make the remaining budget more clear.
    - [x] Saving information for a set month, and viewing average each month.

See the [open issues](https://github.com/NathanGrs00/budget-tracking-react-app/issues) for a full list of proposed features (and known issues).

## Contact

Nathan - [@LinkedIn](https://www.linkedin.com/in/nathangeers/) - nathangeers2@gmail.com

Project Link: [https://github.com/NathanGrs00/budget-tracking-react-app](https://github.com/NathanGrs00/budget-tracking-react-app)

## License

Distributed under the MIT license. See ```LICENSE.md``` for more information.





