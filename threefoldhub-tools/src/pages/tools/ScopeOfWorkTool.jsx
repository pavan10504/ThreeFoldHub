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
  clientCompany: "",
  projectTitle: "",
  objectives: "",
  pagesIncluded: "Homepage, About, Services, Contact",
  features: "Responsive design, Contact form, SEO basics",
  cmsRequired: true,
  seoTasks: "Meta tags, Sitemap, Basic structure",
  pagesExcluded: "Blog, E-commerce",
  featuresExcluded: "Custom animations, Video production",
  revisionRounds: "3",
  additionalRevisionRate: "75",
  kickoffDate: "",
  designDue: "",
  launchTarget: "",
  clientContentDue: "",
  approverName: "",
  approverRole: "",
};

const fields = [
  { name: "agencyName", label: "Agency Name", type: "text", required: true },
  { name: "clientName", label: "Client Name", type: "text", required: true },
  {
    name: "clientCompany",
    label: "Client Company",
    type: "text",
    required: true,
  },
  {
    name: "projectTitle",
    label: "Project Title",
    type: "text",
    required: true,
  },
  {
    name: "objectives",
    label: "Project Objectives",
    type: "textarea",
    rows: 3,
    placeholder: "What are the main goals of this website?",
  },
  {
    name: "pagesIncluded",
    label: "Pages Included",
    type: "textarea",
    rows: 2,
    placeholder: "Homepage, About, Services, Contact...",
  },
  {
    name: "features",
    label: "Features Included",
    type: "textarea",
    rows: 2,
    placeholder: "Contact form, Responsive design...",
  },
  {
    name: "cmsRequired",
    label: "CMS Required",
    type: "select",
    options: [
      { value: "true", label: "Yes" },
      { value: "false", label: "No" },
    ],
  },
  {
    name: "pagesExcluded",
    label: "Pages Excluded",
    type: "textarea",
    rows: 2,
    placeholder: "Blog, Shop...",
  },
  {
    name: "featuresExcluded",
    label: "Features Excluded",
    type: "textarea",
    rows: 2,
    placeholder: "E-commerce, Bookings...",
  },
  {
    name: "revisionRounds",
    label: "Included Revision Rounds",
    type: "select",
    options: [
      { value: "2", label: "2 rounds" },
      { value: "3", label: "3 rounds" },
      { value: "4", label: "4 rounds" },
    ],
  },
  {
    name: "additionalRevisionRate",
    label: "Additional Revision Rate ($/hr)",
    type: "text",
    placeholder: "75",
  },
  { name: "kickoffDate", label: "Kickoff Date", type: "date", required: true },
  { name: "designDue", label: "Design Approval Target", type: "date" },
  { name: "launchTarget", label: "Target Launch Date", type: "date" },
  {
    name: "clientContentDue",
    label: "Client Content Due Date",
    type: "date",
    required: true,
  },
  {
    name: "approverName",
    label: "Final Approver Name",
    type: "text",
    required: true,
  },
  {
    name: "approverRole",
    label: "Final Approver Role",
    type: "text",
    placeholder: "e.g., CEO",
  },
];

const generatePDF = (data) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  addHeader(doc, "Scope of Work", data.projectTitle || "Project Scope");

  let y = 50;

  y = addSection(doc, "1. Project Overview", y);
  y = addParagraph(doc, "Project: " + (data.projectTitle || "[Project]"), y);
  y = addParagraph(doc, "Client: " + (data.clientCompany || "[Client]"), y);
  y = addParagraph(doc, "Agency: " + (data.agencyName || "Agency"), y);

  y = checkAndAddPage(doc, y, 50);
  y = addSection(doc, "2. Objectives", y);
  y = addParagraph(
    doc,
    data.objectives ||
      "Modernize online presence with custom-designed website.",
    y,
  );

  y = checkAndAddPage(doc, y, 60);
  y = addSection(doc, "3. In-Scope Deliverables", y);
  y = addParagraph(doc, "Pages:", y, 11);
  y = addBulletList(
    doc,
    (data.pagesIncluded || "Homepage, About, Services, Contact")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    y,
  );
  y += 5;
  y = addParagraph(doc, "Features:", y, 11);
  y = addBulletList(
    doc,
    (data.features || "Responsive design, Contact form")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    y,
  );

  if (data.cmsRequired === "true") {
    y = addParagraph(doc, "CMS Setup:", y, 11);
    y = addBulletList(
      doc,
      ["Content management system", "Admin training", "User guide"],
      y,
    );
  }

  y = checkAndAddPage(doc, y, 50);
  y = addSection(doc, "4. Out-of-Scope", y);
  y = addParagraph(doc, "Pages:", y, 11);
  y = addBulletList(
    doc,
    (data.pagesExcluded || "Blog, E-commerce")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    y,
  );
  y = addParagraph(doc, "Features:", y, 11);
  y = addBulletList(
    doc,
    (data.featuresExcluded || "Custom animations")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    y,
  );

  y = checkAndAddPage(doc, y, 50);
  y = addSection(doc, "5. Timeline", y);
  const milestones = [];
  if (data.kickoffDate) milestones.push("Kickoff: " + data.kickoffDate);
  if (data.designDue) milestones.push("Design: " + data.designDue);
  if (data.launchTarget) milestones.push("Launch: " + data.launchTarget);
  y = addBulletList(doc, milestones, y);

  y = checkAndAddPage(doc, y, 50);
  y = addSection(doc, "6. Client Dependencies", y);
  y = addBulletList(
    doc,
    [
      "Content due: " + (data.clientContentDue || "[Date]"),
      "Approver: " +
        (data.approverName || "[Name]") +
        " (" +
        (data.approverRole || "[Role]") +
        ")",
    ],
    y,
  );

  y = checkAndAddPage(doc, y, 50);
  y = addSection(doc, "7. Revision Policy", y);
  y = addParagraph(
    doc,
    (data.revisionRounds || "3") +
      " revision rounds included. Additional: $" +
      (data.additionalRevisionRate || "75") +
      "/hr.",
    y,
  );

  y = checkAndAddPage(doc, y, 50);
  y = addSection(doc, "8. Approval", y);
  y = addBulletList(
    doc,
    [
      "Final approver: " + (data.approverName || "[Name]"),
      "Written approval required",
      "5 business days deemed approval",
    ],
    y,
  );

  y += 10;
  y = checkAndAddPage(doc, y, 50);
  y = addSignatureBlock(doc, y, "Client", "Agency");

  addFooter(doc, "ThreeFoldHub Scope of Work");

  const filename =
    "scope-of-work-" +
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
        <h1 className="text-base font-bold">Scope of Work</h1>
        <p className="text-gray-500 text-xs">
          {data.projectTitle || "Project Title"}
        </p>
      </div>
    </div>

    <div className="space-y-4">
      <section>
        <h2 className="text-red-500 font-bold text-xs mb-2">PAGES</h2>
        <p className="text-gray-700">
          {data.pagesIncluded || "Homepage, About, Services, Contact"}
        </p>
      </section>

      <section>
        <h2 className="text-red-500 font-bold text-xs mb-2">TIMELINE</h2>
        <div className="space-y-1 text-gray-700">
          {data.kickoffDate && <p>Kickoff: {data.kickoffDate}</p>}
          {data.designDue && <p>Design: {data.designDue}</p>}
          {data.launchTarget && <p>Launch: {data.launchTarget}</p>}
        </div>
      </section>

      <section>
        <h2 className="text-red-500 font-bold text-xs mb-2">REVISIONS</h2>
        <p className="text-gray-700">
          {data.revisionRounds || "3"} rounds included
        </p>
        <p className="text-gray-500">
          ${data.additionalRevisionRate || "75"}/hr additional
        </p>
      </section>

      <section>
        <h2 className="text-red-500 font-bold text-xs mb-2">EXCLUSIONS</h2>
        <p className="text-gray-500">
          {data.pagesExcluded || "Blog, E-commerce"}
        </p>
      </section>
    </div>
  </div>
);

const ScopeOfWorkTool = () => {
  return (
    <DocBuilder
      title="Scope of Work"
      description="Create a detailed project scope document"
      fields={fields}
      defaultValues={defaultValues}
      onGenerate={generatePDF}
      previewContent={previewContent}
    />
  );
};

export default ScopeOfWorkTool;
