import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OrderItem } from "../../types/order";
import { sendOrders } from "../../services/api";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface OrderConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  selectedItems: OrderItem[];
}

export const OrderConfirmationModal = ({
  open,
  onOpenChange,
  onConfirm,
  selectedItems
}: OrderConfirmationModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const groupedItems = selectedItems.reduce((acc, item) => {
    const key = item.tabela_cod;
    if (!acc[key]) {
      acc[key] = {
        items: [],
        total: 0,
        tabela: item.tabela
      };
    }
    acc[key].items.push(item);
    acc[key].total += item.total;
    return acc;
  }, {} as Record<string, { items: OrderItem[]; total: number; tabela: string }>);
  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      console.log('Items selecionados:', selectedItems);

      // Mapear os itens selecionados para o formato esperado pela API
      // Filtrar apenas os itens com os dados necessários
      const itemsToSend = selectedItems
        .filter(item => item.id && item.demanda) // Filtramos por ID e demanda
        .map(item => {
          // Extrair o código do produto do ID (formato: "COD_PROD-INDEX")
          const codProd = parseInt(item.id.split('-')[0]);
          
          const mappedItem = {
            UF: item.uf,
            CD: parseInt(item.cd),
            NOME_CD: '', // Campo opcional
            FABRICANTE: '', // Campo opcional
            TABELA_COD: 0, // Campo opcional
            TABELA: item.tabela,
            TIPO_ENVIO: '', // Campo opcional
            EMAIL: '', // Campo opcional
            COD_PROD: codProd, // Usando o código extraído do ID
            EAN: item.ean,
            PROD: item.produto,
            QTD: item.qtd_comprada || 0,
            P_BRUTO: item.preco_bruto,
            DESC: item.desconto,
            P_LIQ: item.preco_liquido,
            TOT_P_LIQ_SOMA: item.total,
            DEMANDA: item.demanda
          };
          console.log('Item mapeado com DEMANDA:', mappedItem);
          return mappedItem;
        });

      // Enviar os pedidos
      console.log('Enviando pedidos...');
      // Adicionamos a conversão de tipo para resolver o erro de tipo
      await sendOrders(itemsToSend as any);
      console.log('Pedidos enviados com sucesso!');

      toast({
        title: "Sucesso",
        description: "Pedidos enviados com sucesso!",
      });

      onConfirm();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Erro ao enviar pedidos:', error.response?.data || error);
      toast({
        title: "Erro",
        description: error.response?.data?.message || "Erro ao enviar os pedidos. Por favor, tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Confirmar Envio do Pedido
          </DialogTitle>
          <DialogDescription>
            Revise os dados do pedido antes de confirmar o envio.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-medium">Itens selecionados:</span>
            <span className="font-bold">{selectedItems.length}</span>
          </div>

          <div className="space-y-6">
            {Object.entries(groupedItems).map(([tabelaCod, group]) => (
              <div key={tabelaCod} className="space-y-2">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="font-medium">{group.tabela}</span>
                    <span className="text-sm text-muted-foreground ml-2">(Cód: {tabelaCod})</span>
                  </div>
                  <span className="font-bold text-primary">
                    R$ {group.total.toFixed(2)}
                  </span>
                </div>
                
                {group.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm pl-4">
                    <span className="text-muted-foreground">{item.produto}</span>
                    <span>R$ {item.total.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            variant="action-green"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Confirmar Envio"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};