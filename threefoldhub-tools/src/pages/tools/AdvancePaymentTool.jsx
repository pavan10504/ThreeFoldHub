import { jsPDF } from 'jspdf';
import DocBuilder from '../../components/tools/DocBuilder';
import { addHeader, addSection, addParagraph, addBulletList, addFooter, addSignatureBlock } from '../../utils/pdfGenerator';

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
  governingState: 'Maharashtra',
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
  { name: 'governingState', label: 'Governing Jurisdiction', type: 'text', placeholder: 'e.g., Maharashtra, India' },
];

const generatePDF = (data) => {
  const doc = new jsPDF();
  
  addHeader(doc, 'Advance Payment Policy', `${data.projectName || 'Project'} Payment Terms`);
  
  let y = 50;
  
  y = addSection(doc, 'Policy Overview', y);
  y = addParagraph(doc, `This Advance Payment Policy outlines the payment terms for the web design project "${data.projectName || '[Project Name]'}" between ${data.agencyName || 'Agency'} ("Designer") and ${data.clientName || '[Client Name]'} ("Client").`, y);
  y += 5;
  
  y = addSection(doc, '1. Payment Structure', y);
  addParagraph(doc, 'All projects require advance payment before work commences. This policy ensures both parties are committed to the project and protects against non-payment risks.', y);
  y += 10;
  
  const milestones = [
    { name: 'Project Deposit', percent: data.depositPercent || '50', desc: 'Due upon signing the agreement. Reserves Designer\'s time and covers initial setup costs.' },
    { name: data.milestone1Label || 'Milestone 1', percent: data.milestone1Percent || '25', desc: 'Due upon completion of this milestone.' },
    { name: data.milestone2Label || 'Milestone 2', percent: data.milestone2Percent || '25', desc: 'Due upon completion of this milestone.' },
    { name: 'Final Payment', percent: 'Remaining Balance', desc: 'Due before website launch and file delivery.' },
  ].filter(m => m.percent !== '0');
  
  milestones.forEach((m, i) => {
    addBulletList(doc, [`${i + 1}. ${m.name} (${m.percent}%) - ${m.desc}`], y);
    y += 10;
  });
  
  y += 5;
  
  y = addSection(doc, '2. Non-Refundable Deposits', y);
  if (data.nonRefundable === 'true') {
    addParagraph(doc, 'All deposits paid under this agreement are non-refundable. This policy exists because:', y);
    const reasons = [
      'The deposit reserves dedicated time on Designer\'s calendar',
      'Initial research and planning begins immediately upon receipt',
      'Resources and tools are allocated exclusively for this project',
      'Opportunity cost of declined work is absorbed by Designer',
    ];
    addBulletList(doc, reasons, y);
  } else {
    addParagraph(doc, 'Deposits may be refunded under specific circumstances as outlined in the termination clause of the main agreement.', y);
  }
  y += 10;
  
  y = addSection(doc, '3. Late Payment Fees', y);
  addParagraph(doc, `Payment is due within ${data.lateFeeGrace || '14'} days of invoice. Payments not received within this period will incur a late fee of ${data.lateFeePercent || '1.5'}% per month on the outstanding balance.`, y);
  y += 8;
  
  addBulletList(doc, [
    'Late fees compound monthly until full payment is received',
    'Client is responsible for any collection costs, including legal fees',
    'Late payment indicates project abandonment and may trigger termination',
  ], y);
  y += 15;
  
  y = addSection(doc, '4. Work Suspension', y);
  addParagraph(doc, `If payment is ${data.workStopDays || '7'} or more days overdue, Designer reserves the right to suspend all work on the project. Work will resume only after:', y);
  addBulletList(doc, [
    'Full payment of all outstanding invoices',
    'Payment of any applicable late fees',
    'Written confirmation from Client of intent to continue',
  ], y);
  y += 10;
  addParagraph(doc, 'Suspended work deadlines will be extended by the duration of the suspension period.', y);
  y += 10;
  
  y = addSection(doc, '5. Payment Methods', y);
  addBulletList(doc, [
    'Bank Transfer (Preferred)',
    'UPI Payments (for Indian clients)',
    'Credit/Debit Cards (via payment link with processing fee)',
    'PayPal (for international clients)',
  ], y);
  y += 15;
  
  y = addSection(doc, '6. Invoice Terms', y);
  addBulletList(doc, [
    'Invoices will be sent electronically to the registered email address',
    'Payment is due upon receipt unless otherwise specified',
    'All invoices include 30-day payment terms by default',
    'Retain proof of payment for your records',
  ], y);
  y += 15;
  
  y = addSection(doc, '7. Governing Terms', y);
  addParagraph(doc, `This policy is subject to the laws of ${data.governingState || 'Maharashtra, India'}. Failure to comply with payment terms may result in project termination and legal action.`, y);
  
  addSignatureBlock(doc, y + 10, 'Client Acknowledgment', 'Agency');
  
  addFooter(doc);
  
  doc.save(`advance-payment-policy-${(data.clientName || 'client').toLowerCase().replace(/\s+/g, '-')}.pdf`);
};

const previewContent = (data) => (
  <div className="bg-white rounded-lg p-6 text-sm font-sans">
    <div className="bg-gray-100 h-10 rounded flex items-center px-4 mb-4">
      <div className="w-3 h-3 rounded-full bg-red-400 mr-2" />
      <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2" />
      <div className="w-3 h-3 rounded-full bg-green-400" />
    </div>
    
    <h1 className="text-xl font-bold mb-1">Advance Payment Policy</h1>
    <p className="text-gray-500 mb-4">{data.projectName || 'Project'}</p>
    
    <div className="space-y-4 text-xs">
      <div>
        <h2 className="font-bold text-red-500 mb-2">PAYMENT STRUCTURE</h2>
        <div className="space-y-1">
          <div className="flex justify-between bg-gray-50 p-2 rounded">
            <span>Deposit</span>
            <span className="font-bold">{data.depositPercent || '50'}%</span>
          </div>
          <div className="flex justify-between p-2 rounded">
            <span>{data.milestone1Label || 'Milestone 1'}</span>
            <span className="font-bold">{data.milestone1Percent || '25'}%</span>
          </div>
          <div className="flex justify-between bg-gray-50 p-2 rounded">
            <span>{data.milestone2Label || 'Milestone 2'}</span>
            <span className="font-bold">{data.milestone2Percent || '25'}%</span>
          </div>
          <div className="flex justify-between p-2 rounded">
            <span>Final</span>
            <span className="font-bold">Balance</span>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="font-bold text-red-500 mb-2">KEY TERMS</h2>
        <p className="text-gray-600">Late Fee: {data.lateFeePercent || '1.5'}%/month</p>
        <p className="text-gray-600">Grace Period: {data.lateFeeGrace || '14'} days</p>
        <p className="text-gray-600">Deposits: {data.nonRefundable === 'true' ? 'Non-refundable' : 'Refundable'}</p>
      </div>
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