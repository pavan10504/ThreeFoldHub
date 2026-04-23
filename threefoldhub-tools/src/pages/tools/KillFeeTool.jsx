import { jsPDF } from 'jspdf';
import DocBuilder from '../../components/tools/DocBuilder';
import { addHeader, addSection, addParagraph, addBulletList, addFooter, addSignatureBlock } from '../../utils/pdfGenerator';

const defaultValues = {
  agencyName: 'ThreeFoldHub',
  clientName: '',
  projectName: '',
  noticeDays: '14',
  tier1Percent: '25',
  tier1Label: 'Pre-work (after signing)',
  tier2Percent: '40',
  tier2Label: 'Early production (0-25% complete)',
  tier3Percent: '60',
  tier3Label: 'Active production (25-50% complete)',
  tier4Percent: '80',
  tier4Label: 'Late production (50-75% complete)',
  tier5Percent: '100',
  tier5Label: 'Near completion (75%+)',
  minimumFee: 'Deposit amount',
  paymentDueDays: '15',
  governingState: 'Maharashtra',
};

const fields = [
  { name: 'agencyName', label: 'Agency Name', type: 'text', required: true },
  { name: 'clientName', label: 'Client Name', type: 'text', required: true },
  { name: 'projectName', label: 'Project Name', type: 'text', required: true },
  { name: 'noticeDays', label: 'Notice Period (days)', type: 'number', min: 1, placeholder: '14' },
  { name: 'tier1Label', label: 'Tier 1 Stage Label', type: 'text', placeholder: 'Pre-work (after signing)' },
  { name: 'tier1Percent', label: 'Tier 1 Kill Fee (%)', type: 'number', min: 0, max: 100 },
  { name: 'tier2Label', label: 'Tier 2 Stage Label', type: 'text', placeholder: 'Early production (0-25% complete)' },
  { name: 'tier2Percent', label: 'Tier 2 Kill Fee (%)', type: 'number', min: 0, max: 100 },
  { name: 'tier3Label', label: 'Tier 3 Stage Label', type: 'text', placeholder: 'Active production (25-50% complete)' },
  { name: 'tier3Percent', label: 'Tier 3 Kill Fee (%)', type: 'number', min: 0, max: 100 },
  { name: 'tier4Label', label: 'Tier 4 Stage Label', type: 'text', placeholder: 'Late production (50-75% complete)' },
  { name: 'tier4Percent', label: 'Tier 4 Kill Fee (%)', type: 'number', min: 0, max: 100 },
  { name: 'tier5Label', label: 'Tier 5 Stage Label', type: 'text', placeholder: 'Near completion (75%+)' },
  { name: 'tier5Percent', label: 'Tier 5 Kill Fee (%)', type: 'number', min: 0, max: 100 },
  { name: 'minimumFee', label: 'Minimum Kill Fee', type: 'text', placeholder: 'Deposit amount' },
  { name: 'paymentDueDays', label: 'Payment Due (days)', type: 'number', min: 1, placeholder: '15' },
  { name: 'governingState', label: 'Governing Jurisdiction', type: 'text', placeholder: 'Maharashtra, India' },
];

const generatePDF = (data) => {
  const doc = new jsPDF();
  
  addHeader(doc, 'Kill Fee Policy', `${data.projectName || 'Project'} Cancellation Terms`);
  
  let y = 50;
  
  y = addSection(doc, 'Policy Overview', y);
  y = addParagraph(doc, `This Kill Fee Policy establishes the financial terms should the project be cancelled by the Client. Kill fees protect the Agency from loss of income and cover opportunity costs when projects are terminated prematurely.`, y);
  y += 5;
  
  y = addSection(doc, '1. Definition', y);
  y = addParagraph(doc, 'A "Kill Fee" (also known as a cancellation fee) is a payment required by the Agency if the Client cancels the project after work has commenced. This fee compensates the Agency for:', y);
  addBulletList(doc, [
    'Time invested in the project up to the cancellation date',
    'Opportunity cost of blocked calendar time',
    'Resources and tools allocated exclusively for this project',
    'Administrative costs associated with project setup and closure',
  ], y);
  y += 10;
  
  y = addSection(doc, '2. Notice Period', y);
  addParagraph(doc, `Either party may terminate this Agreement with ${data.noticeDays || '14'} days written notice. However, work will cease immediately upon cancellation notice, and the kill fee will be calculated based on project completion at that time.`, y);
  y += 10;
  
  y = addSection(doc, '3. Kill Fee Structure', y);
  addParagraph(doc, `Kill fees are calculated as a percentage of the total project value, increasing as the project progresses:`, y);
  y += 8;
  
  const tiers = [
    { label: data.tier1Label || 'Pre-work', percent: data.tier1Percent || '25' },
    { label: data.tier2Label || 'Early production', percent: data.tier2Percent || '40' },
    { label: data.tier3Label || 'Active production', percent: data.tier3Percent || '60' },
    { label: data.tier4Label || 'Late production', percent: data.tier4Percent || '80' },
    { label: data.tier5Label || 'Near completion', percent: data.tier5Percent || '100' },
  ];
  
  const tierTable = [
    ['Project Stage', 'Kill Fee (% of Total)'],
    ...tiers.map(t => [t.label, `${t.percent}%`])
  ];
  
  doc.autoTable({
    head: tierTable.slice(0, 2),
    body: tierTable.slice(2),
    startY: y,
    margin: { left: 15, right: 15 },
    styles: { fontSize: 9, cellPadding: 4 },
    headStyles: { fillColor: [17, 17, 17], textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [245, 245, 245] },
  });
  
  y = doc.lastAutoTable.finalY + 10;
  
  y = addSection(doc, '4. Minimum Kill Fee', y);
  addParagraph(doc, `The minimum kill fee shall be the greater of: (a) ${data.minimumFee || 'the deposit amount'}, or (b) the percentage-based kill fee for the current stage. This ensures the Agency recovers setup costs regardless of project stage.`, y);
  y += 10;
  
  y = addSection(doc, '5. Kill Fee Calculation Example', y);
  addParagraph(doc, 'Example calculation for a $10,000 project cancelled during active production:', y);
  addBulletList(doc, [
    'Total project value: $10,000',
    'Project stage: 40% complete (Active Production)',
    'Kill fee percentage: 60%',
    'Kill fee amount: $6,000',
    'Less deposit paid: $3,000 (if applicable)',
    'Balance due: $3,000',
  ], y);
  y += 10;
  
  y = addSection(doc, '6. Payment Terms', y);
  addBulletList(doc, [
    `Kill fees are due within ${data.paymentDueDays || '15'} days of written cancellation notice`,
    'The Agency will provide an itemized invoice detailing the calculation',
    'Client retains rights to all completed deliverables upon full payment',
    'Failure to pay will result in retention of deliverables until payment received',
  ], y);
  y += 10;
  
  y = addSection(doc, '7. Project Materials', y);
  addParagraph(doc, 'Upon receipt of the kill fee payment, the Agency will deliver:', y);
  addBulletList(doc, [
    'All completed work products to date',
    'Source files for completed deliverables (if applicable)',
    'Documentation of work performed',
    'Transfer of any registered accounts or subscriptions paid by Client',
  ], y);
  y += 10;
  
  y = addSection(doc, '8. Work Stoppage', y);
  addParagraph(doc, 'Upon cancellation notice, all work will immediately cease. The Agency is not obligated to continue work during the notice period unless specifically requested and pre-paid. Any work performed during the notice period will be billed at the standard hourly rate.', y);
  y += 10;
  
  y = addSection(doc, '9. Governing Terms', y);
  addParagraph(doc, `This Kill Fee Policy is governed by the laws of ${data.governingState || 'Maharashtra, India'}. Both parties agree to attempt mediation before pursuing legal action.`, y);
  y += 15;
  
  addSignatureBlock(doc, y, 'Client', 'Agency');
  
  addFooter(doc);
  
  doc.save(`kill-fee-policy-${(data.clientName || 'client').toLowerCase().replace(/\s+/g, '-')}.pdf`);
};

const previewContent = (data) => (
  <div className="bg-white rounded-lg p-6 text-sm font-sans">
    <div className="bg-gray-100 h-10 rounded flex items-center px-4 mb-4">
      <div className="w-3 h-3 rounded-full bg-red-400 mr-2" />
      <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2" />
      <div className="w-3 h-3 rounded-full bg-green-400" />
    </div>
    
    <h1 className="text-xl font-bold mb-1">Kill Fee Policy</h1>
    <p className="text-gray-500 mb-4">{data.projectName || 'Project'}</p>
    
    <div className="space-y-3 text-xs">
      <div>
        <h2 className="font-bold text-red-500 mb-2">CANCELLATION FEES</h2>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-600">{data.tier1Label || 'Pre-work'}</span>
            <span className="font-bold">{data.tier1Percent || '25'}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{data.tier2Label || 'Early'}</span>
            <span className="font-bold">{data.tier2Percent || '40'}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{data.tier3Label || 'Active'}</span>
            <span className="font-bold">{data.tier3Percent || '60'}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{data.tier4Label || 'Late'}</span>
            <span className="font-bold">{data.tier4Percent || '80'}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{data.tier5Label || 'Near done'}</span>
            <span className="font-bold">{data.tier5Percent || '100'}%</span>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="font-bold text-red-500 mb-1">KEY TERMS</h2>
        <p className="text-gray-600">Notice: {data.noticeDays || '14'} days</p>
        <p className="text-gray-600">Due: {data.paymentDueDays || '15'} days</p>
      </div>
    </div>
  </div>
);

const KillFeeTool = () => {
  return (
    <DocBuilder
      title="Kill Fee Policy"
      description="Generate a cancellation fee structure for project termination"
      fields={fields}
      defaultValues={defaultValues}
      onGenerate={generatePDF}
      previewContent={previewContent}
    />
  );
};

export default KillFeeTool;