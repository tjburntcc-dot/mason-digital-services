(function (root) {
  function digitsPhone(value) {
    return String(value || "").replace(/\D/g, "").slice(-10);
  }

  function scoreIssue(issue) {
    var text = String(issue || "").toLowerCase();
    var emergency = /gas smell|gas leak|carbon monoxide/.test(text);
    if (emergency || /\bno heat\b|\bno cooling\b|not cooling|flood|water in (the )?(basement|house)/.test(text)) {
      return { level: "same-day", emergency: emergency };
    }
    if (/no hot water|water heater leak/.test(text)) {
      return { level: "next-day", emergency: false };
    }
    return { level: "schedule", emergency: false };
  }

  function ticketId(phone, zip) {
    return "HS-" + digitsPhone(phone).slice(-4) + "-" + zip;
  }

  function processLead(input, options) {
    var crm = (options && options.crm) || [];
    var zips = (options && options.serviceZips) || [];
    var zipSet = {};
    zips.forEach(function (z) { zipSet[z] = true; });

    var errors = [];
    if (!String(input.name || "").trim()) errors.push("name");
    var phone = digitsPhone(input.phone);
    if (phone.length !== 10) errors.push("phone");
    var zip = String(input.zip || "").trim();
    if (!/^\d{5}$/.test(zip)) errors.push("zip");
    if (String(input.issue || "").trim().length < 4) errors.push("issue");

    if (errors.length) {
      return { ok: false, stage: "validate", errors: errors, route: null, ticket: null };
    }

    if (!zipSet[zip]) {
      return {
        ok: true,
        stage: "output",
        route: "out-of-area",
        emergency: false,
        existingCustomer: false,
        ticket: null,
        customerMessage: "We do not cover " + zip + ". A human should send a local referral — this demo does not invent one.",
        ownerDigest: "Out-of-area enquiry from " + input.name + " (" + zip + "). No ticket opened."
      };
    }

    var existing = crm.find(function (row) { return row.phone === phone; }) || null;
    var urgency = scoreIssue(input.issue);
    var type = urgency.level === "schedule" ? "maintenance" : "dispatch";

    var ticket = {
      id: ticketId(input.phone, zip),
      type: type,
      route: urgency.level,
      emergency: urgency.emergency,
      customer: {
        name: String(input.name).trim(),
        phone: phone,
        zip: zip,
        existing: Boolean(existing),
        customerId: existing ? existing.id : null
      },
      issue: String(input.issue).trim(),
      source: input.source || "unspecified",
      sla: urgency.emergency ? "immediate-callback" : urgency.level === "same-day" ? "dispatch-today" : urgency.level === "next-day" ? "next-business-day" : "book-window"
    };

    var customerMessage = urgency.emergency
      ? "If you smell gas, stay outside and call the gas utility / 911. We will also treat this as an immediate callback."
      : urgency.level === "same-day"
        ? "We have a same-day dispatch ticket. A dispatcher should confirm a window by phone."
        : urgency.level === "next-day"
          ? "We have a next-day ticket. Expect a call to set a time."
          : "We have a maintenance request. Scheduling should offer the next open window.";

    if (existing) {
      customerMessage += " Account " + existing.id + " was matched on phone number.";
    }

    return {
      ok: true,
      stage: "output",
      route: urgency.level,
      emergency: urgency.emergency,
      existingCustomer: Boolean(existing),
      ticket: ticket,
      customerMessage: customerMessage,
      ownerDigest: (urgency.emergency ? "EMERGENCY " : "") + ticket.id + " · " + ticket.route + " · " + ticket.customer.name
    };
  }

  root.HarborIntake = { processLead: processLead, digitsPhone: digitsPhone, scoreIssue: scoreIssue };
})(typeof window !== "undefined" ? window : globalThis);
