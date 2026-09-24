const fs = require('fs');
const HTMLtoJSX = require('htmltojsx');

const converter = new HTMLtoJSX({
  createClass: false
});

function convertFile(inFile, outFile, componentName) {
  let html = fs.readFileSync(inFile, 'utf8');
  // Extract body or relevant section
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    html = bodyMatch[1];
  }
  
  // Remove scripts
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  // Remove navbar (we already made it a component)
  html = html.replace(/<nav class="navbar"[\s\S]*?<\/nav>/i, '');
  
  // Convert
  const jsx = converter.convert(html);
  
  const component = `import React from 'react';
import { Link } from 'react-router-dom';

const ${componentName} = () => {
  return (
    <>
      ${jsx}
    </>
  );
};

export default ${componentName};
`;
  
  fs.writeFileSync(outFile, component);
  console.log(`Converted ${inFile} to ${outFile}`);
}

// Convert Home
convertFile('../frontend/index.html', 'src/pages/Home.jsx', 'Home');

// Convert Auth
convertFile('../frontend/pages/auth.html', 'src/pages/Auth.jsx', 'Auth');

// Convert Report Form
convertFile('../frontend/pages/report-form.html', 'src/pages/ReportForm.jsx', 'ReportForm');

// Convert Reports
convertFile('../frontend/pages/reports.html', 'src/pages/Reports.jsx', 'Reports');

// Convert Adoption
convertFile('../frontend/pages/adoption.html', 'src/pages/Adoption.jsx', 'Adoption');

// Convert Donate
convertFile('../frontend/pages/donate.html', 'src/pages/Donate.jsx', 'Donate');

// Convert NGOs
convertFile('../frontend/pages/ngos.html', 'src/pages/NGOs.jsx', 'NGOs');

// Convert Dashboard
convertFile('../frontend/pages/dashboard.html', 'src/pages/Dashboard.jsx', 'Dashboard');

// Convert NGO Dashboard
convertFile('../frontend/pages/ngo-dashboard.html', 'src/pages/NGODashboard.jsx', 'NGODashboard');
convertFile('../frontend/intro.html', 'src/pages/Intro.jsx', 'Intro');
