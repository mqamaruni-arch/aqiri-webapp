const applicationForm = document.querySelector("#diploma-application");
const formStatus = document.querySelector("#form-status");
const documentInput = document.querySelector("#documents");
const documentCount = document.querySelector("#document-count");

documentInput?.addEventListener("change", () => {
  const count = documentInput.files.length;
  const tooMany = count > 7;
  documentInput.setCustomValidity(tooMany ? "Please select no more than 7 documents." : "");
  documentCount.textContent = tooMany
    ? `${count} files selected. Please reduce the selection to 7 files.`
    : `${count} of 7 files selected. Selected files must be attached manually when your email application opens.`;
  if (tooMany) documentInput.reportValidity();
});

applicationForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!applicationForm.reportValidity()) return;

  const data = new FormData(applicationForm);
  const values = (name) => data.getAll(name).filter(Boolean).join(", ") || "Not provided";
  const value = (name) => data.get(name)?.toString().trim() || "Not provided";
  const subject = `Advanced Diploma Application — ${value("full_name")} — ${value("program")}`;
  const body = [
    "ADVANCED DIPLOMA APPLICATION",
    "",
    `Program: ${value("program")}`,
    `Mode: ${value("mode")}`,
    `Language: ${value("language")}`,
    "",
    "PERSONAL INFORMATION",
    `Full name: ${value("full_name")}`,
    `Father's / Guardian's name: ${value("guardian_name")}`,
    `Gender: ${value("gender")}`,
    `Date of birth: ${value("date_of_birth")}`,
    `CNIC / B-Form / Passport: ${value("identity_number")}`,
    `City: ${value("city")}`,
    `Country: ${value("country")}`,
    `Phone / WhatsApp: ${value("phone")}`,
    `Email: ${value("email")}`,
    `Postal address: ${value("postal_address")}`,
    "",
    "EDUCATIONAL BACKGROUND",
    `Highest qualification: ${value("highest_qualification")}`,
    `Degree / Program: ${value("degree_program")}`,
    `Institution: ${value("institution")}`,
    `Completion year / Semester: ${value("completion_year")}`,
    `Field of study: ${value("field_of_study")}`,
    `Academic status: ${value("academic_status")}`,
    "",
    "PROGRAM-RELEVANT BACKGROUND",
    `Arabic level: ${value("arabic_level")}`,
    `Arabic areas studied: ${values("arabic_areas")}`,
    `Reason for Arabic diploma: ${value("arabic_reason")}`,
    `Research experience: ${values("research_experience")}`,
    `Areas to improve: ${values("improvement_areas")}`,
    `Reason for research diploma: ${value("research_reason")}`,
    "",
    "EXPERIENCE",
    `Current occupation: ${value("occupation")}`,
    `Organization: ${value("organization")}`,
    `Relevant experience: ${value("relevant_experience")}`,
    `Previous work: ${value("previous_work")}`,
    "",
    "ACADEMIC REFERENCES",
    `Reference 1: ${value("reference_1_name")}, ${value("reference_1_position")}, ${value("reference_1_institution")}`,
    `Reference 1 email: ${value("reference_1_email")}`,
    `Reference 1 phone: ${value("reference_1_phone")}`,
    `Reference 1 relationship: ${value("reference_1_relationship")}`,
    `Reference 2: ${value("reference_2_name")}, ${value("reference_2_position")}, ${value("reference_2_institution")}`,
    `Reference 2 email: ${value("reference_2_email")}`,
    `Reference 2 phone: ${value("reference_2_phone")}`,
    `Reference 2 relationship: ${value("reference_2_relationship")}`,
    "",
    "AVAILABILITY",
    `Study days: ${value("study_days")}`,
    `Preferred time: ${value("preferred_time")}`,
    `Regular attendance: ${value("regular_attendance")}`,
    "",
    "STATEMENT OF INTEREST",
    value("statement_of_interest"),
    "",
    "Declaration: Agreed",
    "",
    "Please attach the required documents before sending this email."
  ].join("\n");

  formStatus.textContent = "Your email application has been prepared. Attach your documents, then send the email to complete your application.";
  window.location.href = `mailto:admissions@aqiri.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
