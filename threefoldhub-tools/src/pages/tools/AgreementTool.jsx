import { jsPDF } from 'jspdf';
import DocBuilder from '../../components/tools/DocBuilder';
import { addHeader, addSection, addParagraph, addBulletList, addFooter, addSignatureBlock, checkAndAddPage, PAGE_HEIGHT, MARGIN, CONTENT_WIDTH } from '../../utils/pdfGenerator';

const defaultValues = {
  agencyName: 'ThreeFoldHub',
  clientName: '',
  clientCompany: '',
  projectDescription: '',
  totalFee: '',
  depositPercent: '50',
  paymentStages: 'deposit,design-approval,launch',
  revisionRounds: '3',
  killFeePercent: '30',
  governingState: 'Karnataka',
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
  { name: 'projectDescription', label: 'Project Description', type: 'textarea', rows: 4, required: true, placeholder: 'Describe the web design project...' },
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
  { name: 'governingState', label: 'Governing Jurisdiction', type: 'text', placeholder: 'e.g., Karnataka' },
];

const generatePDF = (data) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });
  
  const desc = data.projectDescription ? data.projectDescription.substring(0, 50) : 'Project';
  addHeader(doc, 'Web Design Services Agreement', desc + '...');
  
  let y = 50;
  
  y = addSection(doc, '1. Parties', y);
  y = addBulletList(doc, [
    'Agency: ' + (data.agencyName || 'ThreeFoldHub'),
    'Address: ' + (data.agencyAddress || 'Mumbai, Karnataka'),
    'Email: ' + (data.agencyEmail || 'hello@threefoldhub.in'),
    '',
    'Client: ' + (data.clientName || '[Client Name]'),
    'Company: ' + (data.clientCompany || '[Company Name]'),
    'Address: ' + (data.clientAddress || '[Address]'),
    'Email: ' + (data.clientEmail || '[Email]'),
  ], y);
  
  y += 5;
  y = checkAndAddPage(doc, y, 50);
  y = addSection(doc, '2. Project Overview', y);
  y = addParagraph(doc, data.projectDescription || 'This Agreement is for web design and development services.', y);
  const startInfo = 'Start Date: ' + (data.startDate || '[Start Date]') + ' | Duration: ' + (data.duration || 'TBD');
  y = addParagraph(doc, startInfo, y, 9);
  y += 5;
  
  y = checkAndAddPage(doc, y, 80);
  y = addSection(doc, '3. Scope of Services', y);
  const deliverables = [
    'Custom website design as per agreed specifications',
    'Responsive development for desktop, tablet, and mobile',
    'Basic SEO optimization',
    'Contact forms and essential functionality',
    'Final delivery of source code and credentials',
  ];
  y = addBulletList(doc, deliverables, y);
  y += 5;
  
  y = checkAndAddPage(doc, y, 50);
  y = addSection(doc, '4. Exclusions', y);
  const exclusions = [
    'Content writing and copywriting',
    'Stock photography (unless agreed upon)',
    'Custom illustrations or graphics',
    'Ongoing maintenance and hosting (unless specified)',
    'Third-party plugin costs',
  ];
  y = addBulletList(doc, exclusions, y);
  y += 5;
  
  y = checkAndAddPage(doc, y, 60);
  y = addSection(doc, '5. Fees and Payment Terms', y);
  const feeText = 'Total Project Fee: ' + (data.totalFee || '[Amount]');
  y = addParagraph(doc, feeText, y, 12);
  y += 3;
  y = addBulletList(doc, [
    'Deposit (' + (data.depositPercent || '50') + '%): Due upon signing',
    'Milestone Payment: Due upon design approval',
    'Final Payment: Due before website launch',
    'Late Payment: 1.5% interest per month',
    'Work will commence only after deposit is received',
  ], y);
  
  y = checkAndAddPage(doc, y, 50);
  y = addSection(doc, '6. Revisions', y);
  const revisionText = 'This agreement includes ' + (data.revisionRounds || '3') + ' rounds of revisions. Additional revisions will be charged at $75/hour.';
  y = addParagraph(doc, revisionText, y);
  y += 3;
  y = addParagraph(doc, 'Revisions are defined as changes to existing approved designs. New features require a separate change order.', y);
  
  y = checkAndAddPage(doc, y, 50);
  y = addSection(doc, '7. Intellectual Property', y);
  const ipTerms = [
    'Upon full payment, Client receives ownership of deliverables',
    'Designer retains ownership of design source files and tools',
    'Designer may display completed work in portfolio',
    'Client retains ownership of content and materials provided',
  ];
  y = addBulletList(doc, ipTerms, y);
  
  y = checkAndAddPage(doc, y, 40);
  y = addSection(doc, '8. Confidentiality', y);
  y = addParagraph(doc, 'Both parties agree to keep confidential any proprietary information, trade secrets, or business processes disclosed during this engagement.', y);
  
  y = checkAndAddPage(doc, y, 50);
  y = addSection(doc, '9. Termination', y);
  y = addBulletList(doc, [
    'Either party may terminate with 14 days written notice',
    'Client pays for work completed plus kill fee',
    'Kill Fee: ' + (data.killFeePercent || '30') + '% of remaining value',
    'Designer delivers completed work upon full payment',
  ], y);
  
  y = checkAndAddPage(doc, y, 40);
  y = addSection(doc, '10. Limitation of Liability', y);
  y = addParagraph(doc, "Designer's liability is limited to total fees paid. Designer is not liable for indirect, incidental, or consequential damages.", y);
  
  y = checkAndAddPage(doc, y, 50);
  y = addSection(doc, '11. Governing Law', y);
  const govText = 'This Agreement shall be governed by the laws of ' + (data.governingState || 'Karnataka') + '.';
  y = addParagraph(doc, govText, y);
  
  y += 15;
  y = checkAndAddPage(doc, y, 50);
  y = addSignatureBlock(doc, y, 'Client', 'Designer');
  
  addFooter(doc, 'ThreeFoldHub Services Agreement');
  
  const filename = 'agreement-' + (data.clientName || 'client').toLowerCase().replace(/\s+/g, '-') + '.pdf';
  doc.save(filename);
};

const previewContent = (data) => (
  <div className="p-4 text-xs leading-relaxed" style={{minWidth: '595px'}}>
    <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-red-500">
      <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white font-bold text-sm">
        TFH
      </div>
      <div>
        <h1 className="text-base font-bold">Web Design Services Agreement</h1>
        <p className="text-gray-500 text-xs">{data.projectDescription ? data.projectDescription.substring(0, 40) + '...' : 'Project'}</p>
      </div>
    </div>
    
    <div className="space-y-4">
      <section>
        <h2 className="text-red-500 font-bold text-xs mb-2">1. PARTIES</h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="font-semibold">Agency</p>
            <p>{data.agencyName || 'ThreeFoldHub'}</p>
            <p className="text-gray-500">{data.agencyEmail || 'hello@threefoldhub.in'}</p>
          </div>
          <div>
            <p className="font-semibold">Client</p>
            <p>{data.clientName || '[Client Name]'}</p>
            <p className="text-gray-500">{data.clientCompany || '[Company]'}</p>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-red-500 font-bold text-xs mb-2">2. FEES</h2>
        <p className="text-lg font-bold">Total: {data.totalFee || '$0'}</p>
        <p className="text-gray-500">Deposit: {data.depositPercent || '50'}%</p>
      </section>
      
      <section>
        <h2 className="text-red-500 font-bold text-xs mb-2">3. KEY TERMS</h2>
        <div className="grid grid-cols-2 gap-2 text-gray-700">
          <p>Revisions: {data.revisionRounds || '3'} rounds</p>
          <p>Kill Fee: {data.killFeePercent || '30'}%</p>
          <p>Start: {data.startDate || '[Date]'}</p>
          <p>Duration: {data.duration || 'TBD'}</p>
        </div>
      </section>
      
      <section>
        <h2 className="text-red-500 font-bold text-xs mb-2">4. SCOPE</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Custom website design</li>
          <li>Responsive development</li>
          <li>Basic SEO optimization</li>
          <li>Contact forms</li>
        </ul>
      </section>
      
      <section>
        <h2 className="text-red-500 font-bold text-xs mb-2">5. SIGNATURES</h2>
        <div className="grid grid-cols-2 gap-8 mt-4 pt-4 border-t">
          <div>
            <div className="border-b border-gray-300 w-32 mb-2"></div>
            <p className="text-gray-500 text-xs">Client Signature</p>
            <p className="text-gray-500 text-xs">Date: ___________</p>
          </div>
          <div>
            <div className="border-b border-gray-300 w-32 mb-2"></div>
            <p className="text-gray-500 text-xs">Agency Signature</p>
            <p className="text-gray-500 text-xs">Date: ___________</p>
          </div>
        </div>
      </section>
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