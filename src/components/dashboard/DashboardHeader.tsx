import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

import { OrderItem } from "../../types/order";

interface DashboardHeaderProps {
  onExportCSV: () => void;
  onSummaryOrder: () => void;
  onModifyOrder: () => void;
  onSaveOrder: () => void;
  onSendOrder: () => void;
  onClose: () => void;
  selectedItems: OrderItem[];
}

export const DashboardHeader = ({
  onExportCSV,
  onSummaryOrder,
  onModifyOrder,
  onSaveOrder,
  onSendOrder,
  onClose,
  selectedItems
}: DashboardHeaderProps) => {
  const totalValue = selectedItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="bg-gradient-header p-6 rounded-t-lg shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex-1 flex justify-center">
          <h1 className="text-2xl font-bold text-dashboard-header-foreground">
            Aprovação de Pedidos por Email
          </h1>
        </div>
        
        <div>
          <Button
            variant="action-green"
            onClick={onSendOrder}
            className="text-sm"
          >
            <Send className="h-4 w-4 mr-2" />
            {selectedItems.length > 0 
              ? `Enviar Pedido (R$ ${totalValue.toFixed(2)})`
              : 'Enviar Pedido'
            }
          </Button>
        </div>
      </div>
    </div>
  );
};