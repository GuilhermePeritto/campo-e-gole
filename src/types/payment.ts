
export interface PaymentData {
  id: string;
  title: string;
  description: string;
  amount: number;
  dueDate?: string;
  clientName?: string;
  referenceMonth?: string;
  additionalInfo?: Record<string, any>;
}

export interface PaymentFormData {
  paymentDate: string;
  paymentMethod: string;
  amountReceived: string;
  discount: string;
  notes: string;
  installments?: string;
  interestRate?: string;
}

export interface PaymentConfig {
  type: 'school_payment' | 'event_receivable' | 'bar_comanda' | 'bar_sale' | 'financial_receivable';
  title: string;
  backUrl: string;
  backLabel: string;
  showInstallments?: boolean;
  showInterestRate?: boolean;
  showDiscount?: boolean;
  customFields?: Array<{
    key: string;
    label: string;
    type: 'text' | 'number' | 'select';
    options?: string[];
    required?: boolean;
  }>;
  onSubmit: (data: PaymentFormData, paymentData: PaymentData) => Promise<void>;
}
