console.log('hello world');
const inquirer = require('inquirer');
const fs = require('fs');

const {Circle, Square, Triangle} = require('./shapes.js');
const SVG = require('./svg.js');

inquirer
  .prompt([
    {
      type: 'input',
      message: 'Enter text for your logo (3 character limit): ',
      name: 'text',
    },
    {
      type: 'input',
      message: 'Enter a color for your text (keyword or hexadecimal number): ',
      name: 'textColor',
    },
    {
      type: 'input',
      message: 'Select a shape for your logo: ',
      name: 'shape',
      choices: ['circle', 'triangle', 'square'],
    },
    {
        type: 'input',
        message: 'Enter a color for your logo shape (keyword or hexadecimal number): ',
        name: 'shapeColor',
    },
  ]
  ).then(data => {
    let shape;
    if (data.shape === "circle") { shape = new Circle() }
    else if (data.shape === "square") { shape = new Square()}
    else {shape = new Triangle()}

    shape.setColor(data.shapeColor)

    const svg = new SVG()
    svg.setText(data.text, data.textColor);
    svg.setShape(shape);
    fs.writeFile("logo.svg", svg.render(), (err) => {
      if (err) console.log(err)
      console.log('Generated logo.svg');
    })
  }).catch(err => { console.log(err) })