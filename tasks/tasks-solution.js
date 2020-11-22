/*
Task №1
By clicking on "Submit" button an Object with "key-value" pairs should be created 
and displayed in console log. Object should contain all non-empty field names and 
it's values and should be suitable for all XMLHTTPRequest request types 
("GET", "POST", "PUT", "DELETE"). new FormData() object is not acceptable.
Example:
{
   "FName": "Sergey",
   "LName": "Ivanov",
   "Email": "s-ivanow@gmail.com",
   "Phone": "+375296666666",
   "Sex": "Male",
   "Skills": ["HTML", "CSS", "JavaScript"],
  "Department": ["FrontEnd", "SalesForce"]
}

Task №2
Create query string based on Object output from Task №1 and apply it to an url
Example:
.../index.html?FName=Sergey&LName=Ivanov&Email=s-ivanow@gmail.com&Phone=+375296666666&Sex=Male&Skills=HTML|CSS|JavaScript&Department=FrontEnd|SalesForce

Task №3 *
Check and parse current url on page load event. 
Fill the form with data obtained from parsed query string.
Example:
Page url: .../index.html?FName=Sergey&LName=Ivanov&Email=s-ivanow@gmail.com Current field matches (FName, LName, Email) should be automatically filled with respective values.
*/

//  -------------------------------------- Task №1 ----------------------------------------
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  const obj = [...form.elements]
    .filter(
      (el) => !(el.type === 'checkbox' || el.type === 'radio') || el.checked
    )
    .filter((el) => el.value)
    .reduce((acc, el) => ({ ...acc, [el.name]: el.value }), {});

  console.clear();
  console.log('Solution for Task №1: ', obj);
  e.preventDefault();

//  ---------------- Check object values for all XML/HTTP Request types -------------------

//   fetch(form.action, {
//     method: 'POST',
//     body: JSON.stringify(obj),
//   });

//   fetch(form.action, {
//     method: 'PUT',
//     body: JSON.stringify(obj),
//   });

//   fetch(form.action, {
//     method: 'DELETE',
//     body: JSON.stringify(obj),
//   });

//  -------------------------------------- Task №2 ----------------------------------------
  const url = new URL(form.action + '?' + new URLSearchParams(obj).toString());
  fetch(url);
  console.log('Solution for Task №2: ', url.search);

//  -------------------------------------- Task №3 ----------------------------------------
    const objFromQueryString = url.search
    .replace('?', '')
    .replace('%40', '@')
    .replace('%2B', '+')
    .split('&')
    .map(v => v.split('='))
    .reduce((acc, v) => ({...acc, [v[0]] : v[1]}), {});
    console.log('Solution for Task №3: ',objFromQueryString);
});
