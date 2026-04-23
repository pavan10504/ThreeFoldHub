import { jsPDF } from 'jspdf';
import DocBuilder from '../../components/tools/DocBuilder';
import { addHeader, addSection, addParagraph, addBulletList, addFooter, addSignatureBlock } from '../../utils/pdfGenerator';

const defaultValues = {
  agencyName: 'ThreeFoldHub',
  clientName: '',
  projectName: '',
  deliveryIncludes: 'source-code,design-files,credentials,documentation,training',
  sourceCodeIncluded: true,
  designFilesIncluded: false,
  designFilesNote: 'Available separately for $500',
  credentialsDoc: true,
  documentation: true,
  training: true,
  supportDays: '30',
  whatsNotIncluded: 'figma-source,stock-images,third-party-licenses',
  hostingSupport: false,
  deliveryMethod: 'google-drive',
  deliveryTiming: 'Upon full payment',
  gatedDelivery: true,
  governingState: 'Maharashtra',
};

const fields = [
  { name: 'agencyName', label: 'Agency Name', type: 'text', required: true },
  { name: 'clientName', label: 'Client Name', type: 'text', required: true },
  { name: 'projectName', label: 'Project Name', type: 'text', required: true },
  { name: 'supportDays', label: 'Support Period (days)', type: 'number', min: 0, placeholder: '30' },
  { name: 'deliveryMethod', label: 'Delivery Method', type: 'select', options: [
    { value: 'google-drive', label: 'Google Drive' },
    { value: 'dropbox', label: 'Dropbox' },
    { value: 'github', label: 'GitHub Repository' },
    { value: 'zip-link', label: 'Secure Download Link' },
  ]},
  { name: 'deliveryTiming', label: 'Delivery Timing', type: 'text', placeholder: 'Upon full payment' },
  { name: 'gatedDelivery', label: 'Gate Delivery Behind Payment', type: 'select', options: [
    { value: 'true', label: 'Yes - Release after final payment' },
    { value: 'false', label: 'No - Deliver as completed' },
  ]},
  { name: 'sourceCodeIncluded', label: 'Source Code Included', type: 'select', options: [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No (add note below)' },
  ]},
  { name: 'designFilesIncluded', label: 'Design Files (Figma/PSD) Included', type: 'select', options: [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No (available separately)' },
  ]},
  { name: 'designFilesNote', label: 'Design Files Note', type: 'text', placeholder: 'Available separately for $500' },
  { name: 'credentialsDoc', label: 'Credentials Document Included', type: 'select', options: [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' },
  ]},
  { name: 'documentation', label: 'Documentation Included', type: 'select', options: [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' },
  ]},
  { name: 'training', label: 'Training Session Included', type: 'select', options: [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' },
  ]},
  { name: 'hostingSupport', label: 'Hosting Setup Support', type: 'select', options: [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' },
  ]},
  { name: 'governingState', label: 'Governing Jurisdiction', type: 'text', placeholder: 'Maharashtra, India' },
];

const generatePDF = (data) => {
  const doc = new jsPDF();
  
  addHeader(doc, 'File Delivery Policy', `${data.projectName || 'Project'} Deliverables`);
  
  let y = 50;
  
  y = addSection(doc, 'Policy Overview', y);
  y = addParagraph(doc, `This File Delivery Policy outlines what deliverables the Client will receive upon project completion and how they will be delivered. This ensures both parties have clear expectations about the final project handoff.`, y);
  y += 5;
  
  y = addSection(doc, '1. Included Deliverables', y);
  addParagraph(doc, 'Upon successful project completion and receipt of final payment, the Client will receive:', y);
  y += 8;
  
  const deliverables = [];
  
  if (data.sourceCodeIncluded === 'true') {
    deliverables.push('Final website source code (HTML, CSS, JS, or framework files)');
  }
  
  if (data.designFilesIncluded === 'true') {
    deliverables.push('Design source files (Figma/Sketch/PSD as applicable)');
  } else if (data.designFilesNote) {
    deliverables.push(`Design source files: ${data.designFilesNote}`);
  }
  
  if (data.credentialsDoc === 'true') {
    deliverables.push('Complete credentials document with all access details');
  }
  
  if (data.documentation === 'true') {
    deliverables.push('Technical documentation and user guides');
  }
  
  if (data.training === 'true') {
    deliverables.push('30-minute training session (video call) for CMS usage');
  }
  
  deliverables.push('Final deployed website files');
  deliverables.push('Any custom graphics or assets created for this project');
  deliverables.push('Domain transfer documentation (if applicable)');
  
  addBulletList(doc, deliverables, y);
  y += 10;
  
  if (data.hostingSupport === 'true') {
    addBulletList(doc, ['Hosting account setup and configuration', 'SSL certificate installation', 'DNS configuration assistance'], y);
    y += 10;
  }
  
  y = addSection(doc, '2. Excluded Items', y);
  addParagraph(doc, 'The following items are NOT included unless specifically agreed upon:', y);
  
  const exclusions = [
    'Figma/Sketch/PSD source files (unless purchased separately)',
    'Stock photography and images (client receives usage license only)',
    'Third-party plugin licenses (annual renewals are client responsibility)',
    'Content writing and copywriting',
    'Ongoing hosting fees',
    'Custom illustrations or graphics not created during this project',
  ];
  
  addBulletList(doc, exclusions, y);
  y += 10;
  
  y = addSection(doc, '3. Delivery Method', y);
  addParagraph(doc, `Deliverables will be provided via: ${data.deliveryMethod?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'secure download link'}`, y);
  y += 5;
  
  addBulletList(doc, [
    'Files will be organized in a clear folder structure',
    'A README file will guide Client through the contents',
    'Large files may be split into multiple archives',
    'Credentials and sensitive information will be provided separately',
  ], y);
  y += 10;
  
  y = addSection(doc, '4. Delivery Timing', y);
  addParagraph(doc, `Files will be delivered: ${data.deliveryTiming || 'Upon receipt of final payment'}`, y);
  y += 5;
  
  if (data.gatedDelivery === 'true') {
    addParagraph(doc, 'IMPORTANT: File delivery is gated behind final payment. Source code, design files, and credentials will only be released after the final invoice has been paid in full. This protects both parties and ensures smooth project completion.', y);
    y += 5;
  }
  
  addBulletList(doc, [
    'File delivery typically occurs within 2-3 business days of payment',
    'For complex projects, delivery may take up to 5 business days',
    'Rush delivery (within 24 hours) available for $150 fee',
  ], y);
  y += 10;
  
  y = addSection(doc, '5. Post-Launch Support', y);
  addParagraph(doc, `The Agency provides ${data.supportDays || '30'} days of complimentary support following website launch. This includes:`, y);
  
  addBulletList(doc, [
    'Bug fixes for issues not present in the approved staging version',
    'Basic technical assistance via email',
    'Answer questions about using the CMS',
  ], y);
  y += 5;
  
  addParagraph(doc, 'Not covered under support:', y);
  addBulletList(doc, [
    'New features or functionality',
    'Design changes or revisions',
    'Content updates',
    'Hosting-related issues',
    'Third-party integration problems',
  ], y);
  y += 5;
  
  addParagraph(doc, 'Extended support packages available at $150/month.', y);
  y += 10;
  
  y = addSection(doc, '6. Credentials Handling', y);
  addParagraph(doc, 'All credentials and access details will be provided in a secure, encrypted document. The Client should:', y);
  addBulletList(doc, [
    'Change all passwords immediately upon receipt',
    'Store credentials in a secure password manager',
    'Restrict access to authorized team members only',
    'Notify Agency of any security concerns',
  ], y);
  y += 10;
  
  y = addSection(doc, '7. Handoff Checklist', y);
  addParagraph(doc, 'Final project handoff includes verification of:', y);
  
  const checklist = [
    'Website live and functioning correctly',
    'All pages and features working as specified',
    'Mobile responsiveness verified',
    'SEO settings configured',
    'Forms connected and tested',
    'Credentials document delivered',
    'Training session completed (if applicable)',
    'Client sign-off on final delivery',
  ];
  
  addBulletList(doc, checklist, y);
  y += 15;
  
  y = addSection(doc, '8. Governing Terms', y);
  addParagraph(doc, `This File Delivery Policy is part of the overall project agreement and is governed by the laws of ${data.governingState || 'Maharashtra, India'}.`, y);
  
  addSignatureBlock(doc, y + 10, 'Client', 'Agency');
  
  addFooter(doc);
  
  doc.save(`file-delivery-policy-${(data.clientName || 'client').toLowerCase().replace(/\s+/g, '-')}.pdf`);
};

const previewContent = (data) => (
  <div className="bg-white rounded-lg p-6 text-sm font-sans">
    <div className="bg-gray-100 h-10 rounded flex items-center px-4 mb-4">
      <div className="w-3 h-3 rounded-full bg-red-400 mr-2" />
      <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2" />
      <div className="w-3 h-3 rounded-full bg-green-400" />
    </div>
    
    <h1 className="text-xl font-bold mb-1">File Delivery Policy</h1>
    <p className="text-gray-500 mb-4">{data.projectName || 'Project'}</p>
    
    <div className="space-y-4 text-xs">
      <div>
        <h2 className="font-bold text-red-500 mb-2">INCLUDED</h2>
        <div className="space-y-1 text-gray-600">
          {data.sourceCodeIncluded === 'true' && <p>• Source Code</p>}
          {data.credentialsDoc === 'true' && <p>• Credentials Document</p>}
          {data.documentation === 'true' && <p>• Documentation</p>}
          {data.training === 'true' && <p>• Training Session</p>}
          <p>• Final Website Files</p>
        </div>
      </div>
      
      <div>
        <h2 className="font-bold text-red-500 mb-2">EXCLUDED</h2>
        <div className="space-y-1 text-gray-600">
          <p>• Figma/PSD Source Files</p>
          <p>• Stock Images</p>
          <p>• Third-party Licenses</p>
        </div>
      </div>
      
      <div>
        <h2 className="font-bold text-red-500 mb-2">DELIVERY</h2>
        <p className="text-gray-600">Method: {data.deliveryMethod?.replace('-', ' ') || 'Secure Link'}</p>
        <p className="text-gray-600">Timing: {data.deliveryTiming || 'Upon payment'}</p>
        <p className="text-gray-600">Gated: {data.gatedDelivery === 'true' ? 'Yes' : 'No'}</p>
      </div>
      
      <div>
        <h2 className="font-bold text-red-500 mb-2">SUPPORT</h2>
        <p className="text-gray-600">{data.supportDays || '30'} days complimentary</p>
      </div>
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