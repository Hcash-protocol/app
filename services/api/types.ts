interface ProofInput {
  fee_percentage: string;
  admin_wallet: string;
  token_address: string;
  is_updatable_fee: boolean;
  is_updatable_admin: boolean;
}

interface ProofOutput {
  fee_percentage: string;
  admin_wallet: string;
  token_address: string;
  is_updatable_fee: boolean;
  is_updatable_admin: boolean;
}

export type { ProofInput, ProofOutput };
