# Live Type

## Run

1. `git clone https://github.com/AndrijaSkontra/live-type` 
2. `cd live-type`
3. `npm ci`
4. `npm run test`
5. `npm run dev`

## **Project Structure** ~deprecated~

```
frontend-project/
│
├── index.html                # Main HTML file
│
├── assets/                   
│   ├── images/               # Image files
│   └── fonts/                # Font files
│
├── css/                      
│   └── style.css             # Main stylesheet
│
├── js/                       
│   ├── index.js              # Run all javascript
│   ├── utils/                # Utility functions
│   │   └── helpers.js        
│   │
│   └── api/                  # Data fetching helpers
│       └── fetchData.js      
│
├── components/               # HTML components
│   ├── header.html           
│   ├── footer.html          
│   └── sidebar.html        
│
├── README.md                 
│
├── package.json              # To install deps use npm ci
│
├── package-lock.json         
│
├── babel.config.js           # Babel config file
│
└── jest.config.js            # Jest config file(tests)
```
## TODOS

- [x] Better styling
- [ ] Code refactor
- [ ] Connect to backend (auth and send wpm)
- [ ] UI for users
- [ ] writing on the text not in the input (see monkey type)
