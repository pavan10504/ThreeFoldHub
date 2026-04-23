import { jsPDF } from 'jspdf';
import DocBuilder from '../../components/tools/DocBuilder';
import { addHeader, addSection, addParagraph, addBulletList, addFooter, addTable, checkAndAddPage, addSignatureBlock } from '../../utils/pdfGenerator';

const defaultValues = {
  agencyName: 'ThreeFoldHub',
  clientName: '',
  projectName: '',
  noticeDays: '14',
  tier1Percent: '25',
  tier2Percent: '40',
  tier3Percent: '60',
  tier4Percent: '80',
  tier5Percent: '100',
  minimumFee: 'Deposit amount',
  paymentDueDays: '15',
  governingState: 'Karnataka',
};

const fields = [
  { name: 'agencyName', label: 'Agency Name', type: 'text', required: true },
  { name: 'clientName', label: 'Client Name', type: 'text', required: true },
  { name: 'projectName', label: 'Project Name', type: 'text', required: true },
  { name: 'noticeDays', label: 'Notice Period (days)', type: 'number', min: 1, placeholder: '14' },
  { name: 'tier1Percent', label: 'Tier 1 Kill Fee (%) - Pre-work', type: 'number', min: 0, max: 100 },
  { name: 'tier2Percent', label: 'Tier 2 Kill Fee (%) - Early', type: 'number', min: 0, max: 100 },
  { name: 'tier3Percent', label: 'Tier 3 Kill Fee (%) - Active', type: 'number', min: 0, max: 100 },
  { name: 'tier4Percent', label: 'Tier 4 Kill Fee (%) - Late', type: 'number', min: 0, max: 100 },
  { name: 'tier5Percent', label: 'Tier 5 Kill Fee (%) - Near Done', type: 'number', min: 0, max: 100 },
  { name: 'minimumFee', label: 'Minimum Kill Fee', type: 'text', placeholder: 'Deposit amount' },
  { name: 'paymentDueDays', label: 'Payment Due (days)', type: 'number', min: 1, placeholder: '15' },
  { name: 'governingState', label: 'Governing Jurisdiction', type: 'text', placeholder: 'Karnataka' },
];

const generatePDF = (data) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });
  
  addHeader(doc, 'Kill Fee Policy', (data.projectName || 'Project') + ' Cancellation Terms');
  
  let y = 50;
  
  y = addSection(doc, 'Policy Overview', y);
  y = addParagraph(doc, 'This Kill Fee Policy establishes financial terms if the project is cancelled by the Client.', y);
  
  y = checkAndAddPage(doc, y, 50);
  y = addSection(doc, '1. Definition', y);
  y = addParagraph(doc, 'A Kill Fee compensates the Agency for time invested, blocked calendar time, and allocated resources.', y);
  
  y = checkAndAddPage(doc, y, 60);
  y = addSection(doc, '2. Notice Period', y);
  y = addParagraph(doc, 'Either party may terminate with ' + (data.noticeDays || '14') + ' days written notice.', y);
  
  y = checkAndAddPage(doc, y, 50);
  y = addSection(doc, '3. Kill Fee Structure', y);
  
  const tiers = [
    ['Project Stage', 'Kill Fee'],
    ['Pre-work (after signing)', data.tier1Percent || '25' + '%'],
    ['Early production (0-25%)', data.tier2Percent || '40' + '%'],
    ['Active production (25-50%)', data.tier3Percent || '60' + '%'],
    ['Late production (50-75%)', data.tier4Percent || '80' + '%'],
    ['Near completion (75%+)', data.tier5Percent || '100' + '%'],
  ];
  
  y = addTable(doc, tiers[0], tiers.slice(1), y);
  
  y = checkAndAddPage(doc, y, 50);
  y = addSection(doc, '4. Minimum Kill Fee', y);
  y = addParagraph(doc, 'Minimum kill fee: ' + (data.minimumFee || 'deposit amount'), y);
  
  y = checkAndAddPage(doc, y, 60);
  y = addSection(doc, '5. Payment Terms', y);
  y = addParagraph(doc, 'Kill fees due within ' + (data.paymentDueDays || '15') + ' days of cancellation notice.', y);
  y = addBulletList(doc, [
    'Itemized invoice provided',
    'Completed work delivered upon payment',
    'Failure to pay retains deliverables',
  ], y);
  
  y = checkAndAddPage(doc, y, 60);
  y = addSection(doc, '6. Governing Terms', y);
  y = addParagraph(doc, 'Governed by laws of ' + (data.governingState || 'Karnataka') + '.', y);
  
  y += 10;
  y = checkAndAddPage(doc, y, 50);
  y = addSignatureBlock(doc, y, 'Client', 'Agency');
  
  addFooter(doc, 'ThreeFoldHub Kill Fee Policy');
  
  const filename = 'kill-fee-policy-' + (data.clientName || 'client').toLowerCase().replace(/\s+/g, '-') + '.pdf';
  doc.save(filename);
};

const previewContent = (data) => (
  <div className="p-4 text-xs leading-relaxed" style={{minWidth: '595px'}}>
    <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-red-500">
      <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white font-bold text-sm">TFH</div>
      <div>
        <h1 className="text-base font-bold">Kill Fee Policy</h1>
        <p className="text-gray-500 text-xs">{data.projectName || 'Project'}</p>
      </div>
    </div>
    
    <div className="space-y-4">
      <section>
        <h2 className="text-red-500 font-bold text-xs mb-2">CANCELLATION FEES</h2>
        <div className="bg-gray-50 rounded p-3 space-y-1">
          <div className="flex justify-between"><span>Pre-work</span><span className="font-bold">{data.tier1Percent || '25'}%</span></div>
          <div className="flex justify-between"><span>Early (0-25%)</span><span className="font-bold">{data.tier2Percent || '40'}%</span></div>
          <div className="flex justify-between"><span>Active (25-50%)</span><span className="font-bold">{data.tier3Percent || '60'}%</span></div>
          <div className="flex justify-between"><span>Late (50-75%)</span><span className="font-bold">{data.tier4Percent || '80'}%</span></div>
          <div className="flex justify-between border-t pt-1"><span>Near Done (75%+)</span><span className="font-bold">{data.tier5Percent || '100'}%</span></div>
        </div>
      </section>
      
      <section>
        <h2 className="text-red-500 font-bold text-xs mb-2">KEY TERMS</h2>
        <div className="grid grid-cols-2 gap-2 text-gray-700">
          <p>Notice: <span className="text-gray-500">{data.noticeDays || '14'} days</span></p>
          <p>Due: <span className="text-gray-500">{data.paymentDueDays || '15'} days</span></p>
        </div>
      </section>
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