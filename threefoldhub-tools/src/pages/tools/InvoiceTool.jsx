import { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Plus, Trash2 } from 'lucide-react';
import DocBuilder from '../../components/tools/DocBuilder';

const defaultValues = {
  invoiceNumber: 'INV-001',
  invoiceDate: new Date().toISOString().split('T')[0],
  dueDate: '',
  fromName: 'ThreeFoldHub',
  fromAddress: 'Mumbai, Karnataka, India',
  fromEmail: 'hello@threefoldhub.in',
  fromPhone: '',
  toName: '',
  toCompany: '',
  toAddress: '',
  toEmail: '',
  items: [
    { description: 'Website Design - Homepage', quantity: 1, rate: 0 },
    { description: 'Website Design - Interior Pages (4)', quantity: 1, rate: 0 },
    { description: 'Responsive Development', quantity: 1, rate: 0 },
    { description: 'CMS Setup & Training', quantity: 1, rate: 0 },
  ],
  taxRate: '0',
  discountPercent: '0',
  notes: 'Thank you for your business!',
  bankName: '',
  accountName: '',
  accountNumber: '',
  ifscCode: '',
  upiId: '',
};

const InvoiceTool = () => {
  const [formData, setFormData] = useState(defaultValues);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, rate: 0 }]
    }));
  };

  const removeItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const calculateSubtotal = () => {
    return formData.items.reduce((sum, item) => {
      return sum + (item.quantity * item.rate);
    }, 0);
  };

  const calculateDiscount = () => {
    return calculateSubtotal() * (parseFloat(formData.discountPercent) || 0) / 100;
  };

  const calculateTax = () => {
    const afterDiscount = calculateSubtotal() - calculateDiscount();
    return afterDiscount * (parseFloat(formData.taxRate) || 0) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateTax();
  };

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Header
    doc.setFillColor(248, 247, 244);
    doc.rect(0, 0, pageWidth, 45, 'F');
    doc.setFillColor(230, 57, 70);
    doc.rect(0, 0, 4, 45, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(17, 17, 17);
    doc.text('INVOICE', 15, 26);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text(formData.invoiceNumber, 15, 36);
    
    // From section
    const fromX = pageWidth - 80;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(17, 17, 17);
    doc.text('FROM', fromX, 14);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(formData.fromName || 'Agency', fromX, 20);
    if (formData.fromAddress) doc.text(formData.fromAddress, fromX, 26);
    if (formData.fromEmail) doc.text(formData.fromEmail, fromX, 32);
    if (formData.fromPhone) doc.text(formData.fromPhone, fromX, 38);
    
    // Bill to
    let y = 55;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('BILL TO', 15, y);
    y += 6;
    doc.setFont('helvetica', 'bold');
    doc.text(formData.toName || 'Client', 15, y);
    doc.setFont('helvetica', 'normal');
    y += 5;
    if (formData.toCompany) { doc.text(formData.toCompany, 15, y); y += 5; }
    if (formData.toAddress) { doc.text(formData.toAddress, 15, y); y += 5; }
    if (formData.toEmail) { doc.text(formData.toEmail, 15, y); y += 5; }
    
    // Date info
    doc.setFont('helvetica', 'bold');
    doc.text('DATE', 130, 58);
    doc.setFont('helvetica', 'normal');
    doc.text(formData.invoiceDate, 130, 65);
    
    doc.setFont('helvetica', 'bold');
    doc.text('DUE DATE', 130, 73);
    doc.setFont('helvetica', 'normal');
    doc.text(formData.dueDate || 'Net 30', 130, 80);
    
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const tax = calculateTax();
    const total = calculateTotal();
    
    // Line items table
    const tableData = formData.items
      .filter(item => item.description || item.rate)
      .map(item => [
        item.description,
        item.quantity.toString(),
        '$' + item.rate.toLocaleString(),
        '$' + (item.quantity * item.rate).toLocaleString()
      ]);
    
    if (tableData.length > 0) {
      autoTable(doc, {
        head: [['Description', 'Qty', 'Rate', 'Amount']],
        body: tableData,
        startY: 90,
        margin: { left: 15, right: 15 },
        styles: { fontSize: 9, cellPadding: 5 },
        headStyles: {
          fillColor: [17, 17, 17],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
        },
        alternateRowStyles: { fillColor: [248, 247, 244] },
        columnStyles: {
          0: { cellWidth: 95 },
          1: { cellWidth: 20, halign: 'center' },
          2: { cellWidth: 30, halign: 'right' },
          3: { cellWidth: 30, halign: 'right' },
        },
      });
    }
    
    const tableEndY = doc.lastAutoTable.finalY + 10;
    
    // Totals
    const totalsX = pageWidth - 70;
    let yPos = tableEndY;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Subtotal:', totalsX, yPos);
    doc.text('$' + subtotal.toLocaleString(), pageWidth - 15, yPos, { align: 'right' });
    
    if (discount > 0) {
      yPos += 7;
      doc.text('Discount (' + formData.discountPercent + '%):', totalsX, yPos);
      doc.text('-$' + discount.toLocaleString(), pageWidth - 15, yPos, { align: 'right' });
    }
    
    if (tax > 0) {
      yPos += 7;
      doc.text('Tax (' + formData.taxRate + '%):', totalsX, yPos);
      doc.text('$' + tax.toLocaleString(), pageWidth - 15, yPos, { align: 'right' });
    }
    
    yPos += 10;
    doc.setDrawColor(220, 220, 220);
    doc.line(totalsX, yPos - 3, pageWidth - 15, yPos - 3);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('TOTAL:', totalsX, yPos + 5);
    doc.setTextColor(230, 57, 70);
    doc.text('$' + total.toLocaleString(), pageWidth - 15, yPos + 5, { align: 'right' });
    
    // Payment details
    if (formData.bankName || formData.upiId) {
      yPos = tableEndY + 40;
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(17, 17, 17);
      doc.text('Payment Details', 15, yPos);
      
      yPos += 8;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      
      if (formData.bankName) { doc.text('Bank: ' + formData.bankName, 15, yPos); yPos += 6; }
      if (formData.accountName) { doc.text('Account: ' + formData.accountName, 15, yPos); yPos += 6; }
      if (formData.accountNumber) { doc.text('A/C No: ' + formData.accountNumber, 15, yPos); yPos += 6; }
      if (formData.ifscCode) { doc.text('IFSC: ' + formData.ifscCode, 15, yPos); yPos += 6; }
      if (formData.upiId) { doc.text('UPI: ' + formData.upiId, 15, yPos); yPos += 6; }
    }
    
    if (formData.notes) {
      yPos += 10;
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text(formData.notes, 15, yPos);
    }
    
    doc.setFontSize(8);
    doc.setTextColor(180, 180, 180);
    doc.text('Generated by ThreeFoldHub Tools', pageWidth / 2, pageHeight - 10, { align: 'center' });
    
    doc.save('invoice-' + formData.invoiceNumber + '.pdf');
  };

  const previewContent = () => (
    <div className="p-4 text-xs" style={{minWidth: '595px'}}>
      <div className="flex justify-between items-start mb-6 pb-4 border-b-2 border-red-500">
        <div>
          <h1 className="text-2xl font-bold text-red-500">INVOICE</h1>
          <p className="text-gray-500">{formData.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <p className="font-bold">{formData.fromName}</p>
          <p className="text-gray-500 text-xs">{formData.fromEmail}</p>
          <p className="text-gray-500 text-xs">{formData.invoiceDate}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-gray-400 text-xs mb-1">Bill To:</p>
          <p className="font-bold">{formData.toName || '[Client]'}</p>
          <p className="text-gray-600">{formData.toCompany}</p>
          <p className="text-gray-500 text-xs">{formData.toEmail}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-xs">Due Date:</p>
          <p className="font-bold">{formData.dueDate || 'Net 30'}</p>
        </div>
      </div>
      
      <table className="w-full mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2 text-xs">Description</th>
            <th className="text-center p-2 text-xs">Qty</th>
            <th className="text-right p-2 text-xs">Rate</th>
            <th className="text-right p-2 text-xs">Amount</th>
          </tr>
        </thead>
        <tbody>
          {formData.items.filter(i => i.description || i.rate).map((item, i) => (
            <tr key={i} className="border-b">
              <td className="p-2">{item.description || '-'}</td>
              <td className="p-2 text-center">{item.quantity}</td>
              <td className="p-2 text-right">${item.rate}</td>
              <td className="p-2 text-right">${item.quantity * item.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="text-right space-y-1">
        <p>Subtotal: <span className="text-gray-600">${calculateSubtotal().toLocaleString()}</span></p>
        {calculateDiscount() > 0 && (
          <p>Discount ({formData.discountPercent}%): <span className="text-gray-600">-${calculateDiscount().toLocaleString()}</span></p>
        )}
        {calculateTax() > 0 && (
          <p>Tax ({formData.taxRate}%): <span className="text-gray-600">${calculateTax().toLocaleString()}</span></p>
        )}
        <p className="font-bold text-lg pt-2 border-t">Total: <span className="text-red-500">${calculateTotal().toLocaleString()}</span></p>
      </div>
      
      {(formData.bankName || formData.upiId) && (
        <div className="mt-6 p-3 bg-gray-50 rounded">
          <p className="font-bold text-xs mb-2">Payment Details</p>
          {formData.bankName && <p className="text-gray-600 text-xs">Bank: {formData.bankName}</p>}
          {formData.upiId && <p className="text-gray-600 text-xs">UPI: {formData.upiId}</p>}
        </div>
      )}
    </div>
  );

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight mb-2">
            Invoice Template
          </h1>
          <p className="text-primary/50">Generate professional invoices for your clients</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <h2 className="text-lg font-heading font-medium mb-4">Invoice Details</h2>
            
            <div className="bg-surface p-6 rounded-2xl border border-primary/5 space-y-6 overflow-y-auto max-h-[calc(100vh-300px)]">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Invoice # *</label>
                  <input
                    type="text"
                    value={formData.invoiceNumber}
                    onChange={(e) => handleChange('invoiceNumber', e.target.value)}
                    className="w-full p-3 bg-bg-base border border-primary/10 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date *</label>
                  <input
                    type="date"
                    value={formData.invoiceDate}
                    onChange={(e) => handleChange('invoiceDate', e.target.value)}
                    className="w-full p-3 bg-bg-base border border-primary/10 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Due Date *</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => handleChange('dueDate', e.target.value)}
                    className="w-full p-3 bg-bg-base border border-primary/10 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">From</h3>
                  <input type="text" placeholder="Agency Name" value={formData.fromName} onChange={(e) => handleChange('fromName', e.target.value)} className="w-full p-3 bg-bg-base border border-primary/10 rounded-lg text-sm" />
                  <input type="text" placeholder="Address" value={formData.fromAddress} onChange={(e) => handleChange('fromAddress', e.target.value)} className="w-full p-3 bg-bg-base border border-primary/10 rounded-lg text-sm" />
                  <input type="email" placeholder="Email" value={formData.fromEmail} onChange={(e) => handleChange('fromEmail', e.target.value)} className="w-full p-3 bg-bg-base border border-primary/10 rounded-lg text-sm" />
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Bill To</h3>
                  <input type="text" placeholder="Client Name" value={formData.toName} onChange={(e) => handleChange('toName', e.target.value)} className="w-full p-3 bg-bg-base border border-primary/10 rounded-lg text-sm" />
                  <input type="text" placeholder="Company" value={formData.toCompany} onChange={(e) => handleChange('toCompany', e.target.value)} className="w-full p-3 bg-bg-base border border-primary/10 rounded-lg text-sm" />
                  <input type="email" placeholder="Email" value={formData.toEmail} onChange={(e) => handleChange('toEmail', e.target.value)} className="w-full p-3 bg-bg-base border border-primary/10 rounded-lg text-sm" />
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 bg-surface rounded-2xl border border-primary/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Line Items</h3>
                <button onClick={addItem} className="flex items-center gap-2 text-sm text-accent hover:text-accent/80">
                  <Plus className="w-4 h-4" /> Add Item
                </button>
              </div>
              
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {formData.items.map((item, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <input type="text" placeholder="Description" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} className="flex-1 p-3 bg-bg-base border border-primary/10 rounded-lg text-sm" />
                    <input type="number" placeholder="Qty" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)} className="w-20 p-3 bg-bg-base border border-primary/10 rounded-lg text-sm text-center" />
                    <input type="number" placeholder="Rate" value={item.rate} onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value) || 0)} className="w-28 p-3 bg-bg-base border border-primary/10 rounded-lg text-sm text-right" />
                    <button onClick={() => removeItem(index)} className="p-3 text-gray-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <div className="w-64 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${calculateSubtotal().toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Discount</span>
                    <input type="number" value={formData.discountPercent} onChange={(e) => handleChange('discountPercent', e.target.value)} className="w-16 p-1 bg-bg-base border border-primary/10 rounded text-center text-xs" />
                    <span>%</span>
                    <span className="ml-auto">-${calculateDiscount().toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Tax</span>
                    <input type="number" value={formData.taxRate} onChange={(e) => handleChange('taxRate', e.target.value)} className="w-16 p-1 bg-bg-base border border-primary/10 rounded text-center text-xs" />
                    <span>%</span>
                    <span className="ml-auto">${calculateTax().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span className="text-accent">${calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={generatePDF} className="mt-6 w-full py-4 px-6 bg-accent text-surface font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors">
              Generate PDF
            </button>
          </div>

          <div className="lg:sticky lg:top-24">
            <h2 className="text-lg font-heading font-medium mb-4">Preview</h2>
            <div className="bg-bg-tert rounded-2xl p-3 md:p-4 min-h-[600px] overflow-auto">
              <div className="bg-white rounded-lg shadow-lg">
                <div className="sticky top-0 bg-gray-100 border-b border-gray-200 rounded-t-lg px-4 py-2 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <div className="flex-1 mx-4 h-5 bg-white border border-gray-200 rounded-md" />
                </div>
                <div className="p-2 max-h-[700px] overflow-auto">
                  {previewContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTool;