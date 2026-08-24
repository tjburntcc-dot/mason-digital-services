(function (root) {
  function sameArray(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
    return a.every(function (item, i) { return item === b[i]; });
  }

  function runTests(leads, expected, crm, serviceZips) {
    return expected.map(function (exp) {
      var lead = leads.find(function (row) { return row.id === exp.id; });
      if (!lead) {
        return { id: exp.id, pass: false, detail: "Missing fixture" };
      }
      var result = root.HarborIntake.processLead(lead.input, { crm: crm, serviceZips: serviceZips });
      var failures = [];
      if (result.ok !== exp.ok) failures.push("ok");
      if (exp.ok === false) {
        if (result.stage !== exp.stage) failures.push("stage");
        if (!sameArray(result.errors, exp.errors)) failures.push("errors");
      } else {
        if (result.route !== exp.route) failures.push("route");
        if (Boolean(result.emergency) !== Boolean(exp.emergency)) failures.push("emergency");
        if (Boolean(result.existingCustomer) !== Boolean(exp.existingCustomer)) failures.push("existingCustomer");
        if (exp.ticketType === null && result.ticket !== null) failures.push("ticket");
        if (exp.ticketType && (!result.ticket || result.ticket.type !== exp.ticketType)) failures.push("ticketType");
        if (exp.customerId && (!result.ticket || result.ticket.customer.customerId !== exp.customerId)) failures.push("customerId");
      }
      return {
        id: exp.id,
        label: lead.label,
        pass: failures.length === 0,
        detail: failures.length ? "Mismatch: " + failures.join(", ") : "Matched expected route and flags",
        result: result
      };
    });
  }

  root.HarborIntakeTests = { runTests: runTests };
})(typeof window !== "undefined" ? window : globalThis);
