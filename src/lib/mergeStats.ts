import { PlayerStatsType } from '@/types/gameTypes';

const mergeStats = (stats_a: PlayerStatsType, stats_b: PlayerStatsType) => {
	return {
		marketing: stats_a.marketing + stats_b.marketing,
		productivity: stats_a.productivity + stats_b.productivity,
		creativity: stats_a.creativity + stats_b.creativity,
		financeManagement: stats_a.financeManagement + stats_b.financeManagement,
		humanResources: stats_a.humanResources + stats_b.humanResources,
		leadership: stats_a.leadership + stats_b.leadership,
		communication: stats_a.communication + stats_b.communication,
		technicalSkill: stats_a.technicalSkill + stats_b.technicalSkill,
		negotiation: stats_a.negotiation + stats_b.negotiation,
		strategy: stats_a.strategy + stats_b.strategy,
		adaptability: stats_a.adaptability + stats_b.adaptability,
		stressManagement: stats_a.stressManagement + stats_b.stressManagement,
		riskManagement: stats_a.riskManagement + stats_b.riskManagement,
		analyticalThinking: stats_a.analyticalThinking + stats_b.analyticalThinking,
		resilience: stats_a.resilience + stats_b.resilience,
		innovation: stats_a.innovation + stats_b.innovation,
		reputation: stats_a.reputation + stats_b.reputation,
		learningSpeed: stats_a.learningSpeed + stats_b.learningSpeed,
		luck: stats_a.luck + stats_b.luck,
		ambition: stats_a.ambition + stats_b.ambition,
	};
};

export default mergeStats;
