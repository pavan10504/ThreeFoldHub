import { jsPDF } from 'jspdf';
import DocBuilder from '../../components/tools/DocBuilder';
import { addHeader, addSection, addParagraph, addBulletList, addFooter, checkAndAddPage, addSignatureBlock } from '../../utils/pdfGenerator';

const defaultValues = {
  clientName: '',
  clientCompany: '',
  clientEmail: '',
  clientPhone: '',
  website: '',
  projectName: '',
  projectType: 'new-website',
  startDate: '',
  brandAssets: '',
  accessNeeded: 'hosting, domain, analytics, social',
  contentDueDate: '',
  decisionMaker: '',
  budget: '',
};

const fields = [
  { name: 'clientName', label: 'Client Full Name', type: 'text', required: true },
  { name: 'clientCompany', label: 'Company Name', type: 'text', required: true },
  { name: 'clientEmail', label: 'Email Address', type: 'email', required: true },
  { name: 'clientPhone', label: 'Phone Number', type: 'tel' },
  { name: 'website', label: 'Current Website (if any)', type: 'text', placeholder: 'www.example.com' },
  { name: 'projectName', label: 'Project Name', type: 'text', required: true },
  { name: 'projectType', label: 'Project Type', type: 'select', options: [
    { value: 'new-website', label: 'New Website' },
    { value: 'redesign', label: 'Website Redesign' },
    { value: 'landing-page', label: 'Landing Page' },
    { value: 'ecommerce', label: 'E-commerce Website' },
  ]},
  { name: 'startDate', label: 'Project Start Date', type: 'date', required: true },
  { name: 'decisionMaker', label: 'Decision Maker (Name & Role)', type: 'text' },
  { name: 'budget', label: 'Project Budget', type: 'text', placeholder: 'e.g., $5,000 - $8,000' },
  { name: 'contentDueDate', label: 'Content Delivery Deadline', type: 'date', required: true },
  { name: 'brandAssets', label: 'Brand Assets Available', type: 'textarea', rows: 3, placeholder: 'Logo files, brand guidelines, color codes...' },
  { name: 'accessNeeded', label: 'Access Needed From Client', type: 'textarea', rows: 3, placeholder: 'Hosting, domain registrar, analytics...' },
];

const checklistItems = [
  { category: 'Brand Assets', items: ['Logo files (SVG, PNG, EPS)', 'Brand guidelines document', 'Color codes (HEX, RGB)', 'Typography files', 'Existing imagery'] },
  { category: 'Content', items: ['Homepage copy', 'About page content', 'Services description', 'Contact information', 'Testimonials'] },
  { category: 'Access & Credentials', items: ['Domain registrar access', 'Hosting control panel', 'Google Analytics', 'Social media accounts'] },
  { category: 'Project Information', items: ['Target audience description', 'Competitor websites', 'Special requirements', 'Launch date goal'] },
];

const generatePDF = (data) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });
  
  const projectTitle = data.projectName || 'Web Design Project';
  addHeader(doc, 'Client Onboarding Document', projectTitle);
  
  let y = 50;
  
  y = addSection(doc, 'Project Overview', y);
  const welcomeText = "Welcome to ThreeFoldHub! We're excited to work with " + (data.clientCompany || 'you') + " on your web design project.";
  y = addParagraph(doc, welcomeText, y);
  
  y += 5;
  y = checkAndAddPage(doc, y, 80);
  y = addSection(doc, 'Contact Information', y);
  y = addBulletList(doc, [
    'Client: ' + (data.clientName || '[Client Name]'),
    'Company: ' + (data.clientCompany || '[Company Name]'),
    'Email: ' + (data.clientEmail || '[Email]'),
    'Phone: ' + (data.clientPhone || '[Phone]'),
    'Current Website: ' + (data.website || 'N/A'),
  ], y);
  
  y += 5;
  y = checkAndAddPage(doc, y, 80);
  y = addSection(doc, 'Project Details', y);
  const projectType = data.projectType ? data.projectType.replace('-', ' ') : 'New Website';
  const projectTypeFormatted = projectType.charAt(0).toUpperCase() + projectType.slice(1);
  y = addBulletList(doc, [
    'Project Name: ' + (data.projectName || '[Project Name]'),
    'Project Type: ' + projectTypeFormatted,
    'Start Date: ' + (data.startDate || '[Start Date]'),
    'Budget: ' + (data.budget || '[Budget Range]'),
    'Decision Maker: ' + (data.decisionMaker || 'TBD'),
    'Content Due Date: ' + (data.contentDueDate || '[Due Date]'),
  ], y);
  
  if (data.brandAssets) {
    y += 5;
    y = checkAndAddPage(doc, y, 40);
    y = addSection(doc, 'Brand Assets', y);
    y = addParagraph(doc, data.brandAssets, y);
  }
  
  if (data.accessNeeded) {
    y += 5;
    y = checkAndAddPage(doc, y, 50);
    y = addSection(doc, 'Required Access', y);
    y = addBulletList(doc, data.accessNeeded.split(',').map(s => s.trim()).filter(Boolean), y);
  }
  
  y += 10;
  y = checkAndAddPage(doc, y, 100);
  y = addSection(doc, 'Client Onboarding Checklist', y);
  
  checklistItems.forEach((section) => {
    y = addParagraph(doc, section.category + ':', y, 11);
    section.items.forEach((item) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text('[ ] ' + item, 25, y);
      y += 6;
    });
    y += 8;
  });
  
  y = checkAndAddPage(doc, y, 50);
  y = addSection(doc, 'Your Responsibilities', y);
  const responsibilities = [
    'Provide all required assets and content by agreed deadlines',
    'Review and approve deliverables within 3-5 business days',
    'Designate a single point of contact for decisions',
    'Respond to queries within 24-48 hours',
    'Test the website before final approval',
  ];
  y = addBulletList(doc, responsibilities, y);
  
  y += 10;
  y = checkAndAddPage(doc, y, 50);
  y = addSection(doc, 'What Happens Next', y);
  const nextSteps = [
    '1. Review and sign the project agreement',
    '2. Pay the project deposit (50% of total cost)',
    '3. Submit all brand assets and content',
    '4. Provide access to hosting/domain as needed',
    '5. Attend the kickoff meeting to finalize details',
  ];
  y = addBulletList(doc, nextSteps, y);
  
  addFooter(doc, 'ThreeFoldHub Client Onboarding');
  
  const filename = 'onboarding-' + (data.clientName || 'client').toLowerCase().replace(/\s+/g, '-') + '.pdf';
  doc.save(filename);
};

const previewContent = (data) => (
  <div className="p-4 text-xs leading-relaxed" style={{minWidth: '595px'}}>
    <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-red-500">
      <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white font-bold text-sm">
        TFH
      </div>
      <div>
        <h1 className="text-base font-bold">Client Onboarding Document</h1>
        <p className="text-gray-500 text-xs">{data.projectName || 'Project Name'}</p>
      </div>
    </div>
    
    <div className="space-y-4">
      <section>
        <h2 className="text-red-500 font-bold text-xs mb-2">CLIENT INFO</h2>
        <div className="grid grid-cols-2 gap-2 text-gray-700">
          <p><strong>{data.clientName || '[Client]'}</strong></p>
          <p className="text-gray-500">{data.clientCompany || '[Company]'}</p>
          <p className="text-gray-500 col-span-2">{data.clientEmail || '[email]'}</p>
        </div>
      </section>
      
      <section>
        <h2 className="text-red-500 font-bold text-xs mb-2">PROJECT DETAILS</h2>
        <div className="grid grid-cols-2 gap-2 text-gray-700 text-xs">
          <p>Type: <span className="text-gray-500">{data.projectType ? data.projectType.replace('-', ' ') : 'New Website'}</span></p>
          <p>Start: <span className="text-gray-500">{data.startDate || '[Date]'}</span></p>
          <p>Budget: <span className="text-gray-500">{data.budget || '[TBD]'}</span></p>
          <p>Content Due: <span className="text-gray-500">{data.contentDueDate || '[Date]'}</span></p>
        </div>
      </section>
      
      <section>
        <h2 className="text-red-500 font-bold text-xs mb-2">CHECKLIST</h2>
        <div className="space-y-2">
          {checklistItems.slice(0, 2).map((section, i) => (
            <div key={i}>
              <p className="font-semibold text-gray-600 mb-1">{section.category}</p>
              {section.items.slice(0, 3).map((item, j) => (
                <div key={j} className="flex items-center gap-2 text-gray-500 text-xs">
                  <div className="w-3 h-3 border border-gray-300 rounded" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-red-500 font-bold text-xs mb-2">NEXT STEPS</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-1 text-xs">
          <li>Sign project agreement</li>
          <li>Pay 50% deposit</li>
          <li>Submit assets & content</li>
          <li>Provide access credentials</li>
          <li>Attend kickoff meeting</li>
        </ol>
      </section>
    </div>
  </div>
);

const OnboardingTool = () => {
  return (
    <DocBuilder
      title="Client Onboarding Document"
      description="Generate a comprehensive onboarding checklist for new clients"
      fields={fields}
      defaultValues={defaultValues}
      onGenerate={generatePDF}
      previewContent={previewContent}
    />
  );
};

export default OnboardingTool;