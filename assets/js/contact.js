(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;

  var status = document.getElementById("form-status");
  var email = (window.MDS && window.MDS.contactEmail) || "masonhemmer@icloud.com";

  function setStatus(message, kind) {
    if (!status) return;
    status.textContent = message;
    status.className = "form-status" + (kind ? " " + kind : "");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var hp = form.querySelector("[name='company_website']");
    if (hp && hp.value) {
      setStatus("Thanks. If this was a real enquiry, email " + email + " directly.", "ok");
      form.reset();
      return;
    }

    var name = (form.elements.namedItem("name") || {}).value || "";
    var from = (form.elements.namedItem("email") || {}).value || "";
    var topic = (form.elements.namedItem("topic") || {}).value || "Project enquiry";
    var message = (form.elements.namedItem("message") || {}).value || "";

    name = name.trim();
    from = from.trim();
    message = message.trim();

    if (!name || !from || !message) {
      setStatus("Please complete name, email, and a short description of the work.", "err");
      return;
    }

    var body = [
      "Name: " + name,
      "Email: " + from,
      "Topic: " + topic,
      "",
      message
    ].join("\r\n");

    var href =
      "mailto:" +
      email +
      "?subject=" +
      encodeURIComponent("Hemmer Digital — " + topic) +
      "&body=" +
      encodeURIComponent(body);

    setStatus("Opening your email app. If nothing opens, write to " + email + ".", "ok");
    window.location.href = href;
  });
})();
