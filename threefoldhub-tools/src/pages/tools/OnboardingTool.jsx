import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Download, FileText, CheckCircle, Circle, Clock, Users, FolderOpen, CreditCard, MessageSquare } from 'lucide-react';
import DocBuilder from '../../components/tools/DocBuilder';
import { addHeader, addSection, addParagraph, addBulletList, addFooter, addSignatureBlock } from '../../utils/pdfGenerator';

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
  { name: 'brandAssets', label: 'Brand Assets Available', type: 'textarea', rows: 3, placeholder: 'Logo files, brand guidelines, color codes, fonts...' },
  { name: 'accessNeeded', label: 'Access Needed From Client', type: 'textarea', rows: 3, placeholder: 'Hosting, domain registrar, analytics, social accounts...' },
];

const checklistItems = [
  { category: 'Brand Assets', items: ['Logo files (SVG, PNG, EPS)', 'Brand guidelines document', 'Color codes (HEX, RGB)', 'Typography (fonts files)', 'Existing imagery if applicable'] },
  { category: 'Content', items: ['Homepage copy', 'About page content', 'Services/Products description', 'Contact information', 'Testimonials (if available)', 'Blog posts (if applicable)'] },
  { category: 'Access & Credentials', items: ['Domain registrar access', 'Hosting control panel', 'Current website CMS', 'Google Analytics', 'Social media accounts', 'Any third-party integrations'] },
  { category: 'Project Information', items: ['Target audience description', 'Competitor websites (inspiration)', 'Special requirements', 'Launch date goal', 'Success metrics'] },
];

const generatePDF = (data) => {
  const doc = new jsPDF();
  
  addHeader(doc, 'Client Onboarding Document', `${data.projectName || 'Web Design Project'}`);
  
  let y = 50;
  
  y = addSection(doc, 'Project Overview', y);
  y = addParagraph(doc, `Welcome to ThreeFoldHub! We're excited to work with ${data.clientCompany || 'you'} on your web design project. This document outlines everything you need to know to get started.`, y);
  
  y = addSection(doc, 'Contact Information', y);
  addBulletList(doc, [
    `Client: ${data.clientName || '[Client Name]'}`,
    `Company: ${data.clientCompany || '[Company Name]'}`,
    `Email: ${data.clientEmail || '[Email]'}`,
    `Phone: ${data.clientPhone || '[Phone]'}`,
    `Current Website: ${data.website || 'N/A'}`,
  ], y);
  y += 20;
  
  y = addSection(doc, 'Project Details', y);
  addBulletList(doc, [
    `Project Name: ${data.projectName || '[Project Name]'}`,
    `Project Type: ${data.projectType?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'New Website'}`,
    `Start Date: ${data.startDate || '[Start Date]'}`,
    `Budget: ${data.budget || '[Budget Range]'}`,
    `Decision Maker: ${data.decisionMaker || 'TBD'}`,
    `Content Due Date: ${data.contentDueDate || '[Due Date]'}`,
  ], y);
  y += 15;
  
  if (data.brandAssets) {
    y = addSection(doc, 'Brand Assets', y);
    y = addParagraph(doc, data.brandAssets, y);
  }
  
  if (data.accessNeeded) {
    y = addSection(doc, 'Required Access', y);
    addBulletList(doc, data.accessNeeded.split(',').map(s => s.trim()).filter(Boolean), y);
    y += 15;
  }
  
  y = addSection(doc, 'Client Onboarding Checklist', y);
  
  checklistItems.forEach((section) => {
    y = addParagraph(doc, `${section.category}:`, y, 11);
    section.items.forEach((item, idx) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text('☐', 18, y + (idx * 6));
      doc.text(item, 25, y + (idx * 6));
    });
    y += section.items.length * 6 + 10;
  });
  
  y = addSection(doc, 'Your Responsibilities', y);
  const responsibilities = [
    'Provide all required assets and content by the agreed deadlines',
    'Review and approve deliverables within 3-5 business days',
    'Designate a single point of contact for decisions',
    'Respond to queries within 24-48 hours',
    'Test the website on your end before final approval',
  ];
  addBulletList(doc, responsibilities, y);
  y += 25;
  
  y = addSection(doc, 'What Happens Next', y);
  const nextSteps = [
    '1. Review and sign the project agreement',
    '2. Pay the project deposit (50% of total cost)',
    '3. Submit all brand assets and content',
    '4. Provide access to hosting/domain as needed',
    '5. Attend the kickoff meeting to finalize details',
  ];
  addBulletList(doc, nextSteps, y);
  y += 25;
  
  addSignatureBlock(doc, y, 'Client', 'ThreeFoldHub');
  
  addFooter(doc);
  
  doc.save(`onboarding-${(data.clientName || 'client').toLowerCase().replace(/\s+/g, '-')}.pdf`);
};

const previewContent = (data) => (
  <div className="bg-white rounded-lg p-6 text-sm font-sans">
    <div className="bg-gray-100 h-10 rounded flex items-center px-4 mb-4">
      <div className="w-3 h-3 rounded-full bg-red-400 mr-2" />
      <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2" />
      <div className="w-3 h-3 rounded-full bg-green-400" />
    </div>
    
    <h1 className="text-xl font-bold mb-1">Client Onboarding Document</h1>
    <p className="text-gray-500 mb-6">{data.projectName || 'Project Name'}</p>
    
    <div className="space-y-4">
      <div>
        <h2 className="text-xs font-bold text-red-500 uppercase tracking-wide mb-2">Client Info</h2>
        <p><strong>{data.clientName || '[Client Name]'}</strong></p>
        <p className="text-gray-600">{data.clientCompany || '[Company]'}</p>
        <p className="text-gray-500 text-sm">{data.clientEmail || '[email@domain.com]'}</p>
      </div>
      
      <div>
        <h2 className="text-xs font-bold text-red-500 uppercase tracking-wide mb-2">Project Details</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p>Type: <span className="text-gray-600">{data.projectType?.replace('-', ' ') || 'New Website'}</span></p>
          <p>Start: <span className="text-gray-600">{data.startDate || '[Date]'}</span></p>
        </div>
      </div>
      
      <div>
        <h2 className="text-xs font-bold text-red-500 uppercase tracking-wide mb-2">Checklist</h2>
        <div className="space-y-1">
          {checklistItems.slice(0, 2).map((section, i) => (
            <div key={i} className="text-sm">
              <span className="text-gray-500">{section.category}:</span>
              {section.items.slice(0, 2).map((item, j) => (
                <div key={j} className="flex items-center gap-2 text-gray-600">
                  <div className="w-3 h-3 border border-gray-300 rounded" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
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