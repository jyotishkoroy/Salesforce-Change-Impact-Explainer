const affectedComponents = [
  { name: 'Opportunity.Stage__c', type: 'Custom Field', status: 'Target', confidence: 'Confirmed' },
  { name: 'Opportunity Probability Sync', type: 'Record-Triggered Flow', status: 'Affected', confidence: 'Confirmed' },
  { name: 'Stage Gate Validation', type: 'Validation Rule', status: 'Affected', confidence: 'Confirmed' },
  { name: 'Forecast Category Formula', type: 'Formula Field', status: 'Affected', confidence: 'Likely' },
  { name: 'Sales User Permission Set', type: 'Permission Set', status: 'Hint', confidence: 'Likely' },
];

const tests = [
  'Create a new Opportunity with each proposed Stage value',
  'Edit existing Opportunities that already use deprecated Stage values',
  'Run the record-triggered Flow on create and update paths',
  'Verify validation rule behavior for required stage transitions',
  'Check reports and formulas consuming Forecast Category logic',
  'Confirm integration payloads still accept revised Stage values',
];

const unknowns = [
  'External integrations referencing hardcoded Stage values were not confirmed',
  'Downstream reporting dependencies are partially inferred from naming only',
  'User training and enablement impact is not measurable from metadata alone',
];

const evidence = [
  'Validation Rule formula contains direct reference to Opportunity.Stage__c',
  'Flow entry criteria include Stage change evaluation',
  'Formula field maps Stage to Forecast Category via CASE expression',
  'Permission hints inferred from object access and likely sales-user touchpoints',
];

const pillClasses = {
  confirmed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  likely: 'bg-amber-50 text-amber-700 border border-amber-200',
  unknown: 'bg-slate-100 text-slate-700 border border-slate-200',
  high: 'bg-rose-50 text-rose-700 border border-rose-200',
  moderate: 'bg-orange-50 text-orange-700 border border-orange-200',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-6 flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              V1 • Read-only pre-change safety checker
            </div>
            <h1 className="text-3xl font-semibold tracking-tight">Salesforce Change-Impact Explainer</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              Understand what might break before changing Salesforce metadata. Deterministic dependency analysis first, AI explanation second.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <div className="text-xs text-slate-500">Connected org</div>
              <div className="mt-1 font-medium">Acme Sandbox</div>
              <div className="mt-2 text-xs text-emerald-600">Read-only access</div>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <div className="text-xs text-slate-500">Last metadata sync</div>
              <div className="mt-1 font-medium">Today, 10:42 AM</div>
              <div className="mt-2 text-xs text-slate-500">Objects, Fields, Flows, Rules</div>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-4 xl:col-span-3">
            <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-lg font-semibold">New impact analysis</h2>
              <p className="mt-1 text-sm text-slate-600">Choose a component, paste metadata, or describe the change in plain English.</p>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">Input mode</label>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <button className="rounded-2xl bg-slate-900 px-3 py-2 text-white">Component</button>
                    <button className="rounded-2xl border border-slate-200 bg-white px-3 py-2">Snippet</button>
                    <button className="rounded-2xl border border-slate-200 bg-white px-3 py-2">Describe</button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Target component</label>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                    Opportunity.Stage__c
                    <div className="mt-1 text-xs text-slate-500">Custom Field • Opportunity</div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Proposed change</label>
                  <textarea
                    className="h-32 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
                    defaultValue="Change picklist values for Opportunity.Stage__c, remove one deprecated stage, and add two new stages for revised sales qualification workflow."
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Change category</label>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2">Picklist value change</div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2">Field behavior</div>
                  </div>
                </div>

                <button className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-sm">
                  Analyze change impact
                </button>

                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-600">
                  Output separates <span className="font-medium">confirmed</span>, <span className="font-medium">likely</span>, and <span className="font-medium">unknown</span> findings.
                </div>
              </div>
            </section>
          </aside>

          <section className="space-y-6 lg:col-span-8 xl:col-span-9">
            <div className="grid gap-4 md:grid-cols-4">
              <Card title="Risk score" value="High">
                <div className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${pillClasses.high}`}>Likely deployment risk</div>
              </Card>
              <Card title="Affected components" value="12">
                <div className="mt-3 text-xs text-slate-500">5 confirmed • 4 likely • 3 unknown</div>
              </Card>
              <Card title="User impact" value="Sales Ops">
                <div className="mt-3 text-xs text-slate-500">Admins, sellers, import users</div>
              </Card>
              <Card title="Confidence" value="Medium">
                <div className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${pillClasses.moderate}`}>Some inferred dependencies</div>
              </Card>
            </div>

            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Impact report</h2>
                  <p className="mt-1 text-sm text-slate-600">Standardized report format designed for pre-deployment review.</p>
                </div>
                <div className="flex gap-2 text-sm">
                  <button className="rounded-2xl border border-slate-200 px-3 py-2">Save</button>
                  <button className="rounded-2xl border border-slate-200 px-3 py-2">Export PDF</button>
                  <button className="rounded-2xl bg-slate-900 px-3 py-2 text-white">Share</button>
                </div>
              </div>

              <div className="mt-6 grid gap-6 xl:grid-cols-3">
                <div className="space-y-6 xl:col-span-2">
                  <div className="rounded-2xl bg-slate-50 p-5">
                    <div className="text-sm font-semibold">1. Change summary</div>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Proposed change updates <span className="font-medium">Opportunity.Stage__c</span> picklist values. This is likely to affect automation, validation logic, reporting logic, and integrations or user processes that assume the current stage taxonomy.
                    </p>
                  </div>

                  <div>
                    <div className="mb-3 text-sm font-semibold">2. Affected components</div>
                    <div className="overflow-hidden rounded-2xl ring-1 ring-slate-200">
                      <table className="min-w-full divide-y divide-slate-200 text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                          <tr>
                            <th className="px-4 py-3 text-left font-medium">Component</th>
                            <th className="px-4 py-3 text-left font-medium">Type</th>
                            <th className="px-4 py-3 text-left font-medium">Status</th>
                            <th className="px-4 py-3 text-left font-medium">Confidence</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {affectedComponents.map((item) => (
                            <tr key={item.name}>
                              <td className="px-4 py-3 font-medium">{item.name}</td>
                              <td className="px-4 py-3 text-slate-600">{item.type}</td>
                              <td className="px-4 py-3 text-slate-600">{item.status}</td>
                              <td className="px-4 py-3">
                                <span
                                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                    item.confidence === 'Confirmed' ? pillClasses.confirmed : pillClasses.likely
                                  }`}
                                >
                                  {item.confidence}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <InfoBox title="3. Likely impacted processes" items={[
                      'Opportunity create and edit lifecycle',
                      'Sales stage progression enforcement',
                      'Forecast derivation and reporting',
                      'CSV import and integration mapping',
                    ]} />
                    <InfoBox title="4. Potential breakage scenarios" items={[
                      'Flows fail when deprecated stage values are encountered',
                      'Validation logic rejects new legal transitions',
                      'Formulas produce incorrect forecast categories',
                      'Integrations reject unknown enum values',
                    ]} />
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-5">
                    <div className="text-sm font-semibold">5. User / role impact</div>
                    <p className="mt-3 text-sm text-slate-700">
                      Most exposed users are sellers editing Opportunities, sales operations users managing bulk updates, and admins troubleshooting automation side effects. Permission review is advisory only in V1.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <BulletCard title="6. Test checklist" items={tests} bulletColor="bg-blue-600" />
                  <UnknownCard title="7. Known unknowns" items={unknowns} pillClass={pillClasses.unknown} />
                  <SimpleListCard title="8. Evidence / traceability" items={evidence} />
                </div>
              </div>
            </section>

            <div className="grid gap-6 lg:grid-cols-2">
              <SimpleStatusPanel
                title="Metadata sync status"
                rows={[
                  ['Custom Objects', 'Ready'],
                  ['Custom Fields', 'Ready'],
                  ['Validation Rules', 'Ready'],
                  ['Record-Triggered Flows', 'In progress'],
                  ['Formula Fields', 'Ready'],
                  ['Profiles / Permission Sets', 'Hints only'],
                ]}
              />
              <SimpleListPanel
                title="Saved report snapshots"
                rows={[
                  ['Make Account.Customer_Tier__c required', 'Moderate risk'],
                  ['Edit Stage Gate validation rule', 'High risk'],
                  ['Change Lead scoring formula', 'Moderate risk'],
                  ['Adjust Opportunity close Flow', 'Very high risk'],
                ]}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {children}
    </div>
  );
}

function InfoBox({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5">
      <div className="text-sm font-semibold">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function BulletCard({ title, items, bulletColor }: { title: string; items: string[]; bulletColor: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5">
      <div className="text-sm font-semibold">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className={`mt-1 h-2 w-2 rounded-full ${bulletColor}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UnknownCard({ title, items, pillClass }: { title: string; items: string[]; pillClass: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5">
      <div className="text-sm font-semibold">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className={`mt-0.5 inline-flex h-fit rounded-full px-2 py-0.5 text-[10px] font-medium ${pillClass}`}>Unknown</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SimpleListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5">
      <div className="text-sm font-semibold">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function SimpleStatusPanel({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="mt-4 space-y-3 text-sm">
        {rows.map(([name, status]) => (
          <div key={name} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <span>{name}</span>
            <span className="text-slate-500">{status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SimpleListPanel({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="mt-4 space-y-3 text-sm">
        {rows.map(([titleRow, subtitle]) => (
          <div key={titleRow} className="rounded-2xl border border-slate-200 px-4 py-3">
            <div className="font-medium">{titleRow}</div>
            <div className="mt-1 text-slate-500">{subtitle}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
