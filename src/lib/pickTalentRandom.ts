import SECTORS from '../../constants/SECTORS';

const pickTalentRandom = () => {
	return SECTORS[Math.floor(Math.random() * SECTORS.length)];
};

export default pickTalentRandom;
