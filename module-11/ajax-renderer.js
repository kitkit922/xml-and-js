let _data = [];  //local data variables

const renderTable = (nameTerm) => {
  const tableBody = document.getElementById("table-body");

  let source = _data;  //local data variables

  // filter results
  if (nameTerm) {
    source = source.filter(({ name }) => name.toLowerCase().includes(nameTerm));
  }

  const rows = source.reduce(
    (acc, { id, name, value }) =>
      acc +
      `<tr id="table-row-${id}"><td>${id}</td><td>${name}</td><td>${value}</td></tr>`,
    ``
  );

  tableBody.innerHTML = rows;

  console.log(`data rendered`);
};

fetch(`./data.json`)  // fetch data
  .then((data) => data.json())
  .then((data) => {
    console.log(`data loaded`);
    _data = data;
    renderTable();
  });

const onSubmit = (event) => {
  event.preventDefault();  // prevent default, not update DML, not re-access

  const term = event.target.name.value;

  renderTable(term);
};

const onReset = () => {
  renderTable();
};
