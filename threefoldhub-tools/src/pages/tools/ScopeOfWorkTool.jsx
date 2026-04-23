import { jsPDF } from 'jspdf';
import DocBuilder from '../../components/tools/DocBuilder';
import { addHeader, addSection, addParagraph, addBulletList, addFooter, addSignatureBlock } from '../../utils/pdfGenerator';

const defaultValues = {
  agencyName: 'ThreeFoldHub',
  clientName: '',
  clientCompany: '',
  projectTitle: '',
  objectives: '',
  pagesIncluded: 'Homepage, About, Services, Contact',
  features: 'Responsive design, Contact form, SEO basics',
  cmsRequired: true,
  seoTasks: 'Meta tags, Sitemap, Basic structure',
  hostingRequired: false,
  pagesExcluded: 'Blog, E-commerce, Member portal',
  featuresExcluded: 'Custom animations, Video production, Copywriting',
  revisionRounds: '3',
  additionalRevisionRate: '75',
  clientContentDue: '',
  clientAssetsDue: '',
  kickoffDate: '',
  designDue: '',
  devDue: '',
  launchTarget: '',
  contentOwner: '',
  assetOwner: '',
  approverName: '',
  approverRole: '',
};

const fields = [
  { name: 'agencyName', label: 'Agency Name', type: 'text', required: true },
  { name: 'clientName', label: 'Client Name', type: 'text', required: true },
  { name: 'clientCompany', label: 'Client Company', type: 'text', required: true },
  { name: 'projectTitle', label: 'Project Title', type: 'text', required: true },
  { name: 'objectives', label: 'Project Objectives', type: 'textarea', rows: 4, required: true, placeholder: 'What are the main goals of this website project?' },
  { name: 'pagesIncluded', label: 'Pages Included', type: 'textarea', rows: 3, required: true, placeholder: 'Homepage, About, Services, Contact...' },
  { name: 'features', label: 'Features Included', type: 'textarea', rows: 3, placeholder: 'Contact form, Responsive design, Google Maps...' },
  { name: 'cmsRequired', label: 'CMS Required', type: 'select', options: [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' },
  ]},
  { name: 'seoTasks', label: 'SEO Tasks', type: 'textarea', rows: 2, placeholder: 'Meta tags, Sitemap, Schema markup...' },
  { name: 'hostingRequired', label: 'Hosting Setup Included', type: 'select', options: [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' },
  ]},
  { name: 'pagesExcluded', label: 'Pages Excluded', type: 'textarea', rows: 2, placeholder: 'Blog, Shop, Forum...' },
  { name: 'featuresExcluded', label: 'Features Excluded', type: 'textarea', rows: 2, placeholder: 'E-commerce, Bookings, Custom CMS...' },
  { name: 'revisionRounds', label: 'Included Revision Rounds', type: 'select', options: [
    { value: '2', label: '2 rounds' },
    { value: '3', label: '3 rounds' },
    { value: '4', label: '4 rounds' },
  ]},
  { name: 'additionalRevisionRate', label: 'Additional Revision Rate ($/hour)', type: 'text', placeholder: '75' },
  { name: 'kickoffDate', label: 'Kickoff Date', type: 'date', required: true },
  { name: 'designDue', label: 'Design Approval Target', type: 'date' },
  { name: 'devDue', label: 'Development Complete Target', type: 'date' },
  { name: 'launchTarget', label: 'Target Launch Date', type: 'date' },
  { name: 'clientContentDue', label: 'Client Content Due Date', type: 'date', required: true },
  { name: 'clientAssetsDue', label: 'Client Assets Due Date', type: 'date', required: true },
  { name: 'contentOwner', label: 'Content Owner Name', type: 'text', placeholder: 'Who will provide content?' },
  { name: 'assetOwner', label: 'Brand Assets Owner', type: 'text', placeholder: 'Who will provide assets?' },
  { name: 'approverName', label: 'Final Approver Name', type: 'text', required: true },
  { name: 'approverRole', label: 'Final Approver Role', type: 'text', placeholder: 'e.g., CEO, Marketing Director' },
];

const generatePDF = (data) => {
  const doc = new jsPDF();
  
  addHeader(doc, 'Scope of Work', `${data.projectTitle || 'Project Scope'}`);
  
  let y = 50;
  
  y = addSection(doc, '1. Project Overview', y);
  addParagraph(doc, `Project: ${data.projectTitle || '[Project Title]'}`);
  y += 5;
  addParagraph(doc, `Client: ${data.clientCompany || '[Client]'} (${data.clientName || '[Contact]'})`);
  y += 5;
  addParagraph(doc, `Agency: ${data.agencyName || 'Agency'}`);
  y += 8;
  
  y = addSection(doc, '2. Objectives', y);
  y = addParagraph(doc, data.objectives || 'Modernize the client\'s online presence with a custom-designed, responsive website.', y);
  y += 10;
  
  y = addSection(doc, '3. In-Scope Deliverables', y);
  
  addParagraph(doc, 'Pages:', y, 11);
  addBulletList(doc, (data.pagesIncluded || 'Homepage, About, Services, Contact').split(',').map(s => s.trim()).filter(Boolean), y);
  y += 8;
  
  addParagraph(doc, 'Features:', y, 11);
  addBulletList(doc, (data.features || 'Responsive design, Contact form').split(',').map(s => s.trim()).filter(Boolean), y);
  y += 8;
  
  if (data.cmsRequired === 'true') {
    addParagraph(doc, 'CMS Setup:', y, 11);
    addBulletList(doc, ['Content management system installation', 'Basic admin training', 'User guide documentation'], y);
    y += 8;
  }
  
  if (data.seoTasks) {
    addParagraph(doc, 'SEO Tasks:', y, 11);
    addBulletList(doc, data.seoTasks.split(',').map(s => s.trim()).filter(Boolean), y);
    y += 8;
  }
  
  if (data.hostingRequired === 'true') {
    addBulletList(doc, ['Domain configuration', 'SSL certificate setup', 'Hosting deployment'], y);
  }
  
  y += 5;
  
  y = addSection(doc, '4. Out-of-Scope (Exclusions)', y);
  addParagraph(doc, 'The following items are NOT included in this scope:', y);
  y += 5;
  
  if (data.pagesExcluded) {
    addParagraph(doc, 'Pages:', y, 11);
    addBulletList(doc, data.pagesExcluded.split(',').map(s => s.trim()).filter(Boolean), y);
    y += 8;
  }
  
  if (data.featuresExcluded) {
    addParagraph(doc, 'Features:', y, 11);
    addBulletList(doc, data.featuresExcluded.split(',').map(s => s.trim()).filter(Boolean), y);
  }
  
  const additionalExclusions = [
    'Content writing and copywriting',
    'Custom photography or stock images (unless specified)',
    'Third-party plugin licenses',
    'Ongoing maintenance (after 30 days)',
  ];
  addParagraph(doc, 'Standard Exclusions:', y, 11);
  addBulletList(doc, additionalExclusions, y);
  y += 10;
  
  y = addSection(doc, '5. Timeline & Milestones', y);
  
  const milestones = [
    { name: 'Project Kickoff', date: data.kickoffDate, desc: 'Final scope, assets, and access received' },
    { name: 'Design Phase', date: data.designDue, desc: 'Visual designs for approval' },
    { name: 'Development', date: data.devDue, desc: 'Build and testing' },
    { name: 'Launch', date: data.launchTarget, desc: 'Go live' },
  ].filter(m => m.date);
  
  milestones.forEach((m, i) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...[17, 17, 17]);
    doc.text(`${i + 1}. ${m.name}`, 18, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${m.date} — ${m.desc}`, 50, y);
    y += 8;
  });
  
  y += 5;
  
  y = addSection(doc, '6. Client Dependencies', y);
  addBulletList(doc, [
    `Content delivery deadline: ${data.clientContentDue || '[Date]'}`,
    `Brand assets deadline: ${data.clientAssetsDue || '[Date]'}`,
    `Content owner: ${data.contentOwner || 'TBD'}`,
    `Asset owner: ${data.assetOwner || 'TBD'}`,
    `Delays in client deliverables will extend the timeline accordingly`,
  ], y);
  y += 10;
  
  y = addSection(doc, '7. Revision Policy', y);
  addParagraph(doc, `This SOW includes ${data.revisionRounds || '3'} rounds of revisions at each major milestone. Additional revisions are billed at $${data.additionalRevisionRate || '75'}/hour.`, y);
  y += 5;
  addParagraph(doc, 'What counts as a revision: Changes to color, layout, typography, or content within approved designs.', y);
  y += 5;
  addParagraph(doc, 'What requires a change order: New pages, new features, structural changes, or new functionality.', y);
  y += 10;
  
  y = addSection(doc, '8. Approval Process', y);
  addBulletList(doc, [
    `Final approver: ${data.approverName || '[Name]'} (${data.approverRole || '[Role]'})`,
    'All major milestones require written approval',
    'Deemed approval: 5 business days after delivery with no feedback',
    'Revisions must be submitted in writing via email or project management tool',
  ], y);
  y += 15;
  
  y = addSection(doc, '9. Change Request Process', y);
  addParagraph(doc, 'Any requests outside this scope require:', y);
  addBulletList(doc, [
    'Written submission via email',
    'Impact estimation by Agency',
    'Written approval before work begins',
    'Additional fees based on hourly rate',
  ], y);
  
  addSignatureBlock(doc, y + 10, 'Client', 'Agency');
  
  addFooter(doc);
  
  doc.save(`scope-of-work-${(data.clientName || 'client').toLowerCase().replace(/\s+/g, '-')}.pdf`);
};

const previewContent = (data) => (
  <div className="bg-white rounded-lg p-6 text-sm font-sans">
    <div className="bg-gray-100 h-10 rounded flex items-center px-4 mb-4">
      <div className="w-3 h-3 rounded-full bg-red-400 mr-2" />
      <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2" />
      <div className="w-3 h-3 rounded-full bg-green-400" />
    </div>
    
    <h1 className="text-xl font-bold mb-1">Scope of Work</h1>
    <p className="text-gray-500 mb-4">{data.projectTitle || 'Project Title'}</p>
    
    <div className="space-y-4 text-xs">
      <div>
        <h2 className="font-bold text-red-500 mb-2">PAGES</h2>
        <p className="text-gray-600">{data.pagesIncluded || 'Homepage, About, Services...'}</p>
      </div>
      
      <div>
        <h2 className="font-bold text-red-500 mb-2">TIMELINE</h2>
        <div className="space-y-1">
          {data.kickoffDate && <p>Kickoff: {data.kickoffDate}</p>}
          {data.designDue && <p>Design: {data.designDue}</p>}
          {data.launchTarget && <p>Launch: {data.launchTarget}</p>}
        </div>
      </div>
      
      <div>
        <h2 className="font-bold text-red-500 mb-2">REVISIONS</h2>
        <p className="text-gray-600">{data.revisionRounds || '3'} rounds included</p>
        <p className="text-gray-500">${data.additionalRevisionRate || '75'}/hr for additional</p>
      </div>
    </div>
  </div>
);

const ScopeOfWorkTool = () => {
  return (
    <DocBuilder
      title="Scope of Work"
      description="Create a detailed project scope document with deliverables and timeline"
      fields={fields}
      defaultValues={defaultValues}
      onGenerate={generatePDF}
      previewContent={previewContent}
    />
  );
};

export default ScopeOfWorkTool;