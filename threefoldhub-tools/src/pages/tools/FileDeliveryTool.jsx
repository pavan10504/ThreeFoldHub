import { jsPDF } from "jspdf";
import DocBuilder from "../../components/tools/DocBuilder";
import {
  addHeader,
  addSection,
  addParagraph,
  addBulletList,
  addFooter,
  checkAndAddPage,
  addSignatureBlock,
} from "../../utils/pdfGenerator";

const defaultValues = {
  agencyName: "ThreeFoldHub",
  clientName: "",
  projectName: "",
  sourceCodeIncluded: true,
  designFilesIncluded: false,
  designFilesNote: "Available separately for $500",
  credentialsDoc: true,
  documentation: true,
  training: true,
  supportDays: "30",
  deliveryMethod: "google-drive",
  deliveryTiming: "Upon full payment",
  gatedDelivery: true,
  governingState: "Karnataka",
};

const fields = [
  { name: "agencyName", label: "Agency Name", type: "text", required: true },
  { name: "clientName", label: "Client Name", type: "text", required: true },
  { name: "projectName", label: "Project Name", type: "text", required: true },
  {
    name: "supportDays",
    label: "Support Period (days)",
    type: "number",
    min: 0,
    placeholder: "30",
  },
  {
    name: "deliveryMethod",
    label: "Delivery Method",
    type: "select",
    options: [
      { value: "google-drive", label: "Google Drive" },
      { value: "dropbox", label: "Dropbox" },
      { value: "github", label: "GitHub" },
      { value: "zip-link", label: "Download Link" },
    ],
  },
  {
    name: "deliveryTiming",
    label: "Delivery Timing",
    type: "text",
    placeholder: "Upon full payment",
  },
  {
    name: "gatedDelivery",
    label: "Gate Behind Payment",
    type: "select",
    options: [
      { value: "true", label: "Yes - Release after payment" },
      { value: "false", label: "No - Deliver immediately" },
    ],
  },
  {
    name: "sourceCodeIncluded",
    label: "Source Code Included",
    type: "select",
    options: [
      { value: "true", label: "Yes" },
      { value: "false", label: "No" },
    ],
  },
  {
    name: "designFilesIncluded",
    label: "Design Files Included",
    type: "select",
    options: [
      { value: "true", label: "Yes" },
      { value: "false", label: "No (available separately)" },
    ],
  },
  {
    name: "designFilesNote",
    label: "Design Files Note",
    type: "text",
    placeholder: "Available for $500",
  },
  {
    name: "credentialsDoc",
    label: "Credentials Doc Included",
    type: "select",
    options: [
      { value: "true", label: "Yes" },
      { value: "false", label: "No" },
    ],
  },
  {
    name: "documentation",
    label: "Documentation Included",
    type: "select",
    options: [
      { value: "true", label: "Yes" },
      { value: "false", label: "No" },
    ],
  },
  {
    name: "training",
    label: "Training Included",
    type: "select",
    options: [
      { value: "true", label: "Yes" },
      { value: "false", label: "No" },
    ],
  },
  {
    name: "governingState",
    label: "Governing Jurisdiction",
    type: "text",
    placeholder: "Karnataka",
  },
];

const generatePDF = (data) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  addHeader(
    doc,
    "File Delivery Policy",
    (data.projectName || "Project") + " Deliverables",
  );

  let y = 50;

  y = addSection(doc, "Policy Overview", y);
  y = addParagraph(
    doc,
    "This File Delivery Policy outlines deliverables and handover terms.",
    y,
  );

  y = checkAndAddPage(doc, y, 60);
  y = addSection(doc, "1. Included Deliverables", y);
  const deliverables = [];
  if (data.sourceCodeIncluded === "true")
    deliverables.push("Final website source code");
  if (data.designFilesIncluded === "true") {
    deliverables.push("Design source files");
  } else if (data.designFilesNote) {
    deliverables.push("Design files: " + data.designFilesNote);
  }
  if (data.credentialsDoc === "true") deliverables.push("Credentials document");
  if (data.documentation === "true")
    deliverables.push("Technical documentation");
  if (data.training === "true") deliverables.push("Training session");
  deliverables.push("Final deployed files");
  y = addBulletList(doc, deliverables, y);

  y = checkAndAddPage(doc, y, 50);
  y = addSection(doc, "2. Excluded Items", y);
  y = addBulletList(
    doc,
    [
      "Figma/PSD source files (unless purchased)",
      "Stock photography (usage license only)",
      "Third-party plugin licenses",
      "Ongoing hosting fees",
    ],
    y,
  );

  y = checkAndAddPage(doc, y, 50);
  y = addSection(doc, "3. Delivery", y);
  y = addParagraph(
    doc,
    "Method: " + (data.deliveryMethod?.replace("-", " ") || "download link"),
    y,
  );
  y = addParagraph(
    doc,
    "Timing: " + (data.deliveryTiming || "Upon full payment"),
    y,
  );
  if (data.gatedDelivery === "true") {
    y = addParagraph(doc, "Files released only after final payment.", y);
  }

  y = checkAndAddPage(doc, y, 50);
  y = addSection(doc, "4. Support", y);
  y = addParagraph(
    doc,
    (data.supportDays || "30") +
      " days complimentary support. Includes bug fixes and basic assistance.",
    y,
  );

  y = checkAndAddPage(doc, y, 50);
  y = addSection(doc, "5. Governing", y);
  y = addParagraph(
    doc,
    "Laws of " + (data.governingState || "Karnataka") + ".",
    y,
  );

  y += 10;
  y = checkAndAddPage(doc, y, 50);
  y = addSignatureBlock(doc, y, "Client", "Agency");

  addFooter(doc, "ThreeFoldHub File Delivery Policy");

  const filename =
    "file-delivery-policy-" +
    (data.clientName || "client").toLowerCase().replace(/\s+/g, "-") +
    ".pdf";
  doc.save(filename);
};

const previewContent = (data) => (
  <div className="p-4 text-xs leading-relaxed" style={{ minWidth: "595px" }}>
    <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-red-500">
      <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white font-bold text-sm">
        TFH
      </div>
      <div>
        <h1 className="text-base font-bold">File Delivery Policy</h1>
        <p className="text-gray-500 text-xs">{data.projectName || "Project"}</p>
      </div>
    </div>

    <div className="space-y-4">
      <section>
        <h2 className="text-red-500 font-bold text-xs mb-2">INCLUDED</h2>
        <div className="space-y-1 text-gray-700">
          {data.sourceCodeIncluded === "true" && <p>Source Code</p>}
          {data.credentialsDoc === "true" && <p>Credentials Document</p>}
          {data.documentation === "true" && <p>Documentation</p>}
          {data.training === "true" && <p>Training Session</p>}
          <p>Final Website Files</p>
        </div>
      </section>

      <section>
        <h2 className="text-red-500 font-bold text-xs mb-2">EXCLUDED</h2>
        <p className="text-gray-500">
          Figma/PSD, Stock Images, Third-party Licenses
        </p>
      </section>

      <section>
        <h2 className="text-red-500 font-bold text-xs mb-2">DELIVERY</h2>
        <div className="grid grid-cols-2 gap-2 text-gray-700">
          <p>
            Method:{" "}
            <span className="text-gray-500">
              {data.deliveryMethod?.replace("-", " ") || "Link"}
            </span>
          </p>
          <p>
            Timing:{" "}
            <span className="text-gray-500">
              {data.deliveryTiming || "Upon payment"}
            </span>
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-red-500 font-bold text-xs mb-2">SUPPORT</h2>
        <p className="text-gray-700">
          {data.supportDays || "30"} days complimentary
        </p>
      </section>
    </div>
  </div>
);

const FileDeliveryTool = () => {
  return (
    <DocBuilder
      title="File Delivery Policy"
      description="Generate a document outlining deliverables and handover terms"
      fields={fields}
      defaultValues={defaultValues}
      onGenerate={generatePDF}
      previewContent={previewContent}
    />
  );
};

export default FileDeliveryTool;
