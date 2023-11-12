    // Função para mostrar a notificação
    function showNotification(message) {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notificationText');
      
        notificationText.innerText = message;
        notification.style.display = 'block';
      
        setTimeout(() => {
          closeNotification();
        }, 5000); // Fecha a notificação após 5 segundos (pode ser ajustado)
      }
      
      // Função para fechar a notificação
      function closeNotification() {
        const notification = document.getElementById('notification');
        notification.style.display = 'none';
      }
      
      // Função para simular a mudança da variável e acionar a notificação
      function triggerNotification() {
        // Aqui, você pode substituir essa lógica pela mudança real da sua variável
        const variavelQueMudou = true;
      
        if (variavelQueMudou) {
          showNotification('A variável mudou!'); // Mensagem da notificação
        }
      }