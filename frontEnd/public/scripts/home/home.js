document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('/user-permissions');
      if (!response.ok) {
        throw new Error('Erro ao buscar permissões.');
      }
      const userPermissions = await response.json();

      const cards = [
        { id: 'user-management', permission: 'has_user_management' },
        { id: 'profile-management', permission: 'has_profile_management' },
        { id: 'inventory-management', permission: 'has_inventory_management' },
        { id: 'store-management', permission: 'has_store_management' },
        { id: 'talon-send', permission: 'has_shipping' },
        { id: 'talon-receipt', permission: 'has_receiving' },
        { id: 'talon-maintenance', permission: 'has_maintenance' },
        { id: 'dashboard', permission: 'has_user_management' },
      ];

      //  opacos os cards sem permissão
      cards.forEach(card => {
        if (!userPermissions[card.permission]) {
          const element = document.querySelector(`a[href="/${card.id}"]`);
          if (element) {
            element.parentElement.style.opacity = 0.5;
            element.style.pointerEvents = 'none'; 
          }
        }
      });
    } catch (error) {
      console.error('Erro ao configurar permissões dos cards:', error);
    }
  });