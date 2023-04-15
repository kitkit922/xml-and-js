const renderTable = (data) => {
  const tableBody = document.getElementById("table-body");

  let source = data;  // do not change source

  // filter values
  const withFilters = Boolean(window.location.search);

  if (withFilters) {
    const params = new URLSearchParams(window.location.search);
    const nameTerm = params.get(`name`).toLowerCase();
    const inputControl = document.getElementById(`input-name-term`);
    inputControl.value = nameTerm;

    source = source.filter(({ name }) => name.toLowerCase().includes(nameTerm)); //filter by contain name (app -> apple), case sensitive, no conversion
  }

  // Console log in web
  // window.location



  const rows = source.reduce(
    (acc, { id, name, value }) =>  // Use reduce to join html strings together
      acc +
      `<tr id="table-row-${id}"><td>${id}</td><td>${name}</td><td>${value}</td></tr>`,
    ``
  );

  tableBody.innerHTML = rows;

  console.log(`data rendered`);
};

fetch(`./data.json`)
  .then((data) => data.json())
  .then((data) => {
    console.log(`data loaded`);
    renderTable(data);
  });

const onReset = () => {
  window.location.replace(window.location.pathname);
};


// disadvantage, always reload the data, I have requested already before
