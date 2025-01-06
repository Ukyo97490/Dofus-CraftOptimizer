// script.js

// Empêche les valeurs négatives dans les champs numériques
function preventNegativeInputs(inputElements) {
    inputElements.forEach(input => {
      input.addEventListener('input', () => {
        if (parseInt(input.value) < 0) {
          input.value = '';
        }
      });
    });
  }
  
  // Initialisation
  document.addEventListener('DOMContentLoaded', () => {
    const totalPodsInput = document.getElementById('total-pods');
    const usedPodsInput = document.getElementById('used-pods');
    const resourceInputs = document.querySelectorAll('.resource-input input[type="number"]');
  
    // Vérification pour les champs principaux
    preventNegativeInputs([totalPodsInput, usedPodsInput]);
  
    // Gestion des nouvelles ressources ajoutées dynamiquement
    document.getElementById('add-resource').addEventListener('click', () => {
      const newResource = document.createElement('div');
      newResource.className = 'resource-input';
      newResource.innerHTML = `
        <input type="text" placeholder="Nom de la ressource" class="resource-name">
        <input type="number" placeholder="Quantité" class="resource-quantity">
        <input type="number" placeholder="Poids unitaire (pods)" class="resource-weight">
        <button class="remove-resource">X</button>
      `;
      document.getElementById('resource-list').appendChild(newResource);
  
      // Appliquer la validation aux nouveaux champs numériques
      const quantityInput = newResource.querySelector('.resource-quantity');
      const weightInput = newResource.querySelector('.resource-weight');
      preventNegativeInputs([quantityInput, weightInput]);
  
      // Bouton pour supprimer la ressource
      newResource.querySelector('.remove-resource').addEventListener('click', () => {
        newResource.remove();
      });
    });
  
    // Calculer le résultat
    document.getElementById('calculate').addEventListener('click', () => {
      const totalPods = parseInt(totalPodsInput.value) || 0;
      const usedPods = parseInt(usedPodsInput.value) || 0;
      const resources = document.querySelectorAll('.resource-input');
  
      let remainingPods = totalPods - usedPods;
      const resourceDetails = [];
  
      resources.forEach(resource => {
        const name = resource.querySelector('.resource-name').value || 'Ressource inconnue';
        const quantity = parseInt(resource.querySelector('.resource-quantity').value) || 0;
        const weight = parseInt(resource.querySelector('.resource-weight').value) || 0;
  
        if (weight > 0 && quantity > 0) {
          const maxCrafts = Math.floor(remainingPods / (quantity * weight));
          remainingPods -= maxCrafts * quantity * weight;
          resourceDetails.push(`${maxCrafts} x ${name}`);
        }
      });
  
      document.getElementById('output').textContent = resourceDetails.length
        ? `Vous pouvez fabriquer : ${resourceDetails.join(', ')}. Pods restants : ${remainingPods}.`
        : "Aucune ressource ou données invalides.";
    });
  });
  