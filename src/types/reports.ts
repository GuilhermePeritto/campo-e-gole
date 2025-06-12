
export interface ReportField {
  id: string;
  name: string;
  label: string;
  type: 'string' | 'number' | 'date' | 'boolean';
  entity: string;
  description?: string;
}

export interface ReportFilter {
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'between';
  value: any;
}

export interface ReportConfig {
  name: string;
  fields: ReportField[];
  filters: ReportFilter[];
  groupBy: string[];
  orderBy: string[];
}

export interface EntityFieldGroup {
  entity: string;
  label: string;
  fields: ReportField[];
}
