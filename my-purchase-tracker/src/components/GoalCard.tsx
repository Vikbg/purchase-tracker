// src/components/GoalCard.tsx
import { Goal } from '@prisma/client';

interface GoalCardProps {
  goal: Goal;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const progress = (goal.savedAmount / goal.totalAmount) * 100;

  return (
	<div className="p-4 border rounded-lg shadow-md">
	  <h2 className="text-xl font-bold">{goal.title}</h2>
	  <p>Objectif : {goal.totalAmount}€</p>
	  <p>Économisé : {goal.savedAmount}€</p>
	  <p>Date cible : {new Date(goal.targetDate).toLocaleDateString()}</p>
	  <div className="h-2 bg-gray-200 mt-2">
		<div
		  className="h-full bg-green-500"
		  style={{ width: `${progress}%` }}
		></div>
	  </div>
	  <p>{progress.toFixed(2)}% atteint</p>
	</div>
  );
};

export default GoalCard;
