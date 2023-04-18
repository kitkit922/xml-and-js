let _data = [];  //local data variables

const renderTable = (nameTerm) => {
  const tableBody = document.getElementById("table-body");

  let source = _data;  //local data variables

  // filter results
  if (nameTerm) {
    source = source.filter(({ name }) => name.toLowerCase().includes(nameTerm));
  }// make your input to lowercase and filter

  const rows = source.reduce(    // pass html to rows (by reduce to combine)
    (acc, { id, name, value }) =>
      acc +
      `<tr id="table-row-${id}"><td>${id}</td><td>${name}</td><td>${value}</td></tr>`,
    ``
  );

  tableBody.innerHTML = rows;    //tableBody html is rows

  console.log(`data rendered`);
};

fetch(`./data.json`)  // fetch data
  .then((data) => data.json())
  .then((data) => {
    console.log(`data loaded`);
    _data = data;  //local data variables
    renderTable();
  });

const onSubmit = (event) => {    // event = textbox value, pass to term
  event.preventDefault();  // prevent default, not update DML, not re-access

  const term = event.target.name.value;

  renderTable(term);
};

const onReset = () => {  // reset table
  renderTable();
};
