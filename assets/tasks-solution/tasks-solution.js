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

function getSelectValues(el) {
  const selectedOptions = [...el.options]
    .filter((el) => el.selected)
    .map((el) => el.value);
  return selectedOptions;
}

function createObj () {
  const obj = [...form.elements]
  .filter(
    (el) => !(el.type === 'checkbox' || el.type === 'radio') || el.checked
  )
  .filter((el) => el.value)
  .reduce((acc, el) => {
    let value = el.value;
    if (el.tagName === 'SELECT') {
      value = getSelectValues(el);
    }
    if (acc[el.name] !== undefined) {
      if (Array.isArray(acc[el.name])) {
        acc[el.name].push(value);
      } else {
        acc[el.name] = [acc[el.name], value];
      }
    } else {
      acc[el.name] = value;
    }
    return acc;
  }, {});
  console.log('Solution for Task №1: ', obj);
  return obj;
}

form.addEventListener('submit', (e) => {
  const obj = createObj ();

//  ---------------- Check object values for all XML/HTTP Request types -------------------
  // fetch(form.action + '?' + new URLSearchParams(obj).toString())

  // fetch(form.action, {
  //   method: 'POST',
  //   body: JSON.stringify(obj),
  // });

  // fetch(form.action, {
  //   method: 'PUT',
  //   body: JSON.stringify(obj),
  // });

  // fetch(form.action, {
  //   method: 'DELETE',
  //   body: JSON.stringify(obj),
  // });

//  -------------------------------------- Task №2 ----------------------------------------
  e.preventDefault();
  let url = form.action + '?' + new URLSearchParams(obj).toString();
  window.location.replace(url);
});

//  -------------------------------------- Task №3 ----------------------------------------
window.onload = function () {
  if (window.location.search.includes('?')) {
    const objFromQueryString = window.location.search
      .replace('?', '')
      .replace('%40', '@')
      .replace('%2B', '+')
      .split('&')
      .map((v) => v.split('='))
      .reduce((acc, param) => {
        let value = param[1].split('%2C');
        value = value.length > 1 ? value : value[0];
        if (acc[param[0]] !== undefined) {
          if (Array.isArray(acc[param[0]])) {
            acc[param[0]].push(value);
          } else {
            acc[param[0]] = [acc[param[0]], value];
          }
        } else {
          acc[param[0]] = value;
        }
        return acc;
      }, {});

    form.elements[(name = 'FName')].value = objFromQueryString.FName || '';
    form.elements[(name = 'LName')].value = objFromQueryString.LName || '';
    form.elements[(name = 'Email')].value = objFromQueryString.Email || '';
    form.elements[(name = 'Phone')].value = objFromQueryString.Phone || '';

    [...form.elements[(name = 'Sex')]].forEach((el) => {
      if (el.value == objFromQueryString.Sex) {
        el.checked = true;
      }
    });

    [...form.elements[(name = 'Skills')]].forEach((el) => {
      if (Array.isArray(objFromQueryString.Skills)) {
        objFromQueryString.Skills.forEach((elem) => {
          if (el.value == elem) {
            el.checked = true;
          }
        });
      } else if (el.value == objFromQueryString.Skills) {
        el.checked = true;
      }
    });

    [...form.elements[(name = 'Department')]].forEach((el) => {
      if (Array.isArray(objFromQueryString.Department)) {
        objFromQueryString.Department.forEach((elem) => {
          if (el.value == elem) {
            el.selected = true;
          }
        });
      } else if (el.value == objFromQueryString.Department) {
        el.selected = true;
      }
    });
    console.clear();
    createObj ();
    console.log('Solution for Task №2: ', window.location.search);
    console.log('Solution for Task №3: ', objFromQueryString);
  }
};
