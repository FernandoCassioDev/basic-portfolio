var form = document.getElementById("c-form");

async function handleSubmit(event) {
  event.preventDefault();

  var status = document.getElementById("formStatus");
  var data = new FormData(event.target);

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      "accept": "application/json",
    }
  })
    .then(response => {
      if (response.ok) {
        status.innerHTML = "Obrigado pela mensagem!";
        form.reset();
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"]
              .map(error => error["message"])
              .join(", ");
          } else {
            status.innerHTML =
              "Opa, ocorreu um erro ao tentar enviar sua mensagem!";
          }
        });
      }
    })
    .catch(error => {
      status.innerHTML = "Opa, ocorreu um erro ao tentar enviar sua mensagem!";
    });
}
form.addEventListener("submit", handleSubmit);
