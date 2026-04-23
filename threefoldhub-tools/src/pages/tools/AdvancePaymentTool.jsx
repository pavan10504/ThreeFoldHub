import { jsPDF } from 'jspdf';
import DocBuilder from '../../components/tools/DocBuilder';
import { addHeader, addSection, addParagraph, addBulletList, addFooter, checkAndAddPage, addSignatureBlock } from '../../utils/pdfGenerator';

const defaultValues = {
  agencyName: 'ThreeFoldHub',
  clientName: '',
  projectName: '',
  depositPercent: '50',
  milestone1Label: 'Design Approval',
  milestone1Percent: '25',
  milestone2Label: 'Development Complete',
  milestone2Percent: '25',
  lateFeePercent: '1.5',
  lateFeeGrace: '14',
  workStopDays: '7',
  nonRefundable: true,
  governingState: 'Karnataka',
};

const fields = [
  { name: 'agencyName', label: 'Agency Name', type: 'text', required: true },
  { name: 'clientName', label: 'Client Name', type: 'text', required: true },
  { name: 'projectName', label: 'Project Name', type: 'text', required: true },
  { name: 'depositPercent', label: 'Initial Deposit Percentage', type: 'select', options: [
    { value: '30', label: '30%' },
    { value: '40', label: '40%' },
    { value: '50', label: '50%' },
    { value: '100', label: '100% (Full Payment)' },
  ]},
  { name: 'milestone1Label', label: 'Milestone 1 Name', type: 'text', placeholder: 'e.g., Design Approval' },
  { name: 'milestone1Percent', label: 'Milestone 1 Percentage', type: 'number', min: 0, max: 100 },
  { name: 'milestone2Label', label: 'Milestone 2 Name', type: 'text', placeholder: 'e.g., Development Complete' },
  { name: 'milestone2Percent', label: 'Milestone 2 Percentage', type: 'number', min: 0, max: 100 },
  { name: 'lateFeePercent', label: 'Late Fee Percentage (per month)', type: 'number', min: 0, max: 10, step: 0.1 },
  { name: 'lateFeeGrace', label: 'Grace Period (days)', type: 'number', min: 0, placeholder: '14' },
  { name: 'workStopDays', label: 'Work Stop Threshold (days overdue)', type: 'number', min: 1 },
  { name: 'nonRefundable', label: 'Deposits Non-Refundable', type: 'select', options: [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' },
  ]},
  { name: 'governingState', label: 'Governing Jurisdiction', type: 'text', placeholder: 'e.g., Karnataka' },
];

const generatePDF = (data) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });
  
  const projectTitle = data.projectName || 'Project Payment Terms';
  addHeader(doc, 'Advance Payment Policy', projectTitle);
  
  let y = 50;
  
  y = addSection(doc, 'Policy Overview', y);
  const policyIntro = 'This Advance Payment Policy outlines the payment terms for the web design project "' + (data.projectName || 'Project') + '" between ' + (data.agencyName || 'Agency') + ' and ' + (data.clientName || 'Client') + '.';
  y = addParagraph(doc, policyIntro, y);
  y += 5;
  
  y = checkAndAddPage(doc, y, 80);
  y = addSection(doc, '1. Payment Structure', y);
  y = addParagraph(doc, 'All projects require advance payment before work commences.', y);
  y += 8;
  
  const milestones = [
    { name: 'Project Deposit', percent: data.depositPercent || '50', desc: 'Due upon signing. Reserves Designer time.' },
    { name: data.milestone1Label || 'Milestone 1', percent: data.milestone1Percent || '25', desc: 'Due upon completion.' },
    { name: data.milestone2Label || 'Milestone 2', percent: data.milestone2Percent || '25', desc: 'Due upon completion.' },
    { name: 'Final Payment', percent: 'Remaining', desc: 'Due before launch.' },
  ].filter(m => m.percent !== '0' && m.percent !== '');
  
  milestones.forEach((m, i) => {
    y = addBulletList(doc, [(i + 1) + '. ' + m.name + ' (' + m.percent + '%)'], y);
  });
  
  y += 5;
  y = checkAndAddPage(doc, y, 60);
  y = addSection(doc, '2. Non-Refundable Deposits', y);
  if (data.nonRefundable === 'true') {
    y = addParagraph(doc, 'All deposits are non-refundable because:', y);
    const reasons = [
      'The deposit reserves dedicated time on Designer calendar',
      'Initial research and planning begins immediately',
      'Resources are allocated exclusively for this project',
      'Opportunity cost of declined work is absorbed',
    ];
    y = addBulletList(doc, reasons, y);
  } else {
    y = addParagraph(doc, 'Deposits may be refunded under specific circumstances.', y);
  }
  
  y = checkAndAddPage(doc, y, 50);
  y = addSection(doc, '3. Late Payment Fees', y);
  const lateFeeText = 'Payment is due within ' + (data.lateFeeGrace || '14') + ' days. Late fee: ' + (data.lateFeePercent || '1.5') + '% per month.';
  y = addParagraph(doc, lateFeeText, y);
  y = addBulletList(doc, [
    'Late fees compound monthly',
    'Client responsible for collection costs',
    'May trigger project termination',
  ], y);
  
  y = checkAndAddPage(doc, y, 50);
  y = addSection(doc, '4. Work Suspension', y);
  const suspensionText = 'If payment is ' + (data.workStopDays || '7') + '+ days overdue, Designer may suspend all work.';
  y = addParagraph(doc, suspensionText, y);
  y = addBulletList(doc, [
    'Full payment of outstanding invoices required',
    'Payment of late fees',
    'Written confirmation to continue',
  ], y);
  
  y = checkAndAddPage(doc, y, 60);
  y = addSection(doc, '5. Payment Methods', y);
  y = addBulletList(doc, [
    'Bank Transfer (Preferred)',
    'UPI Payments (for Indian clients)',
    'Credit/Debit Cards (with processing fee)',
    'PayPal (for international)',
  ], y);
  
  y = checkAndAddPage(doc, y, 50);
  y = addSection(doc, '6. Governing Terms', y);
  const govText = 'This policy is subject to the laws of ' + (data.governingState || 'Karnataka') + '.';
  y = addParagraph(doc, govText, y);
  
  y += 10;
  y = checkAndAddPage(doc, y, 50);
  y = addSignatureBlock(doc, y, 'Client Acknowledgment', 'Agency');
  
  addFooter(doc, 'ThreeFoldHub Payment Policy');
  
  const filename = 'advance-payment-policy-' + (data.clientName || 'client').toLowerCase().replace(/\s+/g, '-') + '.pdf';
  doc.save(filename);
};

const previewContent = (data) => (
  <div className="p-4 text-xs leading-relaxed" style={{minWidth: '595px'}}>
    <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-red-500">
      <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white font-bold text-sm">TFH</div>
      <div>
        <h1 className="text-base font-bold">Advance Payment Policy</h1>
        <p className="text-gray-500 text-xs">{data.projectName || 'Project'}</p>
      </div>
    </div>
    
    <div className="space-y-4">
      <section>
        <h2 className="text-red-500 font-bold text-xs mb-2">PAYMENT STRUCTURE</h2>
        <div className="bg-gray-50 rounded p-3 space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Deposit</span>
            <span className="font-bold">{data.depositPercent || '50'}%</span>
          </div>
          <div className="flex justify-between">
            <span>{data.milestone1Label || 'Milestone 1'}</span>
            <span className="font-bold">{data.milestone1Percent || '25'}%</span>
          </div>
          <div className="flex justify-between">
            <span>{data.milestone2Label || 'Milestone 2'}</span>
            <span className="font-bold">{data.milestone2Percent || '25'}%</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="font-medium">Final</span>
            <span className="font-bold">Balance</span>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-red-500 font-bold text-xs mb-2">KEY TERMS</h2>
        <div className="grid grid-cols-2 gap-2 text-gray-700">
          <p>Late Fee: <span className="text-gray-500">{data.lateFeePercent || '1.5'}%/mo</span></p>
          <p>Grace: <span className="text-gray-500">{data.lateFeeGrace || '14'} days</span></p>
          <p>Work Stops: <span className="text-gray-500">{data.workStopDays || '7'} days</span></p>
          <p>Deposits: <span className="text-gray-500">{data.nonRefundable === 'true' ? 'Non-ref' : 'Ref'}'d</span></p>
        </div>
      </section>
      
      <section>
        <h2 className="text-red-500 font-bold text-xs mb-2">PAYMENT METHODS</h2>
        <div className="flex flex-wrap gap-2">
          <span className="bg-gray-100 px-2 py-1 rounded text-xs">Bank Transfer</span>
          <span className="bg-gray-100 px-2 py-1 rounded text-xs">UPI</span>
          <span className="bg-gray-100 px-2 py-1 rounded text-xs">PayPal</span>
        </div>
      </section>
    </div>
  </div>
);

const AdvancePaymentTool = () => {
  return (
    <DocBuilder
      title="Advance Payment Policy"
      description="Generate a payment terms document outlining deposits and late fees"
      fields={fields}
      defaultValues={defaultValues}
      onGenerate={generatePDF}
      previewContent={previewContent}
    />
  );
};

export default AdvancePaymentTool;