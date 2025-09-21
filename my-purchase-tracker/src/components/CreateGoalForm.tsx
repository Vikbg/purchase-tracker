// src/components/CreateGoalForm.tsx
import { useState } from 'react';

const CreateGoalForm = ({ onAddGoal }: { onAddGoal: Function }) => {
  const [title, setTitle] = useState('');
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [savedAmount, setSavedAmount] = useState<number>(0);
  const [targetDate, setTargetDate] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
	e.preventDefault();

	// Créer l'objectif via l'API
	const response = await fetch('/api/goals', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({ title, totalAmount, savedAmount, targetDate }),
	});

	if (response.ok) {
	  const newGoal = await response.json();
	  onAddGoal(newGoal); // Mettre à jour les objectifs côté client
	} else {
	  console.error('Erreur lors de la création de l\'objectif');
	}

	// Réinitialiser le formulaire
	setTitle('');
	setTotalAmount(0);
	setSavedAmount(0);
	setTargetDate('');
  };

  return (
	<form onSubmit={handleSubmit} className="space-y-4 p-4">
	  <input
		type="text"
		placeholder="Titre de l'objectif"
		value={title}
		onChange={(e) => setTitle(e.target.value)}
		className="p-2 border rounded"
	  />
	  <label htmlFor="totalAmount">Montant total</label>
	  <input
		type="number"
		placeholder="Montant total"
		value={totalAmount}
		onChange={(e) => setTotalAmount(Number(e.target.value))}
		className="p-2 border rounded"
	  />
	  <label htmlFor="savedAmount">Montant économisé</label>
	  <input
		type="number"
		placeholder="Montant économisé"
		value={savedAmount}
		onChange={(e) => setSavedAmount(Number(e.target.value))}
		className="p-2 border rounded"
	  />
	  <input
		type="date"
		value={targetDate}
		onChange={(e) => setTargetDate(e.target.value)}
		className="p-2 border rounded"
	  />
	  <button type="submit" className="p-2 bg-blue-500 text-white rounded">Ajouter</button>
	</form>
  );
};

export default CreateGoalForm;
