import { jsPDF } from 'jspdf';
import DocBuilder from '../../components/tools/DocBuilder';
import { addHeader, addSection, addParagraph, addBulletList, addFooter, addSignatureBlock } from '../../utils/pdfGenerator';

const defaultValues = {
  agencyName: 'ThreeFoldHub',
  agencyAddress: 'Mumbai, Maharashtra, India',
  agencyEmail: 'hello@threefoldhub.in',
  clientName: '',
  clientCompany: '',
  clientAddress: '',
  clientEmail: '',
  projectDescription: '',
  totalFee: '',
  depositPercent: '50',
  paymentStages: 'deposit,design-approval,launch',
  revisionRounds: '3',
  killFeePercent: '30',
  governingState: 'Maharashtra',
  startDate: '',
  duration: '',
};

const fields = [
  { name: 'agencyName', label: 'Agency Name', type: 'text', required: true },
  { name: 'agencyAddress', label: 'Agency Address', type: 'text' },
  { name: 'agencyEmail', label: 'Agency Email', type: 'email' },
  { name: 'clientName', label: 'Client Full Name', type: 'text', required: true },
  { name: 'clientCompany', label: 'Client Company Name', type: 'text', required: true },
  { name: 'clientAddress', label: 'Client Address', type: 'text' },
  { name: 'clientEmail', label: 'Client Email', type: 'email', required: true },
  { name: 'projectDescription', label: 'Project Description', type: 'textarea', rows: 4, required: true, placeholder: 'Describe the web design project, deliverables, and goals...' },
  { name: 'totalFee', label: 'Total Project Fee', type: 'text', required: true, placeholder: 'e.g., $5,000' },
  { name: 'depositPercent', label: 'Deposit Percentage', type: 'select', options: [
    { value: '30', label: '30%' },
    { value: '40', label: '40%' },
    { value: '50', label: '50%' },
  ]},
  { name: 'startDate', label: 'Project Start Date', type: 'date', required: true },
  { name: 'duration', label: 'Project Duration', type: 'text', placeholder: 'e.g., 6-8 weeks' },
  { name: 'revisionRounds', label: 'Included Revision Rounds', type: 'select', options: [
    { value: '2', label: '2 rounds' },
    { value: '3', label: '3 rounds' },
    { value: '4', label: '4 rounds' },
  ]},
  { name: 'killFeePercent', label: 'Kill Fee Percentage', type: 'select', options: [
    { value: '25', label: '25%' },
    { value: '30', label: '30%' },
    { value: '50', label: '50%' },
  ]},
  { name: 'governingState', label: 'Governing Jurisdiction', type: 'text', placeholder: 'e.g., Maharashtra, India' },
];

const generatePDF = (data) => {
  const doc = new jsPDF();
  
  addHeader(doc, 'Web Design Services Agreement', `${data.projectDescription?.substring(0, 50) || 'Project'}...`);
  
  let y = 50;
  
  y = addSection(doc, '1. Parties', y);
  addBulletList(doc, [
    `Agency: ${data.agencyName || 'ThreeFoldHub'} ("Designer")`,
    `Address: ${data.agencyAddress || 'Mumbai, Maharashtra, India'}`,
    `Email: ${data.agencyEmail || 'hello@threefoldhub.in'}`,
    '',
    `Client: ${data.clientName || '[Client Name]'}`,
    `Company: ${data.clientCompany || '[Company Name]'}`,
    `Address: ${data.clientAddress || '[Address]'}`,
    `Email: ${data.clientEmail || '[Email]'}`,
  ], y);
  y += 15;
  
  y = addSection(doc, '2. Project Overview', y);
  y = addParagraph(doc, data.projectDescription || 'This Agreement is for web design and development services as discussed between the parties.', y);
  y = addParagraph(doc, `Start Date: ${data.startDate || '[Start Date]'} | Duration: ${data.duration || 'TBD'}`, y, 9);
  y += 5;
  
  y = addSection(doc, '3. Scope of Services', y);
  const deliverables = [
    'Custom website design as per agreed specifications',
    'Responsive development for desktop, tablet, and mobile',
    'Basic SEO optimization',
    'Contact forms and essential functionality',
    'Final delivery of source code and credentials',
  ];
  addBulletList(doc, deliverables, y);
  y += 15;
  
  y = addSection(doc, '4. Exclusions', y);
  const exclusions = [
    'Content writing and copywriting',
    'Stock photography (unless agreed upon)',
    'Custom illustrations or graphics',
    'Ongoing maintenance and hosting (unless specified)',
    'Third-party plugin costs',
  ];
  addBulletList(doc, exclusions, y);
  y += 15;
  
  y = addSection(doc, '5. Fees and Payment Terms', y);
  addParagraph(doc, `Total Project Fee: ${data.totalFee || '[Amount]'}`, y, 12);
  y += 8;
  addBulletList(doc, [
    `Deposit (${data.depositPercent || '50'}%): Due upon signing this agreement`,
    'Milestone Payment: Due upon design approval',
    'Final Payment: Due before website launch',
    'Late Payment: 1.5% interest per month on overdue balances',
    'Work will commence only after deposit is received',
  ], y);
  y += 15;
  
  y = addSection(doc, '6. Revisions', y);
  addParagraph(doc, `This agreement includes ${data.revisionRounds || '3'} rounds of revisions at each major milestone. Additional revisions will be charged at the standard hourly rate of $75/hour.`, y);
  y += 10;
  addParagraph(doc, 'Revisions are defined as changes to existing approved designs. New features or significant scope changes require a separate change order.', y);
  y += 10;
  
  y = addSection(doc, '7. Intellectual Property', y);
  const ipTerms = [
    'Upon full payment, Client receives ownership of final website deliverables',
    'Designer retains ownership of design source files, frameworks, and tools',
    'Designer may display completed work in portfolio unless agreed otherwise',
    'Client retains ownership of all content, images, and materials provided',
  ];
  addBulletList(doc, ipTerms, y);
  y += 15;
  
  y = addSection(doc, '8. Confidentiality', y);
  addParagraph(doc, 'Both parties agree to keep confidential any proprietary information, trade secrets, or business processes disclosed during this engagement. This obligation survives termination of this Agreement.', y);
  y += 10;
  
  y = addSection(doc, '9. Termination', y);
  const terminationTerms = [
    'Either party may terminate with 14 days written notice',
    'Upon termination, Client pays for all work completed plus applicable kill fee',
    `Kill Fee: ${data.killFeePercent || '30'}% of remaining project value`,
    'Designer delivers all completed work upon full payment',
  ];
  addBulletList(doc, terminationTerms, y);
  y += 15;
  
  y = addSection(doc, '10. Limitation of Liability', y);
  addParagraph(doc, "Designer's liability is limited to the total fees paid under this Agreement. Designer is not liable for indirect, incidental, or consequential damages.", y);
  y += 10;
  
  y = addSection(doc, '11. Governing Law', y);
  addParagraph(doc, `This Agreement shall be governed by the laws of ${data.governingState || 'Maharashtra, India'}. Any disputes shall be resolved through mediation before legal action.`, y);
  y += 15;
  
  addSignatureBlock(doc, y, 'Client', 'Designer');
  
  addFooter(doc);
  
  doc.save(`agreement-${(data.clientName || 'client').toLowerCase().replace(/\s+/g, '-')}.pdf`);
};

const previewContent = (data) => (
  <div className="bg-white rounded-lg p-6 text-sm font-sans">
    <div className="bg-gray-100 h-10 rounded flex items-center px-4 mb-4">
      <div className="w-3 h-3 rounded-full bg-red-400 mr-2" />
      <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2" />
      <div className="w-3 h-3 rounded-full bg-green-400" />
    </div>
    
    <h1 className="text-xl font-bold mb-1">Web Design Agreement</h1>
    <p className="text-gray-500 mb-4">Between {data.agencyName || 'Agency'} & {data.clientName || '[Client]'}</p>
    
    <div className="text-xs space-y-3">
      <div>
        <h2 className="font-bold text-red-500">1. PARTIES</h2>
        <p className="text-gray-600">Designer: {data.agencyName || 'Agency'}</p>
        <p className="text-gray-600">Client: {data.clientName || '[Client]'}</p>
      </div>
      
      <div>
        <h2 className="font-bold text-red-500">2. PROJECT FEE</h2>
        <p className="text-gray-600 text-lg font-bold">{data.totalFee || '$0'}</p>
        <p className="text-gray-500">Deposit: {data.depositPercent || '50'}%</p>
      </div>
      
      <div>
        <h2 className="font-bold text-red-500">3. KEY TERMS</h2>
        <p className="text-gray-600">Revisions: {data.revisionRounds || '3'} rounds</p>
        <p className="text-gray-600">Kill Fee: {data.killFeePercent || '30'}%</p>
      </div>
      
      <div className="pt-4 border-t">
        <div className="flex justify-between text-gray-400">
          <span>Client Signature</span>
          <span>Date</span>
        </div>
      </div>
    </div>
  </div>
);

const AgreementTool = () => {
  return (
    <DocBuilder
      title="Basic Services Agreement"
      description="Generate a comprehensive web design services contract"
      fields={fields}
      defaultValues={defaultValues}
      onGenerate={generatePDF}
      previewContent={previewContent}
    />
  );
};

export default AgreementTool;