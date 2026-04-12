fetch("http://localhost:3000/api/services")
  .then(res => res.json())
  .then(data => {
    console.log(JSON.stringify(data.slice(0, 2), null, 2));
  }).catch(e => console.error(e));
