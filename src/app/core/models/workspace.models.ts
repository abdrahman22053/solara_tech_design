export type WorkspaceKind = 'orders' | 'quotes' | 'installations' | 'interventions' | 'users' | 'notifications' | 'settings';

export interface WorkspaceRow {
  id: string;
  primary: string;
  secondary: string;
  detail: string;
  status: string;
  tone: 'blue' | 'teal' | 'amber' | 'coral' | 'neutral';
  date: string;
  icon: string;
}

export interface WorkspaceSummary {
  label: string;
  value: string;
  caption: string;
  tone: 'blue' | 'teal' | 'amber' | 'coral';
}

export interface WorkspaceConfig {
  kind: WorkspaceKind;
  eyebrow: string;
  title: string;
  subtitle: string;
  actionLabel: string;
  actionIcon: string;
  summary: WorkspaceSummary[];
  rows: WorkspaceRow[];
}
