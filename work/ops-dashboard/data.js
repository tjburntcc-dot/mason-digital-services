window.NorthfieldData = {
  company: "Northfield Field Services",
  notice: "SYNTHETIC DATA — demo project / sample build",
  weekOf: "2026-08-24",
  technicians: [
    { id: "T-01", name: "A. Brennan", trade: "Electrical" },
    { id: "T-02", name: "M. Okonkwo", trade: "HVAC" },
    { id: "T-03", name: "S. Patel", trade: "Plumbing" },
    { id: "T-04", name: "L. Alvarez", trade: "HVAC" },
    { id: "T-05", name: "C. Nguyen", trade: "Electrical" }
  ],
  jobs: [
    { id: "NF-2401", customer: "Harbor Clinic", tech: "T-02", status: "in-progress", sla: "on-track", hours: 5.5, scheduled: "2026-08-24", issue: "Rooftop unit alarm" },
    { id: "NF-2402", customer: "Cedar Ridge School", tech: "T-01", status: "scheduled", sla: "on-track", hours: 3, scheduled: "2026-08-25", issue: "Panel labeling / spare breaker" },
    { id: "NF-2394", customer: "Wharf Bakery", tech: "T-03", status: "blocked", sla: "at-risk", hours: 2, scheduled: "2026-08-23", issue: "Waiting on backflow parts" },
    { id: "NF-2388", customer: "Northfield Library", tech: "T-05", status: "complete", sla: "met", hours: 4, scheduled: "2026-08-21", issue: "Lighting retrofit, west wing" },
    { id: "NF-2400", customer: "Pine Court Apts", tech: "T-04", status: "in-progress", sla: "on-track", hours: 6, scheduled: "2026-08-24", issue: "No cooling, unit 4C" },
    { id: "NF-2371", customer: "Dockside Inn", tech: "T-02", status: "complete", sla: "missed", hours: 7.5, scheduled: "2026-08-20", issue: "Boiler lockout — after-hours" },
    { id: "NF-2405", customer: "Elm Street Dental", tech: "T-01", status: "scheduled", sla: "on-track", hours: 2.5, scheduled: "2026-08-26", issue: "Dedicated circuit for autoclave" },
    { id: "NF-2390", customer: "Harbor Clinic", tech: "T-03", status: "complete", sla: "met", hours: 1.5, scheduled: "2026-08-22", issue: "Restroom supply line" },
    { id: "NF-2407", customer: "Town Garage", tech: "T-05", status: "scheduled", sla: "on-track", hours: 4, scheduled: "2026-08-27", issue: "Bay heater controls" },
    { id: "NF-2399", customer: "Cedar & Pine (fictional)", tech: "T-04", status: "queued", sla: "on-track", hours: 3, scheduled: "2026-08-28", issue: "Shop furnace service" },
    { id: "NF-2382", customer: "Wharf Bakery", tech: "T-02", status: "complete", sla: "met", hours: 2, scheduled: "2026-08-19", issue: "Make-up air fan" },
    { id: "NF-2408", customer: "Northfield Library", tech: "T-03", status: "queued", sla: "on-track", hours: 2, scheduled: "2026-08-28", issue: "Staff kitchen drain" }
  ],
  invoices: [
    { id: "INV-1182", customer: "Dockside Inn", amount: 2840, ageDays: 47, status: "overdue" },
    { id: "INV-1190", customer: "Wharf Bakery", amount: 960, ageDays: 18, status: "open" },
    { id: "INV-1194", customer: "Harbor Clinic", amount: 1620, ageDays: 9, status: "open" },
    { id: "INV-1175", customer: "Pine Court Apts", amount: 4100, ageDays: 62, status: "overdue" },
    { id: "INV-1198", customer: "Cedar Ridge School", amount: 740, ageDays: 4, status: "open" },
    { id: "INV-1161", customer: "Town Garage", amount: 1880, ageDays: 81, status: "overdue" },
    { id: "INV-1201", customer: "Elm Street Dental", amount: 420, ageDays: 1, status: "open" },
    { id: "INV-1188", customer: "Northfield Library", amount: 1330, ageDays: 22, status: "open" }
  ]
};
