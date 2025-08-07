import { useState } from "react";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { OrderTable } from "../components/dashboard/OrderTable";
import { OrderConfirmationModal } from "../components/dashboard/OrderConfirmationModal";
import { useOrderData } from "../hooks/useOrderData";
import { useToast } from "../hooks/use-toast";

const Index = () => {
  const {
    orderData,
    setOrderData,
    selectedItems,
    setSelectedItems,
    orderSummary,
    exportToCSV
  } = useOrderData();

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { toast } = useToast();

  const handleSummaryOrder = () => {
    if (selectedItems.length === 0) {
      toast({
        title: "Atenção",
        description: "Selecione pelo menos um item para ver o resumo",
        variant: "destructive"
      });
      return;
    }
    
    // Scroll para o resumo
    const summaryElement = document.getElementById('order-summary');
    if (summaryElement) {
      summaryElement.scrollIntoView({ behavior: 'smooth' });
    }
    
    toast({
      title: "Resumo do Pedido",
      description: `${selectedItems.length} itens selecionados - Total: R$ ${orderSummary.total_geral.toFixed(2)}`,
    });
  };

  const handleModifyOrder = () => {
    toast({
      title: "Modo de Edição",
      description: "Você pode modificar as quantidades diretamente na tabela",
    });
  };

  const handleSaveOrder = () => {
    if (selectedItems.length === 0) {
      toast({
        title: "Atenção",
        description: "Selecione pelo menos um item para salvar",
        variant: "destructive"
      });
      return;
    }

    // Simular salvamento
    toast({
      title: "Pedido Salvo",
      description: "Seu pedido foi salvo com sucesso!",
    });
  };

  const handleSendOrder = () => {
    if (selectedItems.length === 0) {
      toast({
        title: "Atenção",
        description: "Selecione pelo menos um item para enviar",
        variant: "destructive"
      });
      return;
    }

    if (orderSummary.total_geral < orderSummary.valor_minimo_pedido) {
      toast({
        title: "Valor Insuficiente",
        description: `Valor mínimo do pedido: R$ ${orderSummary.valor_minimo_pedido.toFixed(2)}`,
        variant: "destructive"
      });
      return;
    }

    setShowConfirmationModal(true);
  };

  const handleConfirmSendOrder = () => {
    // Simular envio do pedido
    toast({
      title: "Pedido Enviado",
      description: "Seu pedido foi enviado com sucesso!",
    });
    
    // Limpar seleção após envio
    setSelectedItems([]);
  };

  const handleClose = () => {
    const confirmClose = window.confirm("Deseja realmente fechar? Dados não salvos serão perdidos.");
    if (confirmClose) {
      // Simular fechamento da aplicação
      toast({
        title: "Aplicação Fechada",
        description: "Obrigado por usar nosso sistema!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        <DashboardHeader
          onExportCSV={exportToCSV}
          onSummaryOrder={handleSummaryOrder}
          onModifyOrder={handleModifyOrder}
          onSaveOrder={handleSaveOrder}
          onSendOrder={handleSendOrder}
          onClose={handleClose}
          totalValue={orderSummary.total_geral}
          minOrderValue={orderSummary.valor_minimo_pedido}
        />

        <OrderTable
          data={orderData}
          onDataChange={setOrderData}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
        />

        {/* Remover o resumo do pedido */}
        {/* <div id="order-summary">
          <OrderSummary
            summary={orderSummary}
            selectedItemsCount={selectedItems.length}
            totalItemsCount={orderData.length}
          />
        </div> */}

        <OrderConfirmationModal
          open={showConfirmationModal}
          onOpenChange={setShowConfirmationModal}
          onConfirm={handleConfirmSendOrder}
          summary={orderSummary}
          selectedItemsCount={selectedItems.length}
        />
      </div>
    </div>
  );
};

export default Index;
