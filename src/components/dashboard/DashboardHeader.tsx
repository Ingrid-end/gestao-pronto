import { Button } from "@/components/ui/button";
import { Download, FileText, Settings, Send, X } from "lucide-react";

interface DashboardHeaderProps {
  onExportCSV: () => void;
  onSummaryOrder: () => void;
  onModifyOrder: () => void;
  onSaveOrder: () => void;
  onSendOrder: () => void;
  onClose: () => void;
  totalValue: number;
  minOrderValue: number;
}

export const DashboardHeader = ({
  onExportCSV,
  onSummaryOrder,
  onModifyOrder,
  onSaveOrder,
  onSendOrder,
  onClose,
  totalValue,
  minOrderValue
}: DashboardHeaderProps) => {
  const canSendOrder = totalValue >= minOrderValue;

  return (
    <div className="bg-gradient-header p-6 rounded-t-lg shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-dashboard-header-foreground">
          Aprovação de Pedidos por Email
        </h1>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="action-green"
          onClick={onSendOrder}
          disabled={!canSendOrder}
          className="text-sm"
          title={!canSendOrder ? `Valor mínimo do pedido: R$ ${minOrderValue.toFixed(2)}` : ''}
        >
          <Send className="h-4 w-4" />
          Enviar Pedido
        </Button>
      </div>

      {!canSendOrder && (
        <div className="mt-4 p-3 bg-warning/10 border border-warning/30 rounded-md">
          <p className="text-sm text-warning-foreground">
            <strong>Atenção:</strong> Valor atual do pedido (R$ {totalValue.toFixed(2)}) é menor que o valor mínimo (R$ {minOrderValue.toFixed(2)})
          </p>
        </div>
      )}
    </div>
  );
};