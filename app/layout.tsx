import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Salesforce Change-Impact Explainer',
  description: 'A mock UI and starter concept for a read-first, pre-change Salesforce metadata impact analysis tool.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
